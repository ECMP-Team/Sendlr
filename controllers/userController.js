import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
  getTokenExpirySeconds,
} from "../utils/jwtUtils.js";
import {
  storeRefreshToken,
  validateRefreshToken,
  removeRefreshToken,
  getUserSessions,
  clearUserSessions,
  blacklistToken,
  cacheUserData,
  getCachedUserData,
  removeCachedUserData,
} from "../utils/redisUtils.js";

class UserController {
  // User Session Management
  static async getUserSessions(req, res) {
    try {
      const userId = req.user.id;
      const sessions = await getUserSessions(userId);

      return res.status(200).json({
        success: true,
        sessions,
      });
    } catch (error) {
      console.error("Error getting user sessions:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve user sessions",
      });
    }
  }

  static async deleteUserSession(req, res) {
    try {
      const userId = req.user.id;
      const { sessionId } = req.params;

      if (!sessionId) {
        return res.status(400).json({
          success: false,
          message: "Session ID is required",
        });
      }

      const success = await removeRefreshToken(userId, sessionId);

      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Session not found or already expired",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Session terminated successfully",
      });
    } catch (error) {
      console.error("Error deleting user session:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to terminate session",
      });
    }
  }

  static async deleteAllUserSessions(req, res) {
    try {
      const userId = req.user.id;
      await clearUserSessions(userId);

      return res.status(200).json({
        success: true,
        message: "All sessions terminated successfully",
      });
    } catch (error) {
      console.error("Error deleting all user sessions:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to terminate sessions",
      });
    }
  }

  // Token Management
  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token is required",
        });
      }

      // Validate the refresh token
      const userId = await validateRefreshToken(refreshToken);

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired refresh token",
        });
      }

      // Get user data from cache or database
      let user = await getCachedUserData(userId);

      if (!user) {
        user = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true, email: true, name: true },
        });

        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        // Cache user data for future requests
        await cacheUserData(userId, user);
      }

      // Generate new tokens
      const accessToken = createAccessToken({ id: user.id });
      const newRefreshToken = createRefreshToken({ id: user.id });

      // Get client info from request
      const deviceInfo = {
        userAgent: req.headers["user-agent"] || "Unknown",
        ip: req.ip || req.connection.remoteAddress,
      };

      // Store the new refresh token
      const refreshExpiry = getTokenExpirySeconds(
        process.env.REFRESH_TOKEN_EXPIRY || "7d"
      );
      await storeRefreshToken(
        user.id,
        newRefreshToken,
        JSON.stringify(deviceInfo),
        refreshExpiry
      );

      // Remove the old refresh token
      await removeRefreshToken(user.id, refreshToken);

      return res.status(200).json({
        success: true,
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      console.error("Error refreshing token:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to refresh token",
      });
    }
  }

  static async logoutUser(req, res) {
    try {
      const userId = req.user.id;
      const authHeader = req.headers.authorization;
      const refreshToken = req.body.refreshToken;

      if (!authHeader) {
        return res.status(400).json({
          success: false,
          message: "Access token is required",
        });
      }

      // Extract the access token
      const accessToken = authHeader.split(" ")[1];

      // Get token expiry
      const decoded = verifyToken(accessToken);
      const tokenExp = decoded?.exp || 0;
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = Math.max(tokenExp - currentTime, 0);

      // Blacklist the access token until it expires
      await blacklistToken(accessToken, timeUntilExpiry);

      // If a refresh token was provided, remove it
      if (refreshToken) {
        await removeRefreshToken(userId, refreshToken);
      }

      // Clear user data from cache
      await removeCachedUserData(userId);

      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to logout",
      });
    }
  }

  static async deleteCampaign(req, res) {
    try {
      const userId = req.user.id;
      const campaignId = req.params.id;
      const campaign = await prisma.campaign.findUnique({
        where: {
          id: campaignId,
        },
      });
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }

      await prisma.campaign.delete({
        where: {
          id: campaignId,
          userId: userId,
        },
      });

      res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUser(req, res) {
    //! only allow user to get their own user data
    try {
      const userId = req.user.id;

      // Try to get user from cache first
      let user = await getCachedUserData(userId);

      if (!user) {
        // If not in cache, get from database
        user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        // Cache user data for future requests
        await cacheUserData(userId, user);
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async registerUser(req, res) {
    try {
      const { email, password, name, userData } = req.body;

      if (!email || !password || !name || !userData) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const userExists = await prisma.user.findUnique({
        where: { email: email },
      });

      if (userExists) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name, userData },
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Failed to create user",
        });
      }

      // Generate tokens
      const accessToken = createAccessToken({ id: user.id });
      const refreshToken = createRefreshToken({ id: user.id });

      // Get client info
      const deviceInfo = {
        userAgent: req.headers["user-agent"] || "Unknown",
        ip: req.ip || req.connection.remoteAddress,
      };

      // Store refresh token
      const refreshExpiry = getTokenExpirySeconds(
        process.env.REFRESH_TOKEN_EXPIRY || "7d"
      );
      await storeRefreshToken(
        user.id,
        refreshToken,
        JSON.stringify(deviceInfo),
        refreshExpiry
      );

      // Cache user data
      await cacheUserData(user.id, {
        id: user.id,
        email: user.email,
        name: user.name,
      });

      res.status(201).json({
        success: true,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.user.id;
      const { name, userData } = req.body;

      if (!name || !userData) {
        return res.status(400).json({
          success: false,
          message: "Name and userData are required",
        });
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: { name, userData },
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Failed to update user",
        });
      }

      // Update cached user data
      await cacheUserData(userId, user);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Generate tokens
      const accessToken = createAccessToken({ id: user.id });
      const refreshToken = createRefreshToken({ id: user.id });

      // Get client info
      const deviceInfo = {
        userAgent: req.headers["user-agent"] || "Unknown",
        ip: req.ip || req.connection.remoteAddress,
      };

      // Store refresh token
      const refreshExpiry = getTokenExpirySeconds(
        process.env.REFRESH_TOKEN_EXPIRY || "7d"
      );
      await storeRefreshToken(
        user.id,
        refreshToken,
        JSON.stringify(deviceInfo),
        refreshExpiry
      );

      // Cache user data
      await cacheUserData(user.id, {
        id: user.id,
        email: user.email,
        name: user.name,
      });

      res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export default UserController;

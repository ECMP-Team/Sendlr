import prisma from "../prisma/prismaClient.js";
import { createToken, verifyToken } from "../utils/jwtUtils.js";
class UserController {
    static async getAllCampaigns(req, res) {
        try {
            const userId = req.user.id;
            const campaigns = await prisma.campaign.findMany({
                where: {
                    userId: userId
                }
            });

            if (!campaigns) {
                return res.status(404).json({ message: "No campaigns found" });
            }

            res.status(200).json(campaigns);
        }

        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }


    static async getCampaign(req, res) {
        try {
            const userId = req.user.id;
            const campaignId = req.params.id;
            const campaign = await prisma.campaign.findUnique({
                where: { id: campaignId }
            });

            if (!campaign) {
                return res.status(404).json({ message: "Campaign not found" });
            }

        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }


    /*     static async getAllUsers(req, res) {
            try {
                const users = await prisma.user.findMany();
                res.status(200).json(users);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" });
            }
        } */

    /*         static async getUser(req, res) {
    
            } */


    static async createCampaign(req, res) {
        try {


            const userId = req.user.id;
            const { name, description } = req.body;

            if (!name || !description) {
                return res.status(400).json({ message: "Name and description are required" });
            }
            const campaignExists = await prisma.campaign.findUnique({
                where: {
                    name: name
                }
            });
            if (campaignExists) {
                return res.status(400).json({ message: "Campaign already exists" });
            }
            const campaign = await prisma.campaign.create({
                data: {
                    name, description, userId
                }
            });

            if (!campaign) {
                return res.status(400).json({ message: "Failed to create campaign" });
            }

            res.status(201).json(campaign);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getUser(req, res) {
        try {
            const userId = req.user.id;
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);

        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async registerUser(req, res) {
        try {
            const { email, password, name, userData } = req.body;

            if (!email || !password || !name || !userData) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const userExists = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (userExists) {
                return res.status(400).json({ message: "User already exists" });
            }

            const salt = await bcrypt.genSalt(17);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await prisma.user.create({
                data: { email, password: hashedPassword, name, userData }
            });

            if (!user) {
                return res.status(400).json({ message: "Failed to create user" });
            }

            const token = createToken({ id: user.id });

            res.status(201).json({ token });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateUser(req, res) {
        try {
            const userId = req.user.id;
            const { name, userData } = req.body;

            if (!name || !userData) {
                return res.status(400).json({ message: "Name and userData are required" });
            }
            
            const user = await prisma.user.update({
                where: {
                    id: userId
                },
                data: { name, userData }
            });

            if (!user) {
                return res.status(400).json({ message: "Failed to update user" });
            }

            res.status(200).json(user);
            
            
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }


    static async loginUser(req, res) {
        const userId = req.user?.id;
        if (userId) {
            res.status(200).json({ message: "User already logged in, please log out first" });
        }

        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = createToken({ id: user.id });

        res.status(200).json({ token });


    }


    static async deleteCampaign(req, res) {
        try {
            const userId = req.user.id;
            const campaignId = req.params.id;
            const campaign = await prisma.campaign.findUnique({
                where: {
                    id: campaignId
                }
            });
            if (!campaign) {
                return res.status(404).json({ message: "Campaign not found" });
            }

            await prisma.campaign.delete({
                where: {
                    id: campaignId,
                    userId: userId
                },
            });

            res.status(200).json({ message: "Campaign deleted successfully" });

        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }




    /*     static async deleteUser(req, res) {
           
    
    }
     */

}

export default UserController;

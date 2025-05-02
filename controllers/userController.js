import prisma from "../prisma/prismaClient.js";
import { createToken, verifyToken } from "../utils/jwtUtils.js";
class UserController {

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





    static async getUser(req, res) {
        //! only allow user to get their own user data
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





    /*     static async deleteUser(req, res) {
           
    
    }
     */

}

export default UserController;

import prisma from "../prisma/prismaClient.js";

class CampaignController {
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
            
            return res.status(200).json(campaign);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

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

}

export default CampaignController;

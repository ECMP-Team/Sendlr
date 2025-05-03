import prisma from "../../prisma/prismaClient.js";
import { processBatchEmails } from "../../utils/emailUtils.js";
import { validateAIEmailData } from "./validators.js";
import { sendSuccess, sendError, sendNotFound, sendServerError } from "./responseFormatter.js";

/**
 * Generates email content for a list of clients and sends the emails
 * @param {Object} req - Express request object 
 * @param {Object} res - Express response object
 */
export async function generateAndSendEmails(req, res) {
  const userId = req.user.id;

  try {
    // Validate request data
    const validation = validateAIEmailData(req.body);
    if (!validation.valid) {
      return sendError(res, validation.message);
    }

    const { 
      campaignId, 
      userData,
      fromEmail = "testing@resend.dev",
      prompt
    } = req.body;

    // Check if campaign exists and belongs to user
    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
        userId: userId
      }
    });
    
    if (!campaign) {
      return sendNotFound(res, "Campaign not found");
    }

    // Process emails in batches
    const results = await processBatchEmails({
      userDataArray: userData,
      prompt,
      fromEmail,
      userId,
      campaignId
    });

    // Format response
    return sendSuccess(res, `Generated and sent ${results.summary.successful} emails, ${results.summary.failed} failed out of ${results.summary.total} total`, {
      campaign: {
        id: campaignId,
        name: campaign.name
      },
      summary: results.summary,
      details: results.emails.map(email => ({
        recipient: email.recipient.email,
        success: email.success,
        ...(email.success ? {
          subject: email.emailContent?.subject,
          preview: email.emailContent?.text?.substring(0, 100) + '...',
          status: email.sendResult.status
        } : {
          error: email.error
        })
      }))
    });
  } catch (error) {
    return sendServerError(res, error, "Error generating or sending emails");
  }
}

export default {
  generateAndSendEmails
}; 
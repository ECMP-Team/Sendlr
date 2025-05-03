import writeMail from "../api/mailWriter.js";
import { sendIndividualEmails } from "../mail/resend.js";
import { logEmailSent } from "./prismaUtils.js";
import chalk from "chalk";
import prisma from "../prisma/prismaClient.js";
import { sendEmail } from "../mail/resend.js";
import { generateBulkEmails } from "../services/ai/index.js";

/**
 * Processes a single user's email generation and sending
 * @param {Object} params - Parameters object
 * @param {Object} params.userData - User data for email generation
 * @param {string} params.prompt - Email generation prompt
 * @param {string} params.fromEmail - Sender email address
 * @param {string} params.userId - User ID for logging
 * @param {string} params.campaignId - Campaign ID for logging
 * @returns {Promise<Object>} Result of email processing
 */
export async function processUserEmail({ userData, prompt, fromEmail, userId, campaignId }) {
  try {
    // Generate email content
    const [emailContent] = await writeMail(prompt, [userData]);
    console.log(chalk.blue.bgYellow(`Generated email for ${userData.email}: ${JSON.stringify(emailContent)}`));
    // TODO: debug this 
    const emailData = { // comes from writeMail function return (AI generated JSON)
      recipient: userData.email,
      subject: emailContent?.subject,
      text: emailContent?.text,
      html: emailContent?.html
    };

    // Send email
    const results = await sendIndividualEmails(
      [emailData],
      fromEmail || "testing@resend.dev"
    );

    // Log email
/*     await logEmailSent({
      recipientMail: userData.email,
      emailContent: JSON.stringify(emailContent),
      status: results.successful > 0 ? 'SENT' : 'FAILED',
      userId: userId,
      campaignId: campaignId,
    }); */

    return {
      success: results.successful > 0,
      recipient: {
        email: userData.email,
        data: userData // Original user data used for personalization
      },
      emailContent: {
        subject: emailContent?.subject,
        text: emailContent?.text,
        html: emailContent?.html
      },
      sendResult: {
        status: results.successful > 0 ? 'SENT' : 'FAILED',
        details: results.details?.[0] || {} // First item since we're sending one email
      }
    };
  } catch (error) {
    console.error(`Error processing email for ${userData.email}:`, error);
    return {
      success: false,
      recipient: {
        email: userData.email,
        data: userData
      },
      error: error.message
    };
  }
}

/**
 * Process batch of emails for generation and sending
 * @param {Object} options - Batch processing options
 * @param {Array<Object>} options.userDataArray - Array of client data objects
 * @param {string} options.prompt - Custom prompt for AI
 * @param {string} options.fromEmail - Sender email address
 * @param {string} options.userId - User ID for logging
 * @param {string} options.campaignId - Campaign ID for logging
 * @returns {Promise<Object>} - Results summary and details
 */
export async function processBatchEmails({ 
  userDataArray, 
  prompt, 
  fromEmail = "testing@resend.dev", 
  userId, 
  campaignId 
}) {
  // Generate email content
  const generatedEmails = await generateBulkEmails(userDataArray, prompt);
  
  // Send emails and keep track of results
  const emailResults = [];
  let successCount = 0;
  let failedCount = 0;
  
  // Process each email
  for (const item of generatedEmails) {
    try {
      // Skip if generation failed
      if (!item.success) {
        failedCount++;
        emailResults.push({
          recipient: { email: item.clientData.email },
          success: false,
          error: item.error || "Failed to generate email content"
        });
        continue;
      }
      
      const { clientData, emailContent } = item;
      
      // Send email
      const sendResult = await sendEmail({
        to: clientData.email,
        from: fromEmail,
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html
      });
      
      // Log to database
      await prisma.emailLog.create({
        data: {
          userId,
          campaignId,
          recipientEmail: clientData.email,
          subject: emailContent.subject,
          content: emailContent.text,
          status: sendResult.status || "sent",
          metadata: {
            clientData,
            sendResult
          }
        }
      });
      
      // Track success
      successCount++;
      emailResults.push({
        recipient: { email: clientData.email },
        success: true,
        emailContent,
        sendResult
      });
    } catch (error) {
      // Track failure
      failedCount++;
      emailResults.push({
        recipient: { email: item.clientData?.email || "unknown" },
        success: false,
        error: error.message
      });
    }
  }
  
  // Return results
  return {
    summary: {
      total: userDataArray.length,
      successful: successCount,
      failed: failedCount
    },
    emails: emailResults
  };
}

export default {
  processBatchEmails
}; 
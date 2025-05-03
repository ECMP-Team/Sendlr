import writeMail from "../api/mailWriter.js";
import { sendIndividualEmails } from "../mail/resend.js";
import { logEmailSent } from "./prismaUtils.js";
import chalk from "chalk";

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
 * Processes multiple users' emails in batches
 * @param {Object} params - Parameters object
 * @param {Array} params.userDataArray - Array of user data
 * @param {string} params.prompt - Email generation prompt
 * @param {string} params.fromEmail - Sender email address
 * @param {string} params.userId - User ID for logging
 * @param {string} params.campaignId - Campaign ID for logging
 * @param {number} params.batchSize - Size of each batch (default: 5)
 * @returns {Promise<Object>} Aggregated results
 */
export async function processBatchEmails({ 
  userDataArray, 
  prompt, 
  fromEmail, 
  userId, 
  campaignId, 
  batchSize = 5 
}) {
  const results = {
    summary: {
      total: userDataArray.length,
      successful: 0,
      failed: 0
    },
    emails: [] // Detailed results for each email
  };

  // Process in batches
  for (let i = 0; i < userDataArray.length; i += batchSize) {
    const batch = userDataArray.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(userDataArray.length / batchSize)}`);
    
    // Process batch concurrently
    const batchResults = await Promise.all(
      batch.map(userData => 
        processUserEmail({
          userData,
          prompt,
          fromEmail,
          userId,
          campaignId
        })
      )
    );

    // Aggregate results
    batchResults.forEach(result => {
      if (result.success) {
        results.summary.successful++;
      } else {
        results.summary.failed++;
      }
      results.emails.push(result);
    });

    // Add delay between batches if not the last batch
    if (i + batchSize < userDataArray.length) {
      console.log('Waiting 1 second before processing next batch...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
} 
import { sendBulkEmail, sendIndividualEmails } from "../mail/resend.js";
import writeMail from "../api/mailWriter.js";
import { logEmailSent } from "../utils/prismaUtils.js";
import { parseFile } from "../utils/excelParser.js";
import { processBatchEmails } from "../utils/emailUtils.js";
import chalk from "chalk";
import prisma from "../prisma/prismaClient.js";

class emailController {
  /**
   * Sends bulk emails to a list of recipients.
   *
   * @async
   * @function sendBulkEmails
   * @param {Object} req - The HTTP request object.
   * @param {Object} req.body - The request body containing email details.
   * @param {string[]} req.body.recipients - An array of recipient email addresses.
   * @param {string} req.body.subject - The subject of the email.
   * @param {string} [req.body.text] - The plain text content of the email.
   * @param {string} [req.body.html] - The HTML content of the email.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} Sends a JSON response indicating success or failure.
   * @throws {Error} Returns a 500 status code with an error message if an exception occurs.
   */
  static async sendBulkEmails(req, res) {
    try {
      const { recipients, subject, text, html } = req.body;

      if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please provide an array of recipient email addresses",
        });
      }

      if (!subject || (!text && !html)) {
        return res.status(400).json({
          success: false,
          message: "Please provide subject and either text or html content",
        });
      }

      const result = await sendBulkEmail({ recipients, subject, text, html });

      return res.json({
        success: true,
        message: "Emails sent successfully",
        result,
      });
    } catch (error) {
      console.error("Error in /api/send-bulk:", error);
      return res.status(500).json({
        success: false,
        message: "Error sending emails",
        error: error.message,
      });
    }
  };

  // Endpoint to send individual emails with different content to each recipient
  static async sendIndividualEmails(req, res) {
    try {
      const { emails, fromEmail } = req.body;

      if (!emails || !Array.isArray(emails) || emails.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please provide an array of email objects",
        });
      }

      // Validate each email
      const validationErrors = [];
      emails.forEach((email, index) => {
        if (!email.recipient) {
          validationErrors.push(`Email at index ${index} is missing recipient`);
        }
        if (!email.subject) {
          validationErrors.push(`Email at index ${index} is missing subject`);
        }
        if (!email.text && !email.html) {
          validationErrors.push(
            `Email at index ${index} is missing both text and html content`
          );
        }
      });

      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: validationErrors,
        });
      }

      // Send individual emails
      const results = await sendIndividualEmails(
        emails,
        fromEmail || "testing@resend.dev"
      );

      return res.json({
        success: true,
        message: `Sent ${results.successful} emails, ${results.failed} failed`,
        results,
      });
    } catch (error) {
      console.error("Error in /api/send-individual:", error);
      return res.status(500).json({
        success: false,
        message: "Error sending emails",
        error: error.message,
      });
    }
  };

  // Endpoint to generate AI email content and send individualized emails
  /**
   * Generates email content for a list of clients and sends the emails.
   *
   * @async
   * @function generateAndSendEmails
   * @param {Object} req - The request object.
   * @param {Object} req.body - The body of the request.
   * @param {Array<Object>} req.body.userData - An array of client data objects, each containing at least an `email` property.
   * @param {string} [req.body.fromEmail] - The sender's email address. Defaults to "testing@resend.dev" if not provided.
   * @param {string} req.body.prompt - The prompt used to generate email content.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} Sends a JSON response with the status and results of the email generation and sending process.
   *
   * @throws {Error} Returns a 400 status if `userData` is missing, not an array, or empty.
   * @throws {Error} Returns a 500 status if an error occurs during email generation or sending.
   */
  static async generateAndSendEmails(req, res) {
    const userId = req.user.id;

    try {
      const { 
        campaignId, 
        userData, // array of objects containing email for each client and free data
        fromEmail, // optional, default is "testing@resend.dev"
        prompt // optional
      } = req.body;

      if (!userData || !Array.isArray(userData) || userData.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please provide an array of client data objects",
        });
      }

      // Check if campaign exists
      const campaign = await prisma.campaign.findUnique({
        where: {
          id: campaignId,
          userId: userId
        }
      });
      
      if (!campaign) {
        return res.status(404).json({
          success: false,
          message: "Campaign not found",
        });
      }

      // Process emails in batches
      const results = await processBatchEmails({
        userDataArray: userData,
        prompt,
        fromEmail,
        userId,
        campaignId
      });

      return res.json({
        success: true,
        message: `Generated and sent ${results.summary.successful} emails, ${results.summary.failed} failed out of ${results.summary.total} total`,
        campaign: {
          id: campaignId,
          name: campaign.name
        },
        summary: results.summary,
        details: results.emails.map(email => ({
          recipient: email.recipient.email,
          success: email.success,
          ...(email.success ? {
            subject: email.emailContent.subject,
            preview: email.emailContent.text.substring(0, 100) + '...',
            status: email.sendResult.status
          } : {
            error: email.error
          })
        }))
      });
    } catch (error) {
      console.error("Error in /api/generate-and-send:", error);
      return res.status(500).json({
        success: false,
        message: "Error generating or sending emails",
        error: error.message,
      });
    }
  };

  static async convertToJson(req, res) {
    const { excelData } = req.body;
    // Convert Excel data to JSON
    const jsonData = parseFile(excelData);
    return res.json({
      success: true,
      message: "Excel data converted to JSON",
      jsonData,
    });

  }

}

export default emailController;
import { sendBulkEmail } from "../../mail/resend.js";
import { validateBulkEmailData } from "./validators.js";
import { sendSuccess, sendError, sendServerError } from "./responseFormatter.js";

/**
 * Sends bulk emails to a list of recipients
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function sendBulkEmails(req, res) {
  try {
    // Validate request data
    const validation = validateBulkEmailData(req.body);
    if (!validation.valid) {
      return sendError(res, validation.message);
    }

    const { recipients, subject, text, html } = req.body;
    
    // Send emails
    const result = await sendBulkEmail({ recipients, subject, text, html });

    // Return success response
    return sendSuccess(res, "Emails sent successfully", { result });
  } catch (error) {
    return sendServerError(res, error, "Error sending bulk emails");
  }
}

export default {
  sendBulkEmails
}; 
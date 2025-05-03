import { sendIndividualEmails as sendEmails } from "../../mail/resend.js";
import { validateIndividualEmailsData } from "./validators.js";
import { sendSuccess, sendError, sendServerError } from "./responseFormatter.js";

/**
 * Sends individual emails with different content to each recipient
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function sendIndividualEmails(req, res) {
  try {
    // Validate request data
    const validation = validateIndividualEmailsData(req.body);
    if (!validation.valid) {
      return sendError(res, validation.message, { errors: validation.errors });
    }

    const { emails, fromEmail = "testing@resend.dev" } = req.body;
    
    // Send emails
    const results = await sendEmails(emails, fromEmail);

    // Return success response
    return sendSuccess(res, `Sent ${results.successful} emails, ${results.failed} failed`, { results });
  } catch (error) {
    return sendServerError(res, error, "Error sending individual emails");
  }
}

export default {
  sendIndividualEmails
}; 
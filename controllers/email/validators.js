/**
 * Validates bulk email request data
 * @param {Object} data - Request data to validate
 * @returns {Object} Validation result with success and error message if applicable
 */
export function validateBulkEmailData(data) {
  const { recipients, subject, text, html } = data;
  
  if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
    return {
      valid: false,
      message: "Please provide an array of recipient email addresses"
    };
  }

  if (!subject || (!text && !html)) {
    return {
      valid: false,
      message: "Please provide subject and either text or html content"
    };
  }

  return { valid: true };
}

/**
 * Validates individual email request data
 * @param {Object} data - Request data to validate
 * @returns {Object} Validation result with success and error details if applicable
 */
export function validateIndividualEmailsData(data) {
  const { emails } = data;
  
  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return {
      valid: false,
      message: "Please provide an array of email objects"
    };
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
    return {
      valid: false,
      message: "Validation errors",
      errors: validationErrors
    };
  }

  return { valid: true };
}

/**
 * Validates AI email generation request data
 * @param {Object} data - Request data to validate
 * @returns {Object} Validation result with success and error message if applicable
 */
export function validateAIEmailData(data) {
  const { campaignId, userData } = data;
  
  if (!campaignId) {
    return {
      valid: false,
      message: "Please provide a campaign ID"
    };
  }

  if (!userData || !Array.isArray(userData) || userData.length === 0) {
    return {
      valid: false,
      message: "Please provide an array of client data objects"
    };
  }

  return { valid: true };
} 
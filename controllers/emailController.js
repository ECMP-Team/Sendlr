/*
 * This is a compatibility layer that redirects to the new modular email controllers
 * It maintains the same API interface as the original emailController.js
 * for backwards compatibility.
 */

import emailControllers from './email/index.js';

// Re-export all controller methods with original names
export const sendBulkEmail = emailControllers.sendBulkEmails;
export const sendCustomEmails = emailControllers.sendIndividualEmails;
export const generateAndSendEmails = emailControllers.generateAndSendEmails;
export const convertExcelToJson = emailControllers.convertExcelToJson;

// Default export for backwards compatibility
export default {
  sendBulkEmail,
  sendCustomEmails,
  generateAndSendEmails,
  convertExcelToJson
};
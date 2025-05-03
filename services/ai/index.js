import { generateEmailContent, generateBulkEmailContent } from './emailGenerator.js';
import { buildEmailPrompt } from './promptBuilder.js';
import { parseAIResponse } from './responseParser.js';
import { replaceVariables, applyTemplateVariables } from './templateEngine.js';

/**
 * Generate email content for one client
 * @param {Object} clientData - Data for a single client
 * @param {string} customPrompt - Optional custom prompt
 * @returns {Promise<Object>} - Generated email content
 */
export async function generateEmail(clientData, customPrompt = '') {
  return generateEmailContent(clientData, customPrompt);
}

/**
 * Generate email content for multiple clients
 * @param {Array<Object>} clientDataArray - Array of client data objects
 * @param {string} customPrompt - Optional custom prompt
 * @returns {Promise<Array<Object>>} - Array of generated email content
 */
export async function generateBulkEmails(clientDataArray, customPrompt = '') {
  return generateBulkEmailContent(clientDataArray, customPrompt);
}

export default {
  generateEmail,
  generateBulkEmails,
  
  // Exposing lower-level utilities for advanced use cases
  buildEmailPrompt,
  parseAIResponse,
  replaceVariables,
  applyTemplateVariables
}; 
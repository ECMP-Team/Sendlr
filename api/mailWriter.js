/*
 * This is a compatibility layer that redirects to the new modular AI services
 * It maintains the same API interface as the original mailWriter.js
 * for backwards compatibility.
 */

import aiService from '../services/ai/index.js';

/**
 * Writes email content for one or multiple clients (for backward compatibility)
 * @param {Object|Array<Object>} userData - Client data for personalization, single object or array
 * @param {string} customPrompt - Optional custom prompt to override default
 * @returns {Promise<Object|Array<Object>>} - Email content(s) with subject, text, and html
 */
export async function writeMail(userData, customPrompt = '') {
  // Handle case when a single user is passed (not in an array)
  if (!Array.isArray(userData)) {
    // Generate for single user
    return await aiService.generateEmail(userData, customPrompt);
  }
  
  // Generate for multiple users
  const results = await aiService.generateBulkEmails(userData, customPrompt);
  
  // Return only successful email contents for compatibility
  return results
    .filter(result => result.success)
    .map(result => result.emailContent);
}

export default writeMail;

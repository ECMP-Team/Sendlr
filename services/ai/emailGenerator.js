import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildEmailPrompt } from './promptBuilder.js';
import { parseAIResponse } from './responseParser.js';

// Initialize Google AI
const AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(AI_API_KEY);

/**
 * Generates email content for a single client using AI
 * @param {Object} clientData - Client data for personalization
 * @param {string} customPrompt - Optional custom prompt to override default
 * @returns {Promise<Object>} - Email content with subject, text, and html
 */
export async function generateEmailContent(clientData, customPrompt = '') {
  try {
    // Build prompt
    const prompt = buildEmailPrompt(customPrompt, clientData);
    
    // Get model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse response
    return parseAIResponse(text, clientData);
  } catch (error) {
    console.error('Error generating email content:', error);
    throw new Error(`Failed to generate email content: ${error.message}`);
  }
}

/**
 * Generates email content for multiple clients
 * @param {Array<Object>} clientDataArray - Array of client data objects
 * @param {string} customPrompt - Optional custom prompt
 * @returns {Promise<Array<Object>>} - Array of email content objects
 */
export async function generateBulkEmailContent(clientDataArray, customPrompt = '') {
  // Process in batches to avoid rate limiting
  const batchSize = 5;
  const results = [];
  
  // Process in sequential batches
  for (let i = 0; i < clientDataArray.length; i += batchSize) {
    const batch = clientDataArray.slice(i, i + batchSize);
    
    // Process batch with Promise.all for concurrent processing
    const batchResults = await Promise.all(
      batch.map(async (clientData) => {
        try {
          const emailContent = await generateEmailContent(clientData, customPrompt);
          return {
            success: true,
            clientData,
            emailContent
          };
        } catch (error) {
          return {
            success: false,
            clientData,
            error: error.message
          };
        }
      })
    );
    
    results.push(...batchResults);
  }
  
  return results;
}

export default {
  generateEmailContent,
  generateBulkEmailContent
}; 
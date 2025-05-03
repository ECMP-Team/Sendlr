import { applyTemplateVariables } from './templateEngine.js';

/**
 * Default email template in case parsing fails
 * @param {Object} clientData - Client data for fallback
 * @returns {Object} - Fallback email content
 */
function createFallbackEmail(clientData) {
  const company = clientData.company || 'your company';
  const name = clientData.name || 'there';
  
  return {
    subject: `Special offer for ${company}`,
    text: `Hello ${name},\n\nWe would like to offer you our email campaign management services.\n\nBest regards,\nECMP Team`,
    html: `<p>Hello ${name},</p><p>We would like to offer you our email campaign management services.</p><p>Best regards,<br>ECMP Team</p>`
  };
}

/**
 * Parses AI response text into email content object
 * @param {string} responseText - Raw response from AI
 * @param {Object} clientData - Client data for template variables and fallback
 * @returns {Object} - Parsed email content with subject, text, and html
 */
export function parseAIResponse(responseText, clientData) {
  try {
    // Try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      console.error('No JSON found in AI response');
      return createFallbackEmail(clientData);
    }
    
    // Parse JSON content
    const jsonContent = JSON.parse(jsonMatch[0]);
    
    // Validate required fields
    if (!jsonContent.subject || (!jsonContent.text && !jsonContent.html)) {
      console.error('Invalid email content in AI response');
      return createFallbackEmail(clientData);
    }
    
    // Apply template variables
    return applyTemplateVariables(jsonContent, clientData);
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return createFallbackEmail(clientData);
  }
}

export default {
  parseAIResponse
}; 
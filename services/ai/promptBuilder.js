/**
 * Default email marketing prompt template
 */
const DEFAULT_PROMPT = `You are an expert AI email marketing copywriter specializing in high-conversion email campaigns. Your task is to craft a persuasive marketing email for ECMP, an AI-powered email campaign management platform that automates email writing and bulk sending.
The email must follow marketing best practices, including:
-Personalization: Address the recipient by name and mention their company.
-Relevance: Tailor the content based on the client's domain and notes.
-Persuasion: Highlight ECMP's benefits, addressing the client's specific challenges.
-Call-to-Action (CTA): Encourage the recipient to take action (e.g., book a demo, start a trial).

Compliance: Ensure a professional tone that follows email marketing regulations (no spammy language).`;

/**
 * Builds an AI prompt for email generation
 * @param {string} customPrompt - Custom prompt to use instead of default
 * @param {Object} clientData - Client data to include in prompt
 * @returns {string} - Complete prompt for AI
 */
export function buildEmailPrompt(customPrompt = '', clientData = {}) {
  const promptTemplate = customPrompt || DEFAULT_PROMPT;
  
  return `${promptTemplate}

Your input is a JSON object with the client's details. Your output must be a JSON object with the following format:

{
"subject": "string",
"text": "string",
"html": "string"
}

Use the following client data:

${JSON.stringify(clientData)}

Example Output:
{
"subject": "Boost Outreach for {{company}} with AI-Powered Email Campaigns",
"text": "Hi {{name}},\n\nI noticed that {{company}} is actively involved in {{domain}}, working to {{notes}}. Scaling outreach and engagement can be challenging, especially when managing high-volume email campaigns.\n\nECMP automates email writing and bulk sending with AI, helping organizations like yours save time and improve response rates. With our platform, you can craft highly targeted messages and reach more people efficiently.\n\nLet's set up a quick call to explore how ECMP can support your mission. Click here to schedule a demo: [Insert Link]\n\nBest,\n[Your Name]  \nECMP Team",
"html": "<p>Hi {{name}},</p>\n<p>I noticed that <strong>{{company}}</strong> is actively involved in {{domain}}, working to {{notes}}. Scaling outreach and engagement can be challenging, especially when managing high-volume email campaigns.</p>\n<p>ECMP automates email writing and bulk sending with AI, helping organizations like yours save time and improve response rates. With our platform, you can craft highly targeted messages and reach more people efficiently.</p>\n<p>Let's set up a quick call to explore how ECMP can support your mission. <a href='[Insert Link]'>Click here to schedule a demo</a>.</p>\n<p>Best,<br>[Your Name]<br>ECMP Team</p>"
}`;
}

export default {
  buildEmailPrompt,
  DEFAULT_PROMPT
}; 
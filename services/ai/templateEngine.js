/**
 * Replaces template variables in a string with actual values
 * @param {string} template - Template string with variables in {{variable}} format
 * @param {Object} data - Data object containing variable values
 * @returns {string} - String with variables replaced
 */
export function replaceVariables(template, data) {
  if (!template || typeof template !== 'string') {
    return template;
  }
  
  let result = template;
  
  // Replace each placeholder with actual value
  Object.entries(data).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(placeholder, value || '');
  });
  
  return result;
}

/**
 * Applies template variables to an entire object structure
 * @param {Object} template - Template object with variables in values
 * @param {Object} data - Data object containing variable values
 * @returns {Object} - Object with variables replaced in all string fields
 */
export function applyTemplateVariables(template, data) {
  // If template is not an object or is null, return as is
  if (!template || typeof template !== 'object') {
    return template;
  }

  const result = {};

  // Process each field in the template
  for (const [key, value] of Object.entries(template)) {
    if (typeof value === 'string') {
      // Replace variables in string
      result[key] = replaceVariables(value, data);
    } else if (typeof value === 'object' && value !== null) {
      // Recursively process nested objects
      result[key] = applyTemplateVariables(value, data);
    } else {
      // Keep non-string values as is
      result[key] = value;
    }
  }

  return result;
}

export default {
  replaceVariables,
  applyTemplateVariables
}; 
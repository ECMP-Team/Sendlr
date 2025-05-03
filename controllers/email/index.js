import bulkEmailController from './bulkEmailController.js';
import individualEmailController from './individualEmailController.js';
import aiEmailController from './aiEmailController.js';
import utilityController from './utilityController.js';

export default {
  // Bulk email endpoints
  sendBulkEmails: bulkEmailController.sendBulkEmails,
  
  // Individual email endpoints
  sendIndividualEmails: individualEmailController.sendIndividualEmails,
  
  // AI-generated email endpoints
  generateAndSendEmails: aiEmailController.generateAndSendEmails,
  
  // Utility endpoints
  convertExcelToJson: utilityController.convertExcelToJson
}; 
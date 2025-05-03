import { parseFile } from "../../utils/excelParser.js";
import { sendSuccess, sendError, sendServerError } from "./responseFormatter.js";

/**
 * Converts Excel data to JSON format
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function convertExcelToJson(req, res) {
  try {
    const { excelData } = req.body;
    
    if (!excelData) {
      return sendError(res, "Excel data is required");
    }
    
    // Convert Excel data to JSON
    const jsonData = parseFile(excelData);
    
    return sendSuccess(res, "Excel data converted to JSON", { jsonData });
  } catch (error) {
    return sendServerError(res, error, "Error converting Excel data to JSON");
  }
}

export default {
  convertExcelToJson
}; 
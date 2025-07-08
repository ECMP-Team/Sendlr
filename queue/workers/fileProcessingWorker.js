import { Worker } from 'bullmq';
import { connection } from '../queue.js';
import { parseFile } from '../../utils/excelParser.js';
import { addAIGenerationJob } from '../queue.js';
import chalk from 'chalk';

const fileProcessingWorker = new Worker(
  'FileProcessing',
  async (job) => {
    const { filePath, userId, campaignId, prompt, fromEmail, jobId } = job.data;
    
    console.log(chalk.blue(`📁 Starting file processing for job ${jobId}...`));
    
    try {
      // Parse the file
      const parsedData = parseFile(filePath);
      
      if (!parsedData || !Array.isArray(parsedData) || parsedData.length === 0) {
        throw new Error('File parsing resulted in empty or invalid data');
      }

      console.log(chalk.green(`✅ File parsed successfully: ${parsedData.length} records found`));

      // Validate required fields
      const validRecords = parsedData.filter(record => {
        return record.email && typeof record.email === 'string' && record.email.includes('@');
      });

      if (validRecords.length === 0) {
        throw new Error('No valid email addresses found in the file');
      }

      if (validRecords.length < parsedData.length) {
        console.log(chalk.yellow(`⚠️ Warning: ${parsedData.length - validRecords.length} records skipped due to invalid email addresses`));
      }

      // Create batches for AI processing (5 records per batch for optimal performance)
      const batchSize = 5;
      const batches = [];
      
      for (let i = 0; i < validRecords.length; i += batchSize) {
        const batch = validRecords.slice(i, i + batchSize);
        batches.push({
          batchNumber: Math.floor(i / batchSize) + 1,
          totalBatches: Math.ceil(validRecords.length / batchSize),
          userData: batch,
          userId,
          campaignId,
          prompt,
          fromEmail,
          originalJobId: jobId
        });
      }

      // Add AI generation jobs for each batch
      const aiJobs = await Promise.all(
        batches.map(batch => addAIGenerationJob(batch))
      );

      console.log(chalk.green(`✨ File processing complete. Created ${batches.length} AI generation jobs`));

      return {
        success: true,
        totalRecords: parsedData.length,
        validRecords: validRecords.length,
        batchesCreated: batches.length,
        aiJobIds: aiJobs.map(job => job.id)
      };

    } catch (error) {
      console.error(chalk.red(`❌ File processing failed: ${error.message}`));
      throw error;
    }
  },
  {
    connection,
    concurrency: 2 // Process 2 files simultaneously max
  }
);

fileProcessingWorker.on('completed', (job) => {
  const result = job.returnvalue;
  console.log(chalk.green(`✅ File processing job ${job.id} completed: ${result.validRecords} records processed into ${result.batchesCreated} batches`));
});

fileProcessingWorker.on('failed', (job, err) => {
  console.error(chalk.red(`❌ File processing job ${job?.id} failed: ${err.message}`));
});

fileProcessingWorker.on('error', (err) => {
  console.error(chalk.red('🚨 File processing worker error:'), err);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down file processing worker gracefully...');
  await fileProcessingWorker.close();
});

console.log(chalk.blue('🚀 File Processing Worker started and ready to process files'));

export default fileProcessingWorker; 
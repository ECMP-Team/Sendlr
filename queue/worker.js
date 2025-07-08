import { Worker } from 'bullmq';
import { connection } from './queue.js';
import { processBatchEmails } from '../utils/emailUtils.js';
import { addFileProcessingJob, addCampaignProcessingJob } from './queue.js';
import chalk from 'chalk';

const emailWorker = new Worker(
  'EmailQueue', 
  async job => {
    const jobType = job.name;
    
    if (jobType === 'process-batch') {
      // Legacy batch processing
      console.log(chalk.blue('📧 Starting legacy batch email processing...'));
      const results = await processBatchEmails(job.data);
      console.log(chalk.green('✅ Legacy batch processing complete:'), results.summary);
      return results;
      
    } else if (jobType === 'process-campaign') {
      // New campaign processing using background workers
      console.log(chalk.blue('🚀 Starting campaign processing with background workers...'));
      const { filePath, userId, campaignId, prompt, fromEmail } = job.data;
      
      // Add file processing job
      const fileJob = await addFileProcessingJob({
        filePath,
        userId,
        campaignId,
        prompt,
        fromEmail,
        jobId: job.id
      });
      
      console.log(chalk.green(`✅ Campaign processing initiated. File processing job: ${fileJob.id}`));
      
      return {
        success: true,
        message: 'Campaign processing started',
        fileProcessingJobId: fileJob.id,
        campaignId,
        userId
      };
    }
    
    throw new Error(`Unknown job type: ${jobType}`);
  }, 
  { 
    connection,
    concurrency: 1 // Process one batch/campaign at a time
  }
);

emailWorker.on('completed', job => {
  const results = job.returnvalue;
  
  if (job.name === 'process-batch') {
    console.log(chalk.green(`✨ Legacy batch job ${job.id} completed. Processed ${results.summary.total} emails (${results.summary.successful} successful, ${results.summary.failed} failed)`));
  } else if (job.name === 'process-campaign') {
    console.log(chalk.green(`✨ Campaign job ${job.id} initiated successfully. File processing started.`));
  }
});

emailWorker.on('failed', (job, err) => {
  console.error(chalk.red(`❌ Job ${job?.id} failed:`, err));
});

emailWorker.on('error', err => {
  console.error(chalk.red('🚨 Email Worker error:', err));
});

process.on('SIGTERM', async () => {
  console.log('Shutting down email worker gracefully...');
  await emailWorker.close();
  process.exit(0);
});

console.log(chalk.blue('🚀 Email Worker started and ready to process jobs'));

export default emailWorker;
import { Worker } from 'bullmq';
import { connection } from '../queue.js';
import writeMail from '../../api/mailWriter.js';
import { addEmailSendingJob } from '../queue.js';
import chalk from 'chalk';

const aiGenerationWorker = new Worker(
  'AIGeneration',
  async (job) => {
    const { 
      batchNumber, 
      totalBatches, 
      userData, 
      userId, 
      campaignId, 
      prompt, 
      fromEmail, 
      originalJobId 
    } = job.data;
    
    console.log(chalk.magenta(`🤖 Starting AI generation for batch ${batchNumber}/${totalBatches} (${userData.length} records)...`));
    
    try {
      // Generate email content for all users in this batch
      const emailContents = await writeMail(prompt, userData);
      
      if (!emailContents || emailContents.length !== userData.length) {
        throw new Error(`AI generation mismatch: expected ${userData.length} emails, got ${emailContents?.length || 0}`);
      }

      console.log(chalk.green(`✅ AI generated ${emailContents.length} email contents for batch ${batchNumber}`));

      // Create email sending jobs for each generated email
      const emailJobs = [];
      
      for (let i = 0; i < userData.length; i++) {
        const user = userData[i];
        const emailContent = emailContents[i];
        
        const emailJobData = {
          recipient: user,
          emailContent,
          fromEmail,
          userId,
          campaignId,
          batchNumber,
          totalBatches,
          originalJobId,
          aiJobId: job.id
        };
        
        const emailJob = await addEmailSendingJob(emailJobData);
        emailJobs.push(emailJob);
      }

      console.log(chalk.green(`✨ AI generation complete for batch ${batchNumber}. Created ${emailJobs.length} email sending jobs`));

      return {
        success: true,
        batchNumber,
        totalBatches,
        emailsGenerated: emailContents.length,
        emailJobIds: emailJobs.map(job => job.id),
        generatedEmails: emailContents.map((content, index) => ({
          recipient: userData[index].email,
          subject: content.subject,
          preview: content.text?.substring(0, 100) + '...'
        }))
      };

    } catch (error) {
      console.error(chalk.red(`❌ AI generation failed for batch ${batchNumber}: ${error.message}`));
      throw error;
    }
  },
  {
    connection,
    concurrency: 3 // Process 3 AI batches simultaneously
  }
);

aiGenerationWorker.on('completed', (job) => {
  const result = job.returnvalue;
  console.log(chalk.green(`✅ AI generation job ${job.id} completed: batch ${result.batchNumber}/${result.totalBatches} with ${result.emailsGenerated} emails generated`));
});

aiGenerationWorker.on('failed', (job, err) => {
  console.error(chalk.red(`❌ AI generation job ${job?.id} failed: ${err.message}`));
});

aiGenerationWorker.on('error', (err) => {
  console.error(chalk.red('🚨 AI generation worker error:'), err);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down AI generation worker gracefully...');
  await aiGenerationWorker.close();
});

console.log(chalk.magenta('🚀 AI Generation Worker started and ready to generate content'));

export default aiGenerationWorker; 
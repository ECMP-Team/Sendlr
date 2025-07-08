import { Worker } from 'bullmq';
import { connection } from '../queue.js';
import { sendIndividualEmails } from '../../mail/resend.js';
import { logEmailSent } from '../../utils/prismaUtils.js';
import chalk from 'chalk';

const emailSendingWorker = new Worker(
  'EmailSending',
  async (job) => {
    const { 
      recipient, 
      emailContent, 
      fromEmail, 
      userId, 
      campaignId, 
      batchNumber, 
      totalBatches,
      originalJobId,
      aiJobId 
    } = job.data;
    
    console.log(chalk.cyan(`📧 Sending email to ${recipient.email} (batch ${batchNumber}/${totalBatches})...`));
    
    try {
      // Prepare email data
      const emailData = {
        recipient: recipient.email,
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html
      };

      // Send the email
      const results = await sendIndividualEmails(
        [emailData],
        fromEmail || "testing@resend.dev"
      );

      const isSuccessful = results.successful > 0;
      const status = isSuccessful ? 'SENT' : 'FAILED';

      // Log the email attempt
      await logEmailSent({
        recipientMail: recipient.email,
        emailContent: JSON.stringify(emailContent),
        status: status,
        userId: userId,
        campaignId: campaignId,
      });

      if (isSuccessful) {
        console.log(chalk.green(`✅ Email sent successfully to ${recipient.email}`));
      } else {
        console.log(chalk.yellow(`⚠️ Email failed to send to ${recipient.email}`));
      }

      return {
        success: isSuccessful,
        recipient: {
          email: recipient.email,
          data: recipient
        },
        emailContent: {
          subject: emailContent.subject,
          preview: emailContent.text?.substring(0, 100) + '...'
        },
        sendResult: {
          status: status,
          details: results.details?.[0] || {},
          messageId: results.details?.[0]?.id || null
        },
        batchInfo: {
          batchNumber,
          totalBatches,
          originalJobId,
          aiJobId
        }
      };

    } catch (error) {
      console.error(chalk.red(`❌ Email sending failed for ${recipient.email}: ${error.message}`));
      
      // Log the failed attempt
      try {
        await logEmailSent({
          recipientMail: recipient.email,
          emailContent: JSON.stringify(emailContent),
          status: 'FAILED',
          userId: userId,
          campaignId: campaignId,
        });
      } catch (logError) {
        console.error(chalk.red(`Failed to log email failure: ${logError.message}`));
      }

      return {
        success: false,
        recipient: {
          email: recipient.email,
          data: recipient
        },
        error: error.message,
        batchInfo: {
          batchNumber,
          totalBatches,
          originalJobId,
          aiJobId
        }
      };
    }
  },
  {
    connection,
    concurrency: 5 // Send 5 emails simultaneously
  }
);

emailSendingWorker.on('completed', (job) => {
  const result = job.returnvalue;
  if (result.success) {
    console.log(chalk.green(`✅ Email sending job ${job.id} completed: ${result.recipient.email} - ${result.sendResult.status}`));
  } else {
    console.log(chalk.yellow(`⚠️ Email sending job ${job.id} failed: ${result.recipient.email} - ${result.error}`));
  }
});

emailSendingWorker.on('failed', (job, err) => {
  console.error(chalk.red(`❌ Email sending job ${job?.id} failed completely: ${err.message}`));
});

emailSendingWorker.on('error', (err) => {
  console.error(chalk.red('🚨 Email sending worker error:'), err);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down email sending worker gracefully...');
  await emailSendingWorker.close();
});

console.log(chalk.cyan('🚀 Email Sending Worker started and ready to send emails'));

export default emailSendingWorker; 
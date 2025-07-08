import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../config/config.js";
import { Queue } from 'bullmq';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import { ExpressAdapter } from '@bull-board/express';

export const connection = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD
};

console.log('Connecting to Redis at:', REDIS_HOST, REDIS_PORT);

// Define different queues for different operations
export const FileProcessingQueue = new Queue('FileProcessing', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 50,
    removeOnFail: 100,
  }
});

export const AIGenerationQueue = new Queue('AIGeneration', {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: 100,
    removeOnFail: 200,
  }
});

export const EmailSendingQueue = new Queue('EmailSending', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1500,
    },
    removeOnComplete: 100,
    removeOnFail: 200,
  }
});

// Legacy email queue for backward compatibility
export const EmailQueue = new Queue('EmailQueue', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: 100,
    removeOnFail: 200,
  }
});

// Set up Bull Board for monitoring queues
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [
    new BullMQAdapter(FileProcessingQueue),
    new BullMQAdapter(AIGenerationQueue),
    new BullMQAdapter(EmailSendingQueue),
    new BullMQAdapter(EmailQueue),
  ],
  serverAdapter,
});

export const bullBoardRouter = serverAdapter.getRouter();

// Helper functions to add jobs to queues
export async function addFileProcessingJob(jobData) {
  return FileProcessingQueue.add('process-file', jobData, {
    priority: 10 // High priority for file processing
  });
}

export async function addAIGenerationJob(jobData) {
  return AIGenerationQueue.add('generate-content', jobData, {
    priority: 5 // Medium priority for AI generation
  });
}

export async function addEmailSendingJob(jobData) {
  return EmailSendingQueue.add('send-email', jobData, {
    priority: 1 // Lower priority for email sending
  });
}

// Legacy function for backward compatibility
export async function addEmailBatchToQueue(batchData) {
  return EmailQueue.add('process-batch', batchData);
}

// Batch processing function for campaigns
export async function addCampaignProcessingJob(jobData) {
  return EmailQueue.add('process-campaign', jobData, {
    priority: 8 // High priority for campaign processing
  });
}
import { Worker } from 'bullmq';
import { connection } from './queue.js';

async function doTask(data) {
  try {
    console.log('🎯 Starting task for:', data);
    await new Promise(r => setTimeout(r, 2000)); // simulate delay
    console.log('✅ Finished task for:', data);
  } catch (error) {
    console.error('❌ Task failed:', error);
    throw error; // Re-throw to let BullMQ handle the retry
  }
}

const aiworker = new Worker(
  'AIQueue', 
  async job => {
    await doTask(job.data);
  }, 
  { 
    connection,
    concurrency: 5
  }
);

aiworker.on('completed', job => {
  console.log(`✨ Job ${job.id} completed successfully`);
});

aiworker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});

aiworker.on('error', err => {
  console.error('🚨 Worker error:', err);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down worker gracefully...');
  await aiworker.close();
  process.exit(0);
});

console.log('🚀 AIWorker started and ready to process jobs');
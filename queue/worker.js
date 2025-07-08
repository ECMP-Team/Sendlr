import { Worker } from 'bullmq';
import { connection } from './queue.js';

async function doTask(data) {
  console.log('🎯 Starting task for:', data)

  await new Promise(r => setTimeout(r, 2000)) // simulate delay

  console.log('✅ Finished task for:', data)
}

const aiworker = new Worker('AIQueue', async job => {
    await doTask(job.data);
}, { connection });

aiworker.on('completed', job => {
    console.log(`Job ${job.id} completed successfully`);    
});

aiworker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error: ${err.message}`);   
});

aiworker.on('error', err => {
    console.error(`Worker encountered an error: ${err.message}`);   
});


console.log('AIWorker started');
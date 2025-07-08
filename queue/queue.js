import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../config/config.js";
import { Queue } from 'bullmq';

export const connection = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD
};

console.log('Connecting to Redis at:', REDIS_HOST, REDIS_PORT);

export const AIQueue = new Queue('AIQueue', {
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
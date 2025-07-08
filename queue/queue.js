import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../config/config.js";
import IORedis from 'ioredis';
import { Queue } from 'bullmq';
console.log('Connecting to Redis at:', REDIS_HOST, REDIS_PORT);
 const redisOptions = { redis: {host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD} };

export const connection = new IORedis(redisOptions.redis);
const AIQueue = new Queue('AIQueue', { connection });

 AIQueue.add('task', { foo: 'bar' });

console.log('Job addded to AIQueue');
import {ConnectionOptions, DefaultJobOptions} from "bullmq";
import IORedis from "ioredis";

export const redisConnection:ConnectionOptions = new IORedis({
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!),
    password: process.env.UPSTASH_REDIS_PASSWORD!,
    tls: {},
});

export const defaultQueueOptions:DefaultJobOptions = {
    removeOnComplete: {
        count: 1000,
        age: 60 * 60,
    },
    attempts: 5,
    backoff: {
        type: 'exponential',
        delay: 5000,
    },
    removeOnFail: false,
};
import {ConnectionOptions, DefaultJobOptions} from "bullmq";

export const redisConnection:ConnectionOptions = {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!) || 6379,
    password: process.env.UPSTASH_REDIS_PASSWORD!,
    tls: {},
};

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
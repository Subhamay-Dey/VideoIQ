import {ConnectionOptions, DefaultJobOptions} from "bullmq";

export const redisConnection:ConnectionOptions = {
    host: process.env.REDIS_HOST!,
    port: 6379,
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
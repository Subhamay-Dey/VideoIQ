import { Job, Queue, QueueEvents, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "./queue";
import prisma from "../../prisma/db.config";

export const LoginQueueName: string = "LoginQueue";

export const LoginQueue:Queue = new Queue(LoginQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueOptions,
});

export const loginQueueEvents = new QueueEvents(LoginQueueName, {
    connection: redisConnection,
})

export const LoginWorker = new Worker(LoginQueueName, 
    async(job:Job) => {
    console.log(job.data);
    },
    {connection: redisConnection},
)

LoginWorker.on("failed", (job, error) => {
    console.error(`Job: ${job?.id!}, failed: ${error.message}`);
    
})
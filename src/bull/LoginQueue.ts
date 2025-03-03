import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "./queue";

export const LoginQueueName: string = "LoginQueue";

export const LoginQueue:Queue = new Queue(LoginQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueOptions,
});

export const LoginWorker = new Worker(LoginQueueName, 
    async(job:Job) => {
    console.log(job.data);
    },
    {connection: redisConnection},
)

LoginWorker.on("failed", (job, error) => {
    console.error(`Job: ${job?.id!}, failed: ${error.message}`);
})
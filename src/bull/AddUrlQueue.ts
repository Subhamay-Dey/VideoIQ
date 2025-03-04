import {Job, Queue, Worker} from "bullmq"
import { defaultQueueOptions, redisConnection } from "./queue";
import { error } from "console";
import { fail } from "assert";

export const AddUrlQueueName = "addurlqueue";

export const AddUrlQueue = new Queue(AddUrlQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueOptions,
});

export const AddUrlWorker = new Worker(AddUrlQueueName, 
    async (job: Job) => {
        console.log(job.data);
        
    }, {connection: redisConnection}
)

AddUrlWorker.on("failed", (job, error) => {
    console.error(`Job: ${job?.id!}, failed: ${error.message}`);
})
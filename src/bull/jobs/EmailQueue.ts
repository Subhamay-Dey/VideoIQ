import {Job, Queue, QueueEvents, Worker} from "bullmq";
import { defaultQueueOptions, redisConnection } from "../queue";
import { sendEmail } from "@/mails/mail";

export const EmailQueueName:string = "emailqueue";

export const EmailQueue:Queue = new Queue(EmailQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueOptions,
});

export const EmailQueueEvents = new QueueEvents(EmailQueueName, {
    connection: redisConnection,
});

export const EmailWorker = new Worker(EmailQueueName,
    async(job:Job) => {

        const {user} = job.data;

        console.log(`Processing login for user: ${user.email}`);

            await sendEmail(
                user.email, 
                "Welcome to VideoIQ 🎉", 
                `Hi ${user.name}, You have successfully logged in, Best wishes from Subhamay 😊`
            );

            return { success: true, user };
            
    },
    {connection:redisConnection},
)

EmailWorker.on("failed", (job, error) => {
    console.error(`Job: ${job?.id} failed: ${error.message}`)
});
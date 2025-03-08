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

        try {
            await sendEmail(
                user.email, 
                "Welcome to VideoIQ 🎉", 
                `Hi ${user.name}, You have successfully logged in, Best wishes from Subhamay 😊`
            );

            console.log(`✅ Email sent successfully to ${user.email}`);
    
            return { success: true, user };
        } catch (error) {
            console.error(`❌ Email job failed for ${user.email}:`, error);
            return { success: false, error };
        }
            
    },
    {connection:redisConnection},
)

EmailWorker.on("failed", (job, error) => {
    console.error(`Job: ${job?.id} failed: ${error.message}`)
});
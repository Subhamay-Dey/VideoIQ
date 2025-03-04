import { Job, Queue, QueueEvents, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "./queue";
import prisma from "../../prisma/db.config";
import { EmailQueue, EmailQueueEvents } from "./EmailQueue";

export const LoginQueueName: string = "LoginQueue";

export const LoginQueue:Queue = new Queue(LoginQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueOptions,
});

export const LoginQueueEvents = new QueueEvents(LoginQueueName, {
    connection: redisConnection,
})

export const LoginWorker = new Worker(LoginQueueName, 
    async(job:Job) => {
    console.log(job.data);
    const {user, account} = job.data;
    try {
        const findUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });
        
        if (findUser) {
          user.id = findUser?.id.toString();
          return true;
        }

        const data = await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name!,
            oauth_id: account?.providerAccountId!,
            provider: account?.provider!,
            image: user?.image,
          },
        });

        const job = await EmailQueue.add("send-email", {user:data});

        const result = await job.waitUntilFinished(EmailQueueEvents);

        if (!result?.success) {
            console.error("Email sending failed:", result?.error);
            return false;
        }

        return { success: true, user: { id: data.id } };
      } catch (error) {
        console.error("Login processing failed:", error);
      return { success: false, error };
      }
    },
    {connection: redisConnection},
)

LoginWorker.on("failed", (job, error) => {
    console.error(`Job: ${job?.id!}, failed: ${error.message}`);
})
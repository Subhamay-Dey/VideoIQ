import { Job, Queue, QueueEvents, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../queue";
import prisma from "../../../prisma/db.config";
import { EmailQueue, EmailQueueEvents } from "./EmailQueue";
import { Producer } from "@/kafka/producer";

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
    console.log("🔹 Processing login job:", job.data);
    const {user, account} = job.data;
    try {
        const findUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });
        
        if (findUser) {
          user.id = findUser?.id.toString();

          await Producer("user-auth", {
            status: "success",
            email: user.email,
            userId: user.id,
            provider: account.provider,
          })

          return {success: true, user: {id: findUser.id}};
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
        console.log(`📩 Email job added for: ${data.email}`);

        const result = await job.waitUntilFinished(EmailQueueEvents);

        if (!result?.success) {
            console.error("Email sending failed:", result?.error);
            return false;
        }

        await Producer("user-auth", {
          status: "success",
          email: data.email,
          userId: data.id,
          provider: account.provider,
        });

        return { success: true, user: { id: data.id } };
      } catch (error) {
        console.error("Login processing failed:", error);

        await Producer("user-auth", {
          status: "error",
          email: user.email,
          error: error,
        })

      return { success: false, error };
      }
    },
    {connection: redisConnection},
);

LoginWorker.on("failed", async(job, error) => {
    console.error(`Job: ${job?.id!}, failed: ${error.message}`);

    await Producer("user-auth", {
      status: "job_failed",
      jobID: job?.id!,
      error: error.message,
    });
});
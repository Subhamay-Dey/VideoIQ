import {Job, Queue, QueueEvents, Worker} from "bullmq"
import { defaultQueueOptions, redisConnection } from "./queue";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import {Document} from "@langchain/core/documents";
import prisma from "../../prisma/db.config";

export const AddUrlQueueName = "addurlqueue";

export const AddUrlQueue = new Queue(AddUrlQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueOptions,
});

export const AddUrlQueueEvents = new QueueEvents(AddUrlQueueName, {
    connection: redisConnection,
})

export const AddUrlWorker = new Worker(AddUrlQueueName, 
    async (job: Job) => {
        const {url, user_id} = job.data
        
        console.log(`Processing URL: ${url} for user: ${user_id}`);

        let text : Document<Record<string, any>>[]
        try {
            const loader = YoutubeLoader.createFromUrl(url, {
                language: "en",
                addVideoInfo: true,
                });
                
                text = await loader.load();
        } catch (error) {
            console.error("Invalid URL:", error);
            return;
        }

        const summary = await prisma.summary.create({
            data: {
                url,
                user_id: Number(user_id),
                title: text[0].metadata?.title ?? "No title",
            }
        })

        // const summar = await drizzle.insert(summary).values({
        //     url:payload.url, 
        //     user_id: Number(payload.user_id),
        //     title:text[0].metadata?.title ?? "No title",
        // }).returning();

        console.log(`Successfully processed and stored summary for ${url}`);

    }, {connection: redisConnection}
)

AddUrlWorker.on("failed", (job, error) => {
    console.error(`Job: ${job?.id!}, failed: ${error.message}`);
})
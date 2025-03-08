import { kafka } from "./client";

export async function Producer(topic: string, message: string) {
    
    const producer = kafka.producer();
    await producer.connect();

    try {
        await producer.send({
            topic,
            messages: [
                {value: JSON.stringify(message)}
            ]
        });
        console.log(`✅ Event sent to ${topic}`);
    } catch (error) {
        console.error("❌ Kafka Event Error:", error);
    }
}
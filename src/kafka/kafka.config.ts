import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
  clientId: "nextjs-app",
  brokers: [process.env.KAFKA_BROKER!],
  logLevel: logLevel.ERROR
});

export const producer = kafka.producer()
export const consumer = kafka.consumer({groupId: "nextjs-app"});

export const connectKafka = async () => {

  try {
    await producer.connect();
    await consumer.connect();

    await consumer.subscribe({ topic: "user-auth", fromBeginning: true });

    console.log("✅ Kafka Producer & Consumer connected");

    consumer.run({
      eachMessage: async({topic, message}) => {
        const eventData = JSON.parse(message.value!.toString());
        console.log(`🔹 User Auth Event Received:`, eventData);
      }
    })

  } catch (error) {

    console.error("❌ Kafka Connection Error:", error);

  }

};

export const sendKafkaEvent = async (topic: string, message: object) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`✅ Event sent to ${topic}`);
  } catch (error) {
    console.error("❌ Kafka Event Error:", error);
  }
};

// Graceful Shutdown for Next.js App
process.on("SIGINT", async () => {
  console.log("⏳ Closing Kafka...");
  await producer.disconnect();
  await consumer.disconnect();
  console.log("✅ Kafka disconnected");
  process.exit(0);
});
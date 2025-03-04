import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
  clientId: "nextjs-app",
  brokers: [process.env.KAFKA_BROKER!],
  logLevel: logLevel.ERROR
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({groupId: "nextjs-app"});

export const connectKafka = async () => {

  try {
    await producer.connect();
    await consumer.connect();

    await consumer.subscribe({ topic: "user-auth", fromBeginning: true });

    console.log("✅ Kafka Producer & Consumer connected");

  } catch (error) {

    console.error("❌ Kafka Connection Error:", error);

  }

};
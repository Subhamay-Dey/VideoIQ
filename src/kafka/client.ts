import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
    clientId: "VideoIQ-app",
    brokers: [process.env.KAFKA_BROKER!],
    logLevel: logLevel.ERROR
  });

export const producer = kafka.producer()
export const consumer = kafka.consumer({groupId: "auth-logs-group"});

export const connectKafka = async () => {

  try {
    await producer.connect();
    await consumer.connect();

    await consumer.subscribe({ topic: "user-auth", fromBeginning: true });
    
    consumer.run({
      eachMessage: async({topic, message}) => {
        const eventData = JSON.parse(message.value!.toString());
        console.log(`🔹 User Auth Event Received:`, eventData);
        if (eventData.status === "success") {
          console.log(`✅ User ${eventData.email} logged in successfully.`);
        } else if (eventData.status === "new_user") {
            console.log(`🎉 New user created: ${eventData.email}`);
        } else if (eventData.status === "error") {
            console.error(`❌ Login error for ${eventData.email}: ${eventData.error}`);
        }
      }
    })

    console.log("✅ Kafka Producer & Consumer connected");
    
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
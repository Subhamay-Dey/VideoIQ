import { kafka } from "./client";

export async function Consumer() {
    try {        
        const consumer = kafka.consumer({groupId: "auth-user"});
        await consumer.connect();
    
        await consumer.subscribe({
            topics: ["user-auth"],
            fromBeginning: true
        })
    
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
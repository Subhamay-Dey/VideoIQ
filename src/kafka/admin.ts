import { kafka } from "./client";

export async function Admin() {
    const admin = kafka.admin();
    console.log("Admin Connecting...");
    admin.connect();
    console.log("Admin Connected Successfully");
    console.log("Creating topic [user-auth]");
    await admin.createTopics({
        topics: [
            {
                topic: "user-auth",
            }
        ]
    })
    console.log("Topic Created Successfully [user-auth]");
    console.log("Disconnecting Admin...");
}
import { ChatOpenAI } from "@langchain/openai"

const gptModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_KEY!,
    model: "gpt-4o-mini",
    temperature: 0.3,
    streaming: true,
    maxTokens: 16000,
})

export {gptModel}
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
 
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'
 
export async function POST(req) {

  const { messages } = await req.json()
 
  const response = await openai.createChatCompletion({
    // model: "gpt-4",
    model: 'gpt-3.5-turbo',
    stream: true,
    messages
    // messages: [
    // { role: "system", content="Opening times 23:00 - 1am every tuesday"}
    //   ...messages
    // ]
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
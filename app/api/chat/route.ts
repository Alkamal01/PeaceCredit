import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const SYSTEM_PROMPT = `You are PeaceFinance AI, a helpful assistant for users of the PeaceFinance platform. Your role is to:

1. Help users understand their credit score and how to improve it
2. Guide users in managing their cooperatives and resources
3. Assist with identity verification and document submission
4. Provide information about available opportunities and resources
5. Answer questions about financial literacy and community building

Always be:
- Clear and concise in your responses
- Supportive and encouraging
- Culturally sensitive and inclusive
- Focused on community building and financial empowerment
- Aware of the user's context and available features

Never:
- Provide financial advice that could be harmful
- Share personal information about other users
- Make promises about specific outcomes
- Engage in discriminatory or harmful behavior`

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { message } = await req.json()
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    })

    return NextResponse.json({
      response: completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response at this time."
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    )
  }
} 
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const trustScore = await prisma.trustScore.findUnique({
      where: { userId: session.user.id }
    })

    if (!trustScore) {
      // Create initial trust score if it doesn't exist
      const newTrustScore = await prisma.trustScore.create({
        data: {
          userId: session.user.id,
          communityParticipation: 0,
          paymentHistory: 0,
          score: 0
        }
      })
      return NextResponse.json(newTrustScore)
    }

    return NextResponse.json(trustScore)
  } catch (error) {
    console.error("[TRUST_SCORE_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { communityParticipation, paymentHistory } = body

    const score = (
      (communityParticipation || 0) * 0.5 +
      (paymentHistory || 0) * 0.5
    )

    const trustScore = await prisma.trustScore.upsert({
      where: { userId: session.user.id },
      update: {
        communityParticipation: communityParticipation || undefined,
        paymentHistory: paymentHistory || undefined,
        score
      },
      create: {
        userId: session.user.id,
        communityParticipation: communityParticipation || 0,
        paymentHistory: paymentHistory || 0,
        score
      }
    })

    return NextResponse.json(trustScore)
  } catch (error) {
    console.error("[TRUST_SCORE_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 
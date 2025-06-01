import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { User, TrustScore, Credential } from "@prisma/client"

type UserWithRelations = User & {
  trustScore: TrustScore | null
  credentials: Credential[]
  documents: Array<{
    id: string
    type: string
    status: string
    date: Date
    userId: string
    createdAt: Date
    updatedAt: Date
  }>
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get user data with trust score and all related data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        trustScore: true,
        credentials: {
          orderBy: {
            date: 'desc'
          }
        },
        documents: {
          orderBy: {
            date: 'desc'
          }
        }
      }
    }) as UserWithRelations | null

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Calculate credit score based on trust score and other factors
    const baseScore = user.trustScore?.score || 0
    const verifiedCredentials = user.credentials.filter((c: Credential) => c.status === "verified").length
    const creditScore = Math.min(100, baseScore + (verifiedCredentials * 5))

    // Credit factors
    const creditFactors = [
      {
        name: "Payment History",
        score: user.trustScore?.paymentHistory || 0,
        weight: "High",
        description: "Based on your past payment behavior"
      },
      {
        name: "Credential Strength",
        score: user.credentials.length > 0 ? (verifiedCredentials / user.credentials.length) * 100 : 0,
        weight: "High",
        description: "Based on your verified credentials"
      },
      {
        name: "Account Age",
        score: Math.min(100, (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30) * 10),
        weight: "Medium",
        description: "Based on how long you've been with us"
      },
      {
        name: "Community Participation",
        score: user.trustScore?.communityParticipation || 0,
        weight: "Medium",
        description: "Based on your cooperative involvement"
      }
    ]

    // Recent changes (using credentials as a proxy for now)
    const recentChanges = user.credentials.slice(0, 5).map((cred: Credential) => ({
      date: cred.date,
      type: "credential",
      amount: cred.status === "verified" ? 5 : -2,
      description: `${cred.type} ${cred.status === "verified" ? "verified" : "rejected"}`
    }))

    // Get cooperatives data if available
    const cooperatives = await prisma.cooperative.findMany({
      where: {
        users: {
          some: {
            id: user.id
          }
        }
      },
      include: {
        tasks: true,
        proposals: true
      }
    })

    // Identity data
    const identity = {
      did: user.did,
      verificationStatus: user.did ? "verified" : "pending",
      documents: user.documents.map(doc => ({
        type: doc.type,
        status: doc.status,
        date: doc.date
      })),
      credentials: user.credentials.map(cred => ({
        type: cred.type,
        status: cred.status,
        date: cred.date
      }))
    }

    // Opportunities (mock data for now)
    const opportunities = {
      loans: [
        {
          id: "1",
          amount: 500,
          interest: 5,
          term: "6 months",
          status: "available"
        },
        {
          id: "2",
          amount: 1000,
          interest: 7,
          term: "12 months",
          status: "available"
        }
      ],
      grants: [
        {
          id: "1",
          amount: 2000,
          organization: "Community Development Fund",
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      training: [
        {
          id: "1",
          title: "Financial Literacy Basics",
          duration: "2 hours",
          level: "Beginner"
        },
        {
          id: "2",
          title: "Cooperative Management",
          duration: "4 hours",
          level: "Intermediate"
        }
      ]
    }

    return NextResponse.json({
      creditScore,
      creditFactors,
      recentChanges,
      cooperatives,
      identity,
      opportunities
    })
  } catch (error) {
    console.error("Credit data fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 
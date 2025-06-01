import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        credentials: {
          orderBy: {
            date: 'desc'
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      did: user.did,
      walletAddress: user.walletAddress,
      createdAt: user.createdAt,
      credentials: user.credentials
    })
  } catch (error) {
    console.error("Identity data fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { did, walletAddress } = body

    if (!did || !walletAddress) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        did,
        walletAddress,
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("[IDENTITY_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 
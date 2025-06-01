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

    const credentials = await prisma.credential.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(credentials)
  } catch (error) {
    console.error("[CREDENTIALS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { type } = body

    if (!type) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const credential = await prisma.credential.create({
      data: {
        type,
        status: "pending",
        userId: session.user.id
      }
    })

    return NextResponse.json(credential)
  } catch (error) {
    console.error("[CREDENTIALS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 
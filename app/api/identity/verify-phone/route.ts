import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// TODO: Integrate with a real SMS service
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { phone } = body

    if (!phone) {
      return new NextResponse("Phone number is required", { status: 400 })
    }

    // Generate verification code
    const code = generateVerificationCode()

    // TODO: Send SMS with verification code
    console.log(`Verification code for ${phone}: ${code}`)

    return NextResponse.json({ message: "Verification code sent", code })
  } catch (error) {
    console.error("[VERIFY_PHONE_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { phone, code } = body

    if (!phone || !code) {
      return new NextResponse("Phone and code are required", { status: 400 })
    }

    // For demo purposes, accept any 6-digit code
    if (code.length !== 6) {
      return new NextResponse("Invalid code format", { status: 400 })
    }

    // Update user's phone number
    await prisma.user.update({
      where: { id: session.user.id },
      data: { phone }
    })

    return NextResponse.json({ message: "Phone number verified" })
  } catch (error) {
    console.error("[VERIFY_PHONE_PUT]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 
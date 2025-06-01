import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    databaseUrl: process.env.DATABASE_URL,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET
  })
} 
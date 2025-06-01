import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get user settings using raw query
    let userSettings = null
    try {
      const result = await prisma.$queryRaw`
        SELECT "currency", "locale" FROM "User" WHERE "id" = ${user.id}
      `
      userSettings = Array.isArray(result) && result.length > 0 ? result[0] : null
    } catch (error) {
      console.error('Error fetching user settings:', error)
    }

    return NextResponse.json({
      success: true,
      data: {
        currency: userSettings?.currency || 'USD',
        locale: userSettings?.locale || 'en-US'
      }
    })

  } catch (error) {
    console.error('Currency settings fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { currency, locale } = body

    // Validate currency
    const supportedCurrencies = ['USD', 'NGN', 'GHS', 'KES', 'UGX', 'TZS', 'ZAR', 'XOF', 'XAF']
    if (!supportedCurrencies.includes(currency)) {
      return NextResponse.json({ error: 'Unsupported currency' }, { status: 400 })
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update user currency settings using raw query
    try {
      await prisma.$executeRaw`
        UPDATE "User" SET
          "currency" = ${currency},
          "locale" = ${locale || 'en-US'},
          "updatedAt" = NOW()
        WHERE "id" = ${user.id}
      `

      return NextResponse.json({
        success: true,
        message: 'Currency settings updated successfully'
      })

    } catch (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update currency settings' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Currency settings API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
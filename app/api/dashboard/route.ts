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

    // Get basic user info
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get financial profile using raw query to avoid TypeScript issues
    let financialProfile: any = null
    try {
      const result = await prisma.$queryRaw`
        SELECT * FROM "FinancialProfile" WHERE "userId" = ${user.id}
      `
      financialProfile = Array.isArray(result) && result.length > 0 ? result[0] : null
    } catch (error) {
      console.error('Error fetching financial profile:', error)
    }

    // Get trust score using raw query
    let trustScore: any = null
    try {
      const result = await prisma.$queryRaw`
        SELECT * FROM "TrustScore" WHERE "userId" = ${user.id}
      `
      trustScore = Array.isArray(result) && result.length > 0 ? result[0] : null
    } catch (error) {
      console.error('Error fetching trust score:', error)
    }

    // Get cooperatives using raw query
    let cooperatives: any[] = []
    try {
      const result = await prisma.$queryRaw`
        SELECT c.* FROM "Cooperative" c
        JOIN "_CooperativeToUser" cu ON c.id = cu."A"
        WHERE cu."B" = ${user.id}
      `
      cooperatives = Array.isArray(result) ? result : []
    } catch (error) {
      console.error('Error fetching cooperatives:', error)
    }

    // Calculate credit score and factors
    let creditScore = trustScore?.score || 0
    let creditFactors = {
      financialStability: trustScore?.financialStability || 0,
      communityTrust: trustScore?.communityTrust || 0,
      economicActivity: trustScore?.economicActivity || 0,
      identityVerification: trustScore?.identityVerification || (user.did ? 80 : 20),
      paymentHistory: trustScore?.paymentHistory || 0
    }

    // If user has financial profile but no trust score, calculate it
    if (financialProfile && !trustScore) {
      try {
        const calculationResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/financial-calculations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': request.headers.get('cookie') || ''
          },
          body: JSON.stringify({ 
            userId: user.id,
            groupCalculation: false 
          })
        })

        if (calculationResponse.ok) {
          const calculationResult = await calculationResponse.json()
          if (calculationResult.success) {
            creditScore = calculationResult.data.score
            creditFactors = {
              financialStability: calculationResult.data.factors.incomeStability || 0,
              communityTrust: calculationResult.data.factors.communityEngagement || 0,
              economicActivity: calculationResult.data.factors.businessActivity || 0,
              identityVerification: user.did ? 80 : 20,
              paymentHistory: 0
            }
          }
        }
      } catch (error) {
        console.error('Error calculating credit score:', error)
      }
    }

    // Calculate recent changes
    const recentChanges = [
      {
        factor: "Financial Stability",
        change: financialProfile ? "+5" : "0",
        description: financialProfile ? "Financial profile completed" : "Complete financial profile to improve score"
      },
      {
        factor: "Community Trust",
        change: cooperatives.length > 0 ? "+3" : "0",
        description: cooperatives.length > 0 ? "Active in cooperatives" : "Join a cooperative to build community trust"
      },
      {
        factor: "Identity Verification",
        change: user.did ? "+2" : "0",
        description: user.did ? "Identity verified" : "Complete identity verification"
      }
    ]

    // Calculate group statistics
    let groupStats = null
    if (cooperatives.length > 0) {
      try {
        // Get all users in cooperatives using raw query
        const allCoopUsersResult = await prisma.$queryRaw`
          SELECT DISTINCT u.* FROM "User" u
          JOIN "_CooperativeToUser" cu ON u.id = cu."B"
          WHERE cu."A" IN (${cooperatives.map((coop: any) => coop.id).join(',')})
        `
        const allCoopUsers = Array.isArray(allCoopUsersResult) ? allCoopUsersResult : []

        // Get trust scores for all coop users
        const userIds = allCoopUsers.map((u: any) => u.id)
        let trustScores: any[] = []
        if (userIds.length > 0) {
          const trustScoresResult = await prisma.$queryRaw`
            SELECT * FROM "TrustScore" WHERE "userId" IN (${userIds.join(',')})
          `
          trustScores = Array.isArray(trustScoresResult) ? trustScoresResult : []
        }

        const totalMembers = allCoopUsers.length
        const averageScore = trustScores.length > 0 
          ? trustScores.reduce((sum: number, ts: any) => sum + (ts.score || 0), 0) / trustScores.length
          : 0
        const totalBalancePool = cooperatives.reduce((sum: number, coop: any) => sum + (coop.balancePool || 0), 0)

        groupStats = {
          totalMembers,
          averageScore,
          totalBalancePool
        }
      } catch (error) {
        console.error('Error calculating group stats:', error)
      }
    }

    const dashboardData = {
      creditScore,
      creditFactors,
      recentChanges,
      hasFinancialProfile: !!financialProfile,
      groupStats,
      financialProfileData: financialProfile ? {
        monthlyIncome: financialProfile.monthlyIncome,
        incomeSource: financialProfile.incomeSource,
        totalExpenses: (financialProfile.housingExpense || 0) + 
                      (financialProfile.foodExpense || 0) + 
                      (financialProfile.transportationExpense || 0) + 
                      (financialProfile.utilitiesExpense || 0) + 
                      (financialProfile.healthcareExpense || 0) + 
                      (financialProfile.educationExpense || 0) + 
                      (financialProfile.otherExpenses || 0),
        totalAssets: (financialProfile.propertyValue || 0) + 
                    (financialProfile.vehiclesValue || 0) + 
                    (financialProfile.livestockValue || 0) + 
                    (financialProfile.equipmentValue || 0) + 
                    (financialProfile.savingsValue || 0) + 
                    (financialProfile.otherAssetsValue || 0),
        businessType: financialProfile.businessType,
        businessRegistration: financialProfile.businessRegistration
      } : null,
      recommendations: [
        !financialProfile ? "Complete your financial profile to get an accurate credit score" : null,
        cooperatives.length === 0 ? "Join a cooperative to build community trust" : null,
        !user.did ? "Complete identity verification to improve your score" : null,
        creditScore < 60 ? "Focus on improving financial stability and expense management" : null
      ].filter(Boolean)
    }

    return NextResponse.json({
      success: true,
      data: dashboardData
    })

  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
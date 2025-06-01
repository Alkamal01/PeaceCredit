import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Credit scoring algorithm based on financial profile data
interface CreditFactors {
  incomeStability: number;
  debtToIncomeRatio: number;
  assetValue: number;
  expenseManagement: number;
  businessActivity: number;
  communityEngagement: number;
  financialDiscipline: number;
}

interface CreditScoreResult {
  score: number;
  factors: CreditFactors;
  recommendations: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

function calculateCreditScore(financialProfile: any): CreditScoreResult {
  const factors: CreditFactors = {
    incomeStability: 0,
    debtToIncomeRatio: 0,
    assetValue: 0,
    expenseManagement: 0,
    businessActivity: 0,
    communityEngagement: 0,
    financialDiscipline: 0
  };

  const recommendations: string[] = [];

  // 1. Income Stability (25% weight)
  if (financialProfile.monthlyIncome) {
    if (financialProfile.monthlyIncome > 5000) factors.incomeStability = 100;
    else if (financialProfile.monthlyIncome > 2000) factors.incomeStability = 80;
    else if (financialProfile.monthlyIncome > 1000) factors.incomeStability = 60;
    else factors.incomeStability = 40;

    if (financialProfile.seasonalIncome) {
      factors.incomeStability *= 0.8; // Reduce for seasonal income
      recommendations.push("Consider diversifying income sources to reduce seasonal dependency");
    }
  } else {
    recommendations.push("Please provide monthly income information for better credit assessment");
  }

  // 2. Debt-to-Income Ratio (20% weight)
  const totalExpenses = (financialProfile.housingExpense || 0) +
                        (financialProfile.foodExpense || 0) +
                        (financialProfile.transportationExpense || 0) +
                        (financialProfile.utilitiesExpense || 0) +
                        (financialProfile.healthcareExpense || 0) +
                        (financialProfile.educationExpense || 0) +
                        (financialProfile.otherExpenses || 0);

  if (financialProfile.monthlyIncome && totalExpenses > 0) {
    const expenseRatio = totalExpenses / financialProfile.monthlyIncome;
    if (expenseRatio < 0.3) factors.debtToIncomeRatio = 100;
    else if (expenseRatio < 0.5) factors.debtToIncomeRatio = 80;
    else if (expenseRatio < 0.7) factors.debtToIncomeRatio = 60;
    else factors.debtToIncomeRatio = 30;

    if (expenseRatio > 0.6) {
      recommendations.push("Consider reducing monthly expenses to improve financial stability");
    }
  }

  // 3. Asset Value (15% weight)
  const totalAssets = (financialProfile.propertyValue || 0) +
                     (financialProfile.vehiclesValue || 0) +
                     (financialProfile.livestockValue || 0) +
                     (financialProfile.equipmentValue || 0) +
                     (financialProfile.savingsValue || 0) +
                     (financialProfile.otherAssetsValue || 0);

  if (totalAssets > 100000) factors.assetValue = 100;
  else if (totalAssets > 50000) factors.assetValue = 80;
  else if (totalAssets > 20000) factors.assetValue = 60;
  else if (totalAssets > 5000) factors.assetValue = 40;
  else factors.assetValue = 20;

  if (totalAssets < 10000) {
    recommendations.push("Building assets can significantly improve your credit profile");
  }

  // 4. Expense Management (10% weight)
  if (financialProfile.monthlyIncome && totalExpenses > 0) {
    const savingsRate = (financialProfile.monthlyIncome - totalExpenses) / financialProfile.monthlyIncome;
    if (savingsRate > 0.3) factors.expenseManagement = 100;
    else if (savingsRate > 0.2) factors.expenseManagement = 80;
    else if (savingsRate > 0.1) factors.expenseManagement = 60;
    else if (savingsRate > 0) factors.expenseManagement = 40;
    else factors.expenseManagement = 20;

    if (savingsRate < 0.1) {
      recommendations.push("Try to save at least 10% of your monthly income");
    }
  }

  // 5. Business Activity (15% weight)
  if (financialProfile.businessType) {
    factors.businessActivity = 60;
    if (financialProfile.businessRegistration) {
      factors.businessActivity = 80;
    }
    if (financialProfile.farmOwnership) {
      factors.businessActivity += 20;
    }
  } else {
    recommendations.push("Consider starting a small business to improve your economic profile");
  }

  // 6. Community Engagement (10% weight)
  if (financialProfile.communityRole) {
    factors.communityEngagement = 70;
    if (financialProfile.socialConnections === 'strong') {
      factors.communityEngagement = 90;
    }
  } else {
    recommendations.push("Active community participation can enhance your credit profile");
  }

  // 7. Financial Discipline (5% weight)
  if (financialProfile.bankAccount) {
    factors.financialDiscipline = 70;
    if (financialProfile.savingsValue && financialProfile.savingsValue > 0) {
      factors.financialDiscipline = 90;
    }
  } else {
    recommendations.push("Having a bank account demonstrates financial responsibility");
  }

  // Calculate weighted score
  const weightedScore = (
    factors.incomeStability * 0.25 +
    factors.debtToIncomeRatio * 0.20 +
    factors.assetValue * 0.15 +
    factors.expenseManagement * 0.10 +
    factors.businessActivity * 0.15 +
    factors.communityEngagement * 0.10 +
    factors.financialDiscipline * 0.05
  );

  // Determine risk level
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  if (weightedScore >= 80) riskLevel = 'LOW';
  else if (weightedScore >= 60) riskLevel = 'MEDIUM';
  else riskLevel = 'HIGH';

  return {
    score: Math.round(weightedScore),
    factors,
    recommendations,
    riskLevel
  };
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userId, groupCalculation = false } = body;

    // If group calculation, get multiple users' data
    if (groupCalculation) {
      const { userIds } = body;
      
      if (!userIds || !Array.isArray(userIds)) {
        return NextResponse.json({ error: 'User IDs array required for group calculation' }, { status: 400 });
      }

      // Get financial profiles for all users in the group
      const financialProfiles = await prisma.financialProfile.findMany({
        where: {
          userId: { in: userIds }
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      // Calculate individual scores and group metrics
      const individualResults = financialProfiles.map(profile => ({
        userId: profile.userId,
        userName: profile.user.name,
        ...calculateCreditScore(profile)
      }));

      // Group calculations
      const groupScore = individualResults.reduce((sum, result) => sum + result.score, 0) / individualResults.length;
      const groupRiskDistribution = {
        LOW: individualResults.filter(r => r.riskLevel === 'LOW').length,
        MEDIUM: individualResults.filter(r => r.riskLevel === 'MEDIUM').length,
        HIGH: individualResults.filter(r => r.riskLevel === 'HIGH').length
      };

      // Group recommendations
      const groupRecommendations = [
        `Group average credit score: ${Math.round(groupScore)}`,
        `Risk distribution: ${groupRiskDistribution.LOW} low risk, ${groupRiskDistribution.MEDIUM} medium risk, ${groupRiskDistribution.HIGH} high risk members`,
        groupScore > 75 ? "This group shows strong collective financial health" : 
        groupScore > 60 ? "This group has moderate financial stability with room for improvement" :
        "This group may benefit from financial literacy programs and support"
      ];

      return NextResponse.json({
        success: true,
        data: {
          groupScore: Math.round(groupScore),
          groupRiskDistribution,
          groupRecommendations,
          individualResults,
          calculatedAt: new Date().toISOString()
        }
      });
    } else {
      // Individual calculation
      const targetUserId = userId || session.user.id;
      
      const user = await prisma.user.findUnique({
        where: { id: targetUserId },
        include: { financialProfile: true }
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      if (!user.financialProfile) {
        return NextResponse.json({ 
          error: 'Financial profile not found. Please complete your financial profile first.' 
        }, { status: 404 });
      }

      const result = calculateCreditScore(user.financialProfile);

      // Update the user's trust score in the database
      await prisma.trustScore.upsert({
        where: { userId: user.id },
        update: {
          score: result.score,
          financialStability: result.factors.incomeStability,
          economicActivity: result.factors.businessActivity,
          updatedAt: new Date()
        },
        create: {
          userId: user.id,
          score: result.score,
          financialStability: result.factors.incomeStability,
          economicActivity: result.factors.businessActivity,
          paymentHistory: 0,
          communityParticipation: result.factors.communityEngagement,
          communityTrust: result.factors.communityEngagement,
          identityVerification: 0
        }
      });

      return NextResponse.json({
        success: true,
        data: {
          userId: user.id,
          userName: user.name,
          ...result,
          calculatedAt: new Date().toISOString()
        }
      });
    }

  } catch (error) {
    console.error('Error calculating credit score:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const groupId = searchParams.get('groupId');

    if (groupId) {
      // Get group financial summary
      const cooperative = await prisma.cooperative.findUnique({
        where: { id: groupId },
        include: {
          users: {
            include: {
              financialProfile: true,
              trustScore: true
            }
          }
        }
      });

      if (!cooperative) {
        return NextResponse.json({ error: 'Group not found' }, { status: 404 });
      }

      const groupSummary = {
        groupId: cooperative.id,
        groupName: cooperative.name,
        memberCount: cooperative.users.length,
        averageScore: cooperative.users.reduce((sum, user) => 
          sum + (user.trustScore?.score || 0), 0) / cooperative.users.length,
        totalAssets: cooperative.users.reduce((sum, user) => {
          const profile = user.financialProfile;
          if (!profile) return sum;
          return sum + (profile.propertyValue || 0) + (profile.vehiclesValue || 0) + 
                 (profile.livestockValue || 0) + (profile.equipmentValue || 0) + 
                 (profile.savingsValue || 0) + (profile.otherAssetsValue || 0);
        }, 0),
        balancePool: cooperative.balancePool
      };

      return NextResponse.json({
        success: true,
        data: groupSummary
      });
    } else {
      // Get individual financial summary
      const targetUserId = userId || session.user.id;
      
      const user = await prisma.user.findUnique({
        where: { id: targetUserId },
        include: { 
          financialProfile: true,
          trustScore: true
        }
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        data: {
          userId: user.id,
          financialProfile: user.financialProfile,
          trustScore: user.trustScore,
          lastUpdated: user.financialProfile?.updatedAt || null
        }
      });
    }

  } catch (error) {
    console.error('Error fetching financial data:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 
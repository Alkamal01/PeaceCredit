import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get financial profile using raw query
    let financialProfile = null;
    try {
      const result = await prisma.$queryRaw`
        SELECT * FROM "FinancialProfile" WHERE "userId" = ${user.id}
      `;
      financialProfile = Array.isArray(result) && result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error fetching financial profile:', error);
    }

    if (!financialProfile) {
      return NextResponse.json({ 
        success: true, 
        data: null,
        message: 'No financial profile found' 
      });
    }

    return NextResponse.json({
      success: true,
      data: financialProfile
    });

  } catch (error) {
    console.error('Financial profile fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create or update financial profile using raw query
    try {
      // Check if profile exists
      const existingProfile = await prisma.$queryRaw`
        SELECT id FROM "FinancialProfile" WHERE "userId" = ${user.id}
      `;
      
      const profileExists = Array.isArray(existingProfile) && existingProfile.length > 0;

      if (profileExists) {
        // Update existing profile
        await prisma.$executeRaw`
          UPDATE "FinancialProfile" SET
            "monthlyIncome" = ${parseFloat(body.monthlyIncome) || 0},
            "incomeSource" = ${body.incomeSource || ''},
            "bankAccount" = ${body.bankAccount || ''},
            "existingDebts" = ${body.existingDebts || ''},
            "housingExpense" = ${parseFloat(body.housingExpense) || 0},
            "foodExpense" = ${parseFloat(body.foodExpense) || 0},
            "transportationExpense" = ${parseFloat(body.transportationExpense) || 0},
            "utilitiesExpense" = ${parseFloat(body.utilitiesExpense) || 0},
            "healthcareExpense" = ${parseFloat(body.healthcareExpense) || 0},
            "educationExpense" = ${parseFloat(body.educationExpense) || 0},
            "otherExpenses" = ${parseFloat(body.otherExpenses) || 0},
            "businessType" = ${body.businessType || ''},
            "businessRegistration" = ${body.businessRegistration || false},
            "farmOwnership" = ${body.farmOwnership || false},
            "propertyValue" = ${parseFloat(body.propertyValue) || 0},
            "vehiclesValue" = ${parseFloat(body.vehiclesValue) || 0},
            "livestockValue" = ${parseFloat(body.livestockValue) || 0},
            "equipmentValue" = ${parseFloat(body.equipmentValue) || 0},
            "savingsValue" = ${parseFloat(body.savingsValue) || 0},
            "otherAssetsValue" = ${parseFloat(body.otherAssetsValue) || 0},
            "spendingPatterns" = ${body.spendingPatterns || ''},
            "seasonalIncome" = ${body.seasonalIncome || false},
            "incomeVariation" = ${body.incomeVariation || ''},
            "communityRole" = ${body.communityRole || ''},
            "socialConnections" = ${body.socialConnections || ''},
            "updatedAt" = NOW()
          WHERE "userId" = ${user.id}
        `;
      } else {
        // Create new profile
        await prisma.$executeRaw`
          INSERT INTO "FinancialProfile" (
            "id", "userId", "monthlyIncome", "incomeSource", "bankAccount", "existingDebts",
            "housingExpense", "foodExpense", "transportationExpense", "utilitiesExpense",
            "healthcareExpense", "educationExpense", "otherExpenses", "businessType",
            "businessRegistration", "farmOwnership", "propertyValue", "vehiclesValue",
            "livestockValue", "equipmentValue", "savingsValue", "otherAssetsValue",
            "spendingPatterns", "seasonalIncome", "incomeVariation", "communityRole",
            "socialConnections", "createdAt", "updatedAt"
          ) VALUES (
            ${`fp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`},
            ${user.id},
            ${parseFloat(body.monthlyIncome) || 0},
            ${body.incomeSource || ''},
            ${body.bankAccount || ''},
            ${body.existingDebts || ''},
            ${parseFloat(body.housingExpense) || 0},
            ${parseFloat(body.foodExpense) || 0},
            ${parseFloat(body.transportationExpense) || 0},
            ${parseFloat(body.utilitiesExpense) || 0},
            ${parseFloat(body.healthcareExpense) || 0},
            ${parseFloat(body.educationExpense) || 0},
            ${parseFloat(body.otherExpenses) || 0},
            ${body.businessType || ''},
            ${body.businessRegistration || false},
            ${body.farmOwnership || false},
            ${parseFloat(body.propertyValue) || 0},
            ${parseFloat(body.vehiclesValue) || 0},
            ${parseFloat(body.livestockValue) || 0},
            ${parseFloat(body.equipmentValue) || 0},
            ${parseFloat(body.savingsValue) || 0},
            ${parseFloat(body.otherAssetsValue) || 0},
            ${body.spendingPatterns || ''},
            ${body.seasonalIncome || false},
            ${body.incomeVariation || ''},
            ${body.communityRole || ''},
            ${body.socialConnections || ''},
            NOW(),
            NOW()
          )
        `;
      }

      return NextResponse.json({
        success: true,
        message: profileExists ? 'Financial profile updated successfully' : 'Financial profile created successfully'
      });

    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save financial profile' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Financial profile API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create test users
  const hashedPassword = await hash('password123', 12)
  
  const user1 = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      phone: '+1234567890',
      location: 'Test City',
      did: 'did:example:123456789',
      currency: 'NGN',
      locale: 'en-US',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'admin@peacecredit.com' },
    update: {},
    create: {
      email: 'admin@peacecredit.com',
      name: 'Admin User',
      password: hashedPassword,
      phone: '+1987654321',
      location: 'Admin City',
      did: 'did:example:987654321',
      currency: 'USD',
      locale: 'en-US',
    },
  })

  // Create financial profile for test user
  await prisma.financialProfile.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      monthlyIncome: 50000,
      incomeSource: 'Small Business',
      bankAccount: 'Yes',
      existingDebts: 'None',
      housingExpense: 15000,
      foodExpense: 8000,
      transportationExpense: 5000,
      utilitiesExpense: 3000,
      healthcareExpense: 2000,
      educationExpense: 1000,
      otherExpenses: 3000,
      businessType: 'Retail',
      businessRegistration: true,
      farmOwnership: false,
      propertyValue: 200000,
      vehiclesValue: 30000,
      livestockValue: 0,
      equipmentValue: 15000,
      savingsValue: 25000,
      otherAssetsValue: 5000,
      spendingPatterns: 'Conservative',
      seasonalIncome: false,
      incomeVariation: 'Stable',
      communityRole: 'Business Owner',
      socialConnections: 'Strong',
      businessDocuments: ['business_license.pdf'],
      farmDocuments: [],
      tradeLicenses: ['trade_license.pdf'],
      salesRecords: ['sales_2024.pdf'],
    },
  })

  // Create trust score for test user
  await prisma.trustScore.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      communityParticipation: 85,
      paymentHistory: 90,
      score: 720,
      financialStability: 80,
      communityTrust: 75,
      economicActivity: 85,
      identityVerification: 95,
    },
  })

  // Create a cooperative
  const cooperative = await prisma.cooperative.upsert({
    where: { id: 'coop-1' },
    update: {},
    create: {
      id: 'coop-1',
      name: 'Local Business Cooperative',
      balancePool: 150000,
      users: {
        connect: [{ id: user1.id }, { id: user2.id }]
      }
    },
  })

  console.log('Database seeded successfully!')
  console.log('Test users created:')
  console.log('- test@example.com (password: password123) - Has financial profile and trust score')
  console.log('- admin@peacecredit.com (password: password123)')
  console.log('- Created cooperative with both users')
  console.log('- Test user has credit score of 720 with detailed financial data')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
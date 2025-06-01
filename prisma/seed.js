const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcrypt')

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
    },
  })

  console.log('Database seeded successfully!')
  console.log('Test users created:')
  console.log('- test@example.com (password: password123)')
  console.log('- admin@peacecredit.com (password: password123)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      phone: string
      did?: string | null
      walletAddress?: string | null
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    phone: string
    did?: string | null
    walletAddress?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    name?: string | null
    phone: string
    did?: string | null
    walletAddress?: string | null
  }
} 
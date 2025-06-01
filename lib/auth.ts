import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required")
        }

        try {
          // Find user directly in the authorize function
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) {
            throw new Error("No account found with this email address. Please sign up first.")
          }

          const isValid = await compare(credentials.password, user.password)

          if (!isValid) {
            throw new Error("Invalid password. Please check your credentials and try again.")
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            did: user.did,
            walletAddress: user.walletAddress,
          }
        } catch (error) {
          console.error('Auth error:', error)
          if (error instanceof Error) {
            throw error
          }
          throw new Error("Authentication failed. Please try again.")
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        }
      }
      return token
    },
  },
} 
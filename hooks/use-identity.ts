"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export interface Identity {
  id: string
  name: string | null
  email: string
  phone: string | null
  location: string | null
  did: string | null
  walletAddress: string | null
  createdAt: string
  credentials: {
    id: string
    type: string
    status: string
    date: string
  }[]
}

export function useIdentity() {
  const { data: session, status } = useSession()
  const [identity, setIdentity] = useState<Identity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIdentity = async () => {
    if (status === "loading") return
    if (!session?.user?.email) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/identity")
      if (!response.ok) {
        throw new Error("Failed to fetch identity data")
      }
      const data = await response.json()
      setIdentity(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIdentity()
  }, [session, status])

  const createDID = async (did: string, walletAddress: string) => {
    try {
      setError(null)
      const response = await fetch("/api/identity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ did, walletAddress }),
      })
      if (!response.ok) {
        throw new Error("Failed to create DID")
      }
      const data = await response.json()
      setIdentity(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create DID")
      throw err
    }
  }

  const requestCredential = async (type: string, issuer: string, description?: string) => {
    try {
      setError(null)
      const response = await fetch("/api/identity/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, issuer, description }),
      })
      if (!response.ok) {
        throw new Error("Failed to request credential")
      }
      const data = await response.json()
      await fetchIdentity() // Refresh identity data
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request credential")
      throw err
    }
  }

  const verifyPhone = async (phone: string) => {
    try {
      setError(null)
      const response = await fetch("/api/identity/verify-phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      })
      if (!response.ok) {
        throw new Error("Failed to verify phone")
      }
      return await response.json()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify phone")
      throw err
    }
  }

  const confirmPhoneVerification = async (phone: string, code: string) => {
    try {
      setError(null)
      const response = await fetch("/api/identity/verify-phone", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, code }),
      })
      if (!response.ok) {
        throw new Error("Failed to confirm phone verification")
      }
      await fetchIdentity() // Refresh identity data
      return await response.json()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to confirm phone verification")
      throw err
    }
  }

  return {
    identity,
    loading,
    error,
    isAuthenticated: !!session?.user,
    createDID,
    requestCredential,
    verifyPhone,
    confirmPhoneVerification,
  }
} 
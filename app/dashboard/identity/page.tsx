"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useIdentity } from "@/hooks/use-identity"
import { CheckCircle2, Clock, XCircle } from "lucide-react"

export default function IdentityPage() {
  const router = useRouter()
  const { identity, loading, error, isAuthenticated } = useIdentity()
  const [isCreatingDID, setIsCreatingDID] = useState(false)

  if (!isAuthenticated) {
    router.push("/auth/login")
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => router.refresh()}>Retry</Button>
      </div>
    )
  }

  if (!identity) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No identity data available</p>
      </div>
    )
  }

  const handleCreateDID = async () => {
    try {
      setIsCreatingDID(true)
      // Here you would typically call your DID creation service
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.refresh()
    } catch (error) {
      console.error("Failed to create DID:", error)
    } finally {
      setIsCreatingDID(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        {/* Identity Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Identity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{identity.name || "Not set"}</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{identity.email}</p>
                </div>
                <Badge variant="outline">Verified</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{identity.phone || "Not set"}</p>
                </div>
                <Button variant="outline" size="sm">
                  Add
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{identity.location || "Not set"}</p>
                </div>
                <Button variant="outline" size="sm">
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Decentralized Identity */}
        <Card>
          <CardHeader>
            <CardTitle>Decentralized Identity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">DID</p>
                  <p className="font-medium">{identity.did || "Not created"}</p>
                </div>
                {!identity.did && (
                  <Button 
                    onClick={handleCreateDID}
                    disabled={isCreatingDID}
                  >
                    {isCreatingDID ? "Creating..." : "Create DID"}
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Wallet Address</p>
                  <p className="font-medium">{identity.walletAddress || "Not connected"}</p>
                </div>
                {!identity.walletAddress && (
                  <Button variant="outline">
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credentials */}
        <Card>
          <CardHeader>
            <CardTitle>Credentials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {identity.credentials.map((credential) => (
                <div key={credential.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {credential.status === "verified" ? (
                      <CheckCircle2 className="text-green-500" />
                    ) : credential.status === "pending" ? (
                      <Clock className="text-yellow-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{credential.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(credential.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant={credential.status === "verified" ? "default" : "secondary"}>
                    {credential.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
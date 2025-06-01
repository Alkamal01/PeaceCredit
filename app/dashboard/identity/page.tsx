"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useIdentity } from "@/hooks/use-identity"
import { useTranslations } from "@/contexts/TranslationsContext"
import { CheckCircle2, Clock, XCircle, Loader2, AlertCircle } from "lucide-react"

export default function IdentityPage() {
  const router = useRouter()
  const { identity, loading, error, isAuthenticated, createDID } = useIdentity()
  const { t, isLoading: translationsLoading } = useTranslations()
  const [isCreatingDID, setIsCreatingDID] = useState(false)

  if (!isAuthenticated) {
    router.push("/auth/login")
    return null
  }

  if (loading || translationsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>{t('common.loading')}</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => router.refresh()}>{t('common.refresh')}</Button>
      </div>
    )
  }

  if (!identity) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{t('errors.not_found')}</p>
      </div>
    )
  }

  const handleCreateDID = async () => {
    try {
      setIsCreatingDID(true)
      // Generate a mock DID and wallet address for demo
      const mockDID = `did:example:${Date.now()}`
      const mockWalletAddress = `0x${Math.random().toString(16).substr(2, 40)}`
      await createDID(mockDID, mockWalletAddress)
    } catch (error) {
      console.error("Failed to create DID:", error)
    } finally {
      setIsCreatingDID(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{t('identity.title')}</h1>
        <p className="text-gray-600 mt-2">{t('identity.subtitle')}</p>
      </div>

      <div className="grid gap-6">
        {/* Identity Overview */}
        <Card>
          <CardHeader>
            <CardTitle>{t('identity.overview')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('identity.name')}</p>
                  <p className="font-medium">{identity.name || t('identity.not_set')}</p>
                </div>
                <Button variant="outline" size="sm">
                  {t('identity.edit')}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('identity.email')}</p>
                  <p className="font-medium">{identity.email}</p>
                </div>
                <Badge variant="outline">{t('identity.verified')}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('identity.phone')}</p>
                  <p className="font-medium">{identity.phone || t('identity.not_set')}</p>
                </div>
                <Button variant="outline" size="sm">
                  {identity.phone ? t('identity.edit') : t('identity.add')}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('identity.location')}</p>
                  <p className="font-medium">{identity.location || t('identity.not_set')}</p>
                </div>
                <Button variant="outline" size="sm">
                  {identity.location ? t('identity.edit') : t('identity.add')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Decentralized Identity */}
        <Card>
          <CardHeader>
            <CardTitle>{t('identity.decentralized_identity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('identity.did')}</p>
                  <p className="font-medium font-mono text-sm break-all">{identity.did || t('identity.not_created')}</p>
                </div>
                {!identity.did && (
                  <Button 
                    onClick={handleCreateDID}
                    disabled={isCreatingDID}
                  >
                    {isCreatingDID ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('identity.creating')}
                      </>
                    ) : (
                      t('identity.create_did')
                    )}
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('identity.wallet_address')}</p>
                  <p className="font-medium font-mono text-sm break-all">{identity.walletAddress || t('identity.not_connected')}</p>
                </div>
                {!identity.walletAddress && (
                  <Button variant="outline">
                    {t('identity.connect_wallet')}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credentials */}
        <Card>
          <CardHeader>
            <CardTitle>{t('identity.credentials')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {identity.credentials && identity.credentials.length > 0 ? (
                identity.credentials.map((credential) => (
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
                        <p className="font-medium">
                          {t(`identity.credential_types.${credential.type}`) || credential.type}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(credential.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={credential.status === "verified" ? "default" : "secondary"}>
                      {t(`identity.${credential.status}`)}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">{t('identity.no_credentials')}</p>
                  <Button>
                    {t('identity.add_credential')}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
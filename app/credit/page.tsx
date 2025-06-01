"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, XCircle, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CreditData {
  creditScore: number
  creditFactors: {
    name: string
    score: number
    weight: string
    description: string
  }[]
  creditHistory: {
    date: string
    type: string
    amount: number
    status: string
    description: string
  }[]
  user: {
    id: string
    name: string | null
    email: string
    phone: string | null
    location: string | null
    did: string | null
    walletAddress: string | null
    createdAt: string
  }
  stats: {
    totalCredentials: number
    verifiedCredentials: number
    totalReferrals: number
    acceptedReferrals: number
  }
}

export default function CreditPage() {
  const router = useRouter()
  const [creditData, setCreditData] = useState<CreditData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCreditData = async () => {
      try {
        const response = await fetch("/api/credit")
        if (!response.ok) {
          throw new Error("Failed to fetch credit data")
        }
        const data = await response.json()
        setCreditData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchCreditData()
  }, [])

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

  if (!creditData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No credit data available</p>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Poor"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        {/* Credit Score Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-4xl font-bold mb-2">{creditData.creditScore}</h2>
                <p className={`text-lg font-medium ${getScoreColor(creditData.creditScore)}`}>
                  {getScoreLabel(creditData.creditScore)}
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Verified Credentials: {creditData.stats.verifiedCredentials}/{creditData.stats.totalCredentials}</p>
                  <p>Accepted Referrals: {creditData.stats.acceptedReferrals}/{creditData.stats.totalReferrals}</p>
                </div>
              </div>
              <div className="w-32 h-32 relative">
                <Progress value={creditData.creditScore} className="h-32 w-32 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{creditData.creditScore}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Factors */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditData.creditFactors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{factor.name}</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{factor.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-sm text-muted-foreground">Weight: {factor.weight}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${getScoreColor(factor.score)}`}>
                      {factor.score}%
                    </span>
                    <Progress value={factor.score} className="w-32" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Credit History */}
        <Card>
          <CardHeader>
            <CardTitle>Credit History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditData.creditHistory.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {item.status === "verified" ? (
                      <CheckCircle2 className="text-green-500" />
                    ) : item.status === "pending" ? (
                      <Clock className="text-yellow-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{item.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.status === "verified" ? "default" : "secondary"}>
                      {item.status}
                    </Badge>
                    {item.amount > 0 && (
                      <span className="font-medium">
                        <span className="text-green-500 flex items-center">
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          +{item.amount}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
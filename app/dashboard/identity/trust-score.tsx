"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useIdentity } from "@/hooks/use-identity"
import {
  Shield,
  Users,
  Key,
  Clock,
  LucideIcon,
} from "lucide-react"

interface TrustScoreProps {
  did: string
}

interface TrustFactor {
  name: string
  score: number
  weight: number
  icon: LucideIcon
  description: string
}

interface TrustScoreData {
  id: string
  userId: string
  communityParticipation: number
  paymentHistory: number
  score: number
  createdAt: string
  updatedAt: string
}

export function TrustScore({ did }: TrustScoreProps) {
  const { identity } = useIdentity()
  const [trustScore, setTrustScore] = useState<TrustScoreData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrustScore = async () => {
      try {
        const response = await fetch("/api/identity/trust-score")
        if (response.ok) {
          const data = await response.json()
          setTrustScore(data)
        }
      } catch (error) {
        console.error("Failed to fetch trust score:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrustScore()
  }, [])

  const trustFactors: TrustFactor[] = [
    {
      name: "Community Participation",
      score: trustScore?.communityParticipation || 0,
      weight: 0.5,
      icon: Users,
      description: "Based on your active participation in community activities",
    },
    {
      name: "Payment History",
      score: trustScore?.paymentHistory || 0,
      weight: 0.5,
      icon: Clock,
      description: "Based on your transaction history and repayment record",
    },
  ]

  const totalScore = trustScore?.score || 0

  const recentActivities = [
    {
      type: "Community Event",
      description: "Participated in community meeting",
      date: "2024-03-15",
      impact: "+5 points",
    },
    {
      type: "Credential Added",
      description: "Added government ID verification",
      date: "2024-03-10",
      impact: "+10 points",
    },
    {
      type: "Transaction",
      description: "Completed loan repayment",
      date: "2024-03-05",
      impact: "+8 points",
    },
  ]

  if (loading) {
    return <div>Loading trust score...</div>
  }

  return (
    <div className="space-y-6">
      {/* Overall Trust Score */}
      <Card>
        <CardHeader>
          <CardTitle>Trust Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-3xl font-bold">{Math.round(totalScore)}</h3>
              <p className="text-sm text-gray-600">Overall Trust Score</p>
            </div>
            <div className="w-32">
              <Progress value={totalScore} className="h-2" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Active Credentials</p>
              <p className="text-2xl font-bold">{identity?.credentials.filter(c => c.status === "verified").length || 0}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Community Endorsements</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Trust Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trustFactors.map((factor) => {
              const Icon = factor.icon
              return (
                <div key={factor.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{factor.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{factor.score} points</span>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.date} className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-green-100">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">{activity.type}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-green-600">{activity.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trust Score Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Trust Score Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Current Benefits</h4>
              <ul className="mt-2 space-y-2 text-blue-700">
                <li>• Access to community resources</li>
                <li>• Basic microloan eligibility</li>
                <li>• Community voting rights</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Next Level Benefits</h4>
              <ul className="mt-2 space-y-2 text-gray-700">
                <li>• Higher loan limits</li>
                <li>• Priority support</li>
                <li>• Community leadership opportunities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
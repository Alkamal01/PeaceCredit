"use client"

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  PiggyBank,
  Building,
  Users,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useCurrency } from "@/contexts/CurrencyContext"
import { useTranslations } from "@/contexts/TranslationsContext"

interface CreditFactors {
  communityParticipation: number
  paymentHistory: number
  financialStability: number
  communityTrust: number
  economicActivity: number
  identityVerification: number
}

interface RecentChange {
  factor: string
  change: number
  description: string
}

interface GroupStats {
  totalMembers: number
  averageScore: number
  balancePool: number
}

interface FinancialProfileData {
  monthlyIncome: number
  incomeSource: string
  totalExpenses: number
  totalAssets: number
  businessType: string
  businessRegistration: boolean
}

interface DashboardData {
  creditScore: number
  creditFactors: CreditFactors
  recentChanges: RecentChange[]
  hasFinancialProfile: boolean
  groupStats: GroupStats | null
  financialProfileData: FinancialProfileData | null
  recommendations: string[]
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const { formatCurrency, isLoading: currencyLoading } = useCurrency()
  const { t, isLoading: translationsLoading } = useTranslations()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/dashboard')
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data')
        }
        
        const result = await response.json()
        
        if (result.success) {
          setDashboardData(result.data)
        } else {
          setError(result.error || 'Failed to load dashboard data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getCreditScoreLabel = (score: number) => {
    if (score >= 80) return t('dashboard.excellent')
    if (score >= 70) return t('dashboard.good')
    if (score >= 60) return t('dashboard.fair')
    return t('dashboard.poor')
  }

  const getCreditScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 70) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading || currencyLoading || translationsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>{t('common.loading')}</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('errors.generic')}: {error}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No dashboard data available.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const netMonthlyIncome = dashboardData.financialProfileData 
    ? dashboardData.financialProfileData.monthlyIncome - dashboardData.financialProfileData.totalExpenses
    : 0

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        {!dashboardData.hasFinancialProfile && (
          <Link href="/dashboard/credit/financial-profile">
            <Button className="bg-blue-600 hover:bg-blue-700">
              {t('dashboard.complete_profile')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {/* Recommendations Alert */}
      {dashboardData.recommendations.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-medium">{t('dashboard.recommendations')}</p>
              <ul className="list-disc list-inside space-y-1">
                {dashboardData.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm">{rec}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Monthly Income */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.monthly_income')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.financialProfileData?.monthlyIncome 
                ? formatCurrency(dashboardData.financialProfileData.monthlyIncome)
                : formatCurrency(0)
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {t('financial_profile.source')}: {dashboardData.financialProfileData?.incomeSource || 'Not specified'}
            </p>
          </CardContent>
        </Card>

        {/* Net Income */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.net_monthly_income')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(netMonthlyIncome)}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.after_expenses')}
            </p>
          </CardContent>
        </Card>

        {/* Total Assets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.total_assets')}</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.financialProfileData?.totalAssets 
                ? formatCurrency(dashboardData.financialProfileData.totalAssets)
                : formatCurrency(0)
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.combined_value')}
            </p>
          </CardContent>
        </Card>

        {/* Business Info */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.business')}</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.financialProfileData?.businessType || 'None'}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.financialProfileData?.businessRegistration 
                ? t('dashboard.registered')
                : t('dashboard.not_registered')
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Credit Score and Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credit Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              {t('dashboard.credit_score')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className={`text-6xl font-bold ${getCreditScoreColor(dashboardData.creditScore)}`}>
                {dashboardData.creditScore}
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {getCreditScoreLabel(dashboardData.creditScore)}
              </Badge>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    dashboardData.creditScore >= 80 ? 'bg-green-500' :
                    dashboardData.creditScore >= 70 ? 'bg-blue-500' :
                    dashboardData.creditScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${dashboardData.creditScore}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Factors */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.credit_factors')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(dashboardData.creditFactors).map(([factor, value]) => (
                <div key={factor} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{factor.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-medium">{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Changes and Cooperative Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Changes */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recent_changes')}</CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.recentChanges.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.recentChanges.map((change, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium capitalize">{change.factor}</p>
                      <p className="text-sm text-muted-foreground">{change.description}</p>
                    </div>
                    <Badge variant={change.change > 0 ? "default" : "destructive"}>
                      {change.change > 0 ? '+' : ''}{change.change}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent changes</p>
            )}
          </CardContent>
        </Card>

        {/* Cooperative Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t('dashboard.cooperative_stats')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.groupStats ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('dashboard.total_members')}</span>
                  <span className="font-medium">{dashboardData.groupStats.totalMembers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('dashboard.average_score')}</span>
                  <span className="font-medium">{dashboardData.groupStats.averageScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('dashboard.balance_pool')}</span>
                  <span className="font-medium">
                    {formatCurrency(dashboardData.groupStats.balancePool)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">{t('dashboard.not_in_cooperative')}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Financial Profile Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            {t('dashboard.financial_profile')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardData.financialProfileData ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{t('dashboard.profile_complete')}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span>{t('dashboard.profile_incomplete')}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 
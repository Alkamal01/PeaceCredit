"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  TrendingUp,
  History,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  DollarSign,
  Calendar,
  Clock,
  Building,
  GraduationCap,
  Target
} from "lucide-react"
import Link from "next/link"
import { useTranslations } from "@/contexts/TranslationsContext"
import { useCurrency } from "@/contexts/CurrencyContext"

interface CreditFactor {
  name: string
  score: number
  weight: string
  description: string
}

interface RecentChange {
  date: string
  type: string
  amount: number
  description: string
}

interface Cooperative {
  id: string
  name: string
  balancePool: number
  tasks: any[]
  proposals: any[]
}

interface Identity {
  did: string | null
  verificationStatus: string
  documents: Array<{
    type: string
    status: string
    date: string
  }>
  credentials: Array<{
    type: string
    status: string
    date: string
  }>
}

interface Loan {
  id: string
  amount: number
  interest: number
  term: string
  status: string
}

interface Grant {
  id: string
  amount: number
  organization: string
  deadline: string
}

interface Training {
  id: string
  title: string
  duration: string
  level: string
}

interface Opportunities {
  loans: Loan[]
  grants: Grant[]
  training: Training[]
}

interface CreditData {
  creditScore: number
  creditFactors: CreditFactor[]
  recentChanges: RecentChange[]
  cooperatives: Cooperative[]
  identity: Identity
  opportunities: Opportunities
}

export default function CreditPage() {
  const [creditData, setCreditData] = useState<CreditData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const { t, isLoading: translationsLoading } = useTranslations()
  const { formatCurrency, isLoading: currencyLoading } = useCurrency()

  useEffect(() => {
    const fetchCreditData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/credit')
        
        if (!response.ok) {
          throw new Error('Failed to fetch credit data')
        }
        
        const data = await response.json()
        setCreditData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCreditData()
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

  const getWeightTranslation = (weight: string) => {
    switch (weight.toLowerCase()) {
      case 'high': return t('credit.weight_high')
      case 'medium': return t('credit.weight_medium')
      case 'low': return t('credit.weight_low')
      default: return weight
    }
  }

  const getStatusTranslation = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return t('credit.status_completed')
      case 'pending': return t('credit.status_pending')
      case 'verified': return t('credit.status_verified')
      case 'rejected': return t('credit.status_rejected')
      default: return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading || translationsLoading || currencyLoading) {
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
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('errors.generic')}: {error}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!creditData) {
    return (
      <div className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No credit data available.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">{t('credit.title')}</h1>
        <p className="text-gray-600 mt-2">{t('credit.subtitle')}</p>
      </motion.div>

      {/* Credit Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-blue-600" />
            <span>{t('credit.score_overview')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">{t('credit.current_score')}</h3>
                <span className="text-sm text-gray-500">{t('credit.last_updated')}: {t('credit.today')}</span>
              </div>
              <div className="text-center space-y-4">
                <div className={`text-6xl font-bold ${getCreditScoreColor(creditData.creditScore)}`}>
                  {creditData.creditScore}
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {getCreditScoreLabel(creditData.creditScore)}
                </Badge>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      creditData.creditScore >= 80 ? 'bg-green-500' :
                      creditData.creditScore >= 70 ? 'bg-blue-500' :
                      creditData.creditScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${creditData.creditScore}%` }}
                  />
                </div>
              </div>
              <Button className="w-full">
                {t('credit.request_assessment')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">{t('credit.credit_factors')}</h3>
              {creditData.creditFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{factor.name}</span>
                    <span className="text-gray-500">{getWeightTranslation(factor.weight)}</span>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                  <p className="text-xs text-gray-600">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-6 w-6 text-purple-600" />
            <span>{t('credit.credit_history')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {creditData.recentChanges.length > 0 ? (
              creditData.recentChanges.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.description}</h4>
                      <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.amount > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {item.amount > 0 ? '+' : ''}{item.amount}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">{t('credit.no_history')}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Credit Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-emerald-600" />
            <span>{t('credit.opportunities')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Loans */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>{t('credit.loans')}</span>
              </h3>
              {creditData.opportunities.loans.map((loan) => (
                <div key={loan.id} className="p-4 bg-blue-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t('credit.amount')}</span>
                      <span className="font-semibold">{formatCurrency(loan.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t('credit.interest')}</span>
                      <span>{loan.interest}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t('credit.term')}</span>
                      <span>{loan.term}</span>
                    </div>
                    <Button size="sm" className="w-full mt-2">
                      {t('credit.apply_now')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Grants */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>{t('credit.grants')}</span>
              </h3>
              {creditData.opportunities.grants.map((grant) => (
                <div key={grant.id} className="p-4 bg-green-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t('credit.amount')}</span>
                      <span className="font-semibold">{formatCurrency(grant.amount)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>{t('credit.organization')}: </span>
                      <span>{grant.organization}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t('credit.deadline')}</span>
                      <span>{formatDate(grant.deadline)}</span>
                    </div>
                    <Button size="sm" className="w-full mt-2">
                      {t('credit.apply_now')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Training */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>{t('credit.training')}</span>
              </h3>
              {creditData.opportunities.training.map((training) => (
                <div key={training.id} className="p-4 bg-purple-50 rounded-lg">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{training.title}</h4>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t('credit.duration')}</span>
                      <span>{training.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t('credit.level')}</span>
                      <span>{training.level}</span>
                    </div>
                    <Button size="sm" className="w-full mt-2">
                      {t('credit.learn_more')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Improvement Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <span>{t('credit.improvement_tips')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-emerald-50 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1" />
              <div>
                <h4 className="font-semibold text-emerald-900">{t('credit.maintain_payment_history')}</h4>
                <p className="text-emerald-800 mt-1">
                  {t('credit.maintain_payment_description')}
                </p>
              </div>
            </div>
            
            {creditData.identity.credentials.length < 3 && (
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">{t('credit.improve_credentials')}</h4>
                  <p className="text-blue-800 mt-1">
                    {t('credit.improve_credentials_description')}
                  </p>
                </div>
              </div>
            )}
            
            {creditData.cooperatives.length === 0 && (
              <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-yellow-900">{t('credit.join_cooperative')}</h4>
                  <p className="text-yellow-800 mt-1">
                    {t('credit.join_cooperative_description')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
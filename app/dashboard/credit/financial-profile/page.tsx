"use client"

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  DollarSign,
  Building2,
  FileText,
  TrendingUp,
  Users,
  Upload,
  CheckCircle2,
  AlertCircle,
  Save,
  ArrowRight,
  Shield,
  CheckCircle,
  Edit,
  RefreshCw,
  Home
} from "lucide-react"
import { useCurrency } from "@/contexts/CurrencyContext"
import { useTranslations } from "@/contexts/TranslationsContext"

interface FinancialData {
  // Basic Financial Info
  monthlyIncome: string
  incomeSource: string
  bankAccount: string
  existingDebts: string
  monthlyExpenses: {
    housing: string
    food: string
    transportation: string
    utilities: string
    healthcare: string
    education: string
    other: string
  }
  
  // Business/Professional Info
  businessType: string
  businessRegistration: boolean
  businessDocuments: File[]
  farmOwnership: boolean
  farmDocuments: File[]
  tradeLicenses: File[]
  salesRecords: File[]
  
  // Assets
  assets: {
    property: string
    vehicles: string
    livestock: string
    equipment: string
    savings: string
    other: string
  }
  
  // Advanced Analytics
  spendingPatterns: string
  seasonalIncome: boolean
  incomeVariation: string
  communityRole: string
  socialConnections: string
}

export default function FinancialProfilePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isEditing, setIsEditing] = useState(false)
  const [hasExistingProfile, setHasExistingProfile] = useState(false)
  const [formData, setFormData] = useState<FinancialData>({
    monthlyIncome: '',
    incomeSource: '',
    bankAccount: '',
    existingDebts: '',
    monthlyExpenses: {
      housing: '',
      food: '',
      transportation: '',
      utilities: '',
      healthcare: '',
      education: '',
      other: ''
    },
    businessType: '',
    businessRegistration: false,
    businessDocuments: [],
    farmOwnership: false,
    farmDocuments: [],
    tradeLicenses: [],
    salesRecords: [],
    assets: {
      property: '',
      vehicles: '',
      livestock: '',
      equipment: '',
      savings: '',
      other: ''
    },
    spendingPatterns: '',
    seasonalIncome: false,
    incomeVariation: '',
    communityRole: '',
    socialConnections: ''
  })
  
  const [creditScore, setCreditScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchingProfile, setFetchingProfile] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Use currency context and translations
  const { formatCurrency, getCurrencySymbol, isLoading: currencyLoading } = useCurrency()
  const { t, isLoading: translationsLoading } = useTranslations()

  // Calculate completion percentage
  const calculateCompletion = () => {
    let totalFields = 0
    let filledFields = 0

    // Count basic fields
    const basicFields = ['monthlyIncome', 'incomeSource', 'bankAccount', 'existingDebts', 'businessType', 'spendingPatterns', 'incomeVariation', 'communityRole', 'socialConnections']
    totalFields += basicFields.length
    filledFields += basicFields.filter(field => formData[field as keyof FinancialData] !== '' && formData[field as keyof FinancialData] !== null).length

    // Count boolean fields (always count as filled)
    totalFields += 2 // businessRegistration, farmOwnership, seasonalIncome
    filledFields += 2

    // Count nested objects
    totalFields += Object.keys(formData.monthlyExpenses).length
    filledFields += Object.values(formData.monthlyExpenses).filter(value => value !== '').length

    totalFields += Object.keys(formData.assets).length
    filledFields += Object.values(formData.assets).filter(value => value !== '').length

    return Math.round((filledFields / totalFields) * 100)
  }

  // Fetch existing profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingProfile(true)

        // Fetch existing financial profile
        const profileResponse = await fetch('/api/financial-profile')
        if (profileResponse.ok) {
          const profileData = await profileResponse.json()
          if (profileData.success && profileData.data) {
            setHasExistingProfile(true)
            setFormData({
              monthlyIncome: profileData.data.monthlyIncome?.toString() || '',
              incomeSource: profileData.data.incomeSource || '',
              bankAccount: profileData.data.bankAccount || '',
              existingDebts: profileData.data.existingDebts || '',
              monthlyExpenses: {
                housing: profileData.data.housingExpense?.toString() || '',
                food: profileData.data.foodExpense?.toString() || '',
                transportation: profileData.data.transportationExpense?.toString() || '',
                utilities: profileData.data.utilitiesExpense?.toString() || '',
                healthcare: profileData.data.healthcareExpense?.toString() || '',
                education: profileData.data.educationExpense?.toString() || '',
                other: profileData.data.otherExpenses?.toString() || ''
              },
              businessType: profileData.data.businessType || '',
              businessRegistration: profileData.data.businessRegistration || false,
              farmOwnership: profileData.data.farmOwnership || false,
              businessDocuments: [],
              farmDocuments: [],
              tradeLicenses: [],
              salesRecords: [],
              assets: {
                property: profileData.data.propertyValue?.toString() || '',
                vehicles: profileData.data.vehiclesValue?.toString() || '',
                livestock: profileData.data.livestockValue?.toString() || '',
                equipment: profileData.data.equipmentValue?.toString() || '',
                savings: profileData.data.savingsValue?.toString() || '',
                other: profileData.data.otherAssetsValue?.toString() || ''
              },
              spendingPatterns: profileData.data.spendingPatterns || '',
              seasonalIncome: profileData.data.seasonalIncome || false,
              incomeVariation: profileData.data.incomeVariation || '',
              communityRole: profileData.data.communityRole || '',
              socialConnections: profileData.data.socialConnections || ''
            })
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load profile data')
      } finally {
        setFetchingProfile(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (field: keyof FinancialData, value: string | boolean | object) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Prepare data for API
      const apiData = {
        monthlyIncome: formData.monthlyIncome,
        incomeSource: formData.incomeSource,
        bankAccount: formData.bankAccount,
        existingDebts: formData.existingDebts,
        housingExpense: formData.monthlyExpenses.housing,
        foodExpense: formData.monthlyExpenses.food,
        transportationExpense: formData.monthlyExpenses.transportation,
        utilitiesExpense: formData.monthlyExpenses.utilities,
        healthcareExpense: formData.monthlyExpenses.healthcare,
        educationExpense: formData.monthlyExpenses.education,
        otherExpenses: formData.monthlyExpenses.other,
        businessType: formData.businessType,
        businessRegistration: formData.businessRegistration,
        farmOwnership: formData.farmOwnership,
        propertyValue: formData.assets.property,
        vehiclesValue: formData.assets.vehicles,
        livestockValue: formData.assets.livestock,
        equipmentValue: formData.assets.equipment,
        savingsValue: formData.assets.savings,
        otherAssetsValue: formData.assets.other,
        spendingPatterns: formData.spendingPatterns,
        seasonalIncome: formData.seasonalIncome,
        incomeVariation: formData.incomeVariation,
        communityRole: formData.communityRole,
        socialConnections: formData.socialConnections
      }

      const response = await fetch('/api/financial-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(data.message)
        setHasExistingProfile(true)
        setIsEditing(false)
        
        // Simulate credit score calculation
        const completion = calculateCompletion()
        const baseScore = 300 + (completion * 3.5) // Score between 300-650 based on completion
        setCreditScore(Math.round(baseScore))
      } else {
        setError(data.error || t('errors.generic'))
      }
    } catch (error) {
      setError(t('errors.generic'))
    } finally {
      setLoading(false)
    }
  }

  const completion = calculateCompletion()

  if (fetchingProfile || currencyLoading || translationsLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>{t('common.loading')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('financial_profile.title')}</h1>
          <p className="text-muted-foreground">
            {hasExistingProfile 
              ? t('financial_profile.subtitle_existing')
              : t('financial_profile.subtitle_new')
            }
          </p>
        </div>
        {hasExistingProfile && !isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            {t('common.edit')} {t('common.profile')}
          </Button>
        )}
      </div>

      {/* Completion Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {completion === 100 ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                )}
                {t('financial_profile.completion')}
              </CardTitle>
              <CardDescription>
                {t('financial_profile.completion_description', { percentage: completion })}
              </CardDescription>
            </div>
            <Badge variant={completion === 100 ? "default" : "secondary"}>
              {completion}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={completion} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            {completion < 100 
              ? t('financial_profile.completion_incomplete', { remaining: 100 - completion })
              : t('financial_profile.completion_complete')
            }
          </p>
        </CardContent>
      </Card>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Profile Form */}
      {(!hasExistingProfile || isEditing) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Step 1: Basic Income Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                {t('financial_profile.income_information')}
              </CardTitle>
              <CardDescription>{t('financial_profile.income_description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyIncome">{t('financial_profile.monthly_income')} ({getCurrencySymbol()})</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    placeholder="5000"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="incomeSource">{t('financial_profile.income_source')}</Label>
                  <Select value={formData.incomeSource} onValueChange={(value) => handleInputChange('incomeSource', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('financial_profile.income_source')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">{t('income_sources.salary')}</SelectItem>
                      <SelectItem value="business">{t('income_sources.business')}</SelectItem>
                      <SelectItem value="farming">{t('income_sources.farming')}</SelectItem>
                      <SelectItem value="trading">{t('income_sources.trading')}</SelectItem>
                      <SelectItem value="freelance">{t('income_sources.freelance')}</SelectItem>
                      <SelectItem value="other">{t('income_sources.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankAccount">{t('financial_profile.bank_account')}</Label>
                  <Select value={formData.bankAccount} onValueChange={(value) => handleInputChange('bankAccount', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('financial_profile.bank_account')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{t('bank_account_status.active')}</SelectItem>
                      <SelectItem value="inactive">{t('bank_account_status.inactive')}</SelectItem>
                      <SelectItem value="pending">{t('bank_account_status.pending')}</SelectItem>
                      <SelectItem value="closed">{t('bank_account_status.closed')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="existingDebts">{t('financial_profile.existing_debts')}</Label>
                  <Select value={formData.existingDebts} onValueChange={(value) => handleInputChange('existingDebts', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('financial_profile.existing_debts')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{t('debt_status.none')}</SelectItem>
                      <SelectItem value="low">{t('debt_status.low')}</SelectItem>
                      <SelectItem value="moderate">{t('debt_status.moderate')}</SelectItem>
                      <SelectItem value="high">{t('debt_status.high')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Monthly Expenses */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                {t('financial_profile.monthly_expenses')}
              </CardTitle>
              <CardDescription>{t('financial_profile.expenses_description')} ({getCurrencySymbol()})</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="housingExpense">{t('financial_profile.housing')}</Label>
                  <Input
                    id="housingExpense"
                    type="number"
                    placeholder="1000"
                    value={formData.monthlyExpenses.housing}
                    onChange={(e) => handleInputChange('monthlyExpenses', { ...formData.monthlyExpenses, housing: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="foodExpense">{t('financial_profile.food')}</Label>
                  <Input
                    id="foodExpense"
                    type="number"
                    placeholder="500"
                    value={formData.monthlyExpenses.food}
                    onChange={(e) => handleInputChange('monthlyExpenses', { ...formData.monthlyExpenses, food: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="transportationExpense">{t('financial_profile.transportation')}</Label>
                  <Input
                    id="transportationExpense"
                    type="number"
                    placeholder="200"
                    value={formData.monthlyExpenses.transportation}
                    onChange={(e) => handleInputChange('monthlyExpenses', { ...formData.monthlyExpenses, transportation: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="utilitiesExpense">{t('financial_profile.utilities')}</Label>
                  <Input
                    id="utilitiesExpense"
                    type="number"
                    placeholder="150"
                    value={formData.monthlyExpenses.utilities}
                    onChange={(e) => handleInputChange('monthlyExpenses', { ...formData.monthlyExpenses, utilities: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="healthcareExpense">{t('financial_profile.healthcare')}</Label>
                  <Input
                    id="healthcareExpense"
                    type="number"
                    placeholder="100"
                    value={formData.monthlyExpenses.healthcare}
                    onChange={(e) => handleInputChange('monthlyExpenses', { ...formData.monthlyExpenses, healthcare: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="educationExpense">{t('financial_profile.education')}</Label>
                  <Input
                    id="educationExpense"
                    type="number"
                    placeholder="200"
                    value={formData.monthlyExpenses.education}
                    onChange={(e) => handleInputChange('monthlyExpenses', { ...formData.monthlyExpenses, education: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="otherExpenses">{t('financial_profile.other')}</Label>
                <Input
                  id="otherExpenses"
                  type="number"
                  placeholder="300"
                  value={formData.monthlyExpenses.other}
                  onChange={(e) => handleInputChange('monthlyExpenses', { ...formData.monthlyExpenses, other: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Business Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {t('financial_profile.business_assets')}
              </CardTitle>
              <CardDescription>{t('financial_profile.business_description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessType">{t('financial_profile.business_type')}</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('financial_profile.business_type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">{t('business_types.retail')}</SelectItem>
                      <SelectItem value="agriculture">{t('business_types.agriculture')}</SelectItem>
                      <SelectItem value="services">{t('business_types.services')}</SelectItem>
                      <SelectItem value="manufacturing">{t('business_types.manufacturing')}</SelectItem>
                      <SelectItem value="technology">{t('business_types.technology')}</SelectItem>
                      <SelectItem value="other">{t('business_types.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="businessRegistration"
                    checked={formData.businessRegistration}
                    onCheckedChange={(checked) => handleInputChange('businessRegistration', checked as boolean)}
                  />
                  <Label htmlFor="businessRegistration">{t('financial_profile.business_registered')}</Label>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="farmOwnership"
                  checked={formData.farmOwnership}
                  onCheckedChange={(checked) => handleInputChange('farmOwnership', checked as boolean)}
                />
                <Label htmlFor="farmOwnership">{t('financial_profile.farm_ownership')}</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="propertyValue">{t('financial_profile.property_value')} ({getCurrencySymbol()})</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    placeholder="50000"
                    value={formData.assets.property}
                    onChange={(e) => handleInputChange('assets', { ...formData.assets, property: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="vehiclesValue">{t('financial_profile.vehicles_value')} ({getCurrencySymbol()})</Label>
                  <Input
                    id="vehiclesValue"
                    type="number"
                    placeholder="10000"
                    value={formData.assets.vehicles}
                    onChange={(e) => handleInputChange('assets', { ...formData.assets, vehicles: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="savingsValue">{t('financial_profile.savings')} ({getCurrencySymbol()})</Label>
                  <Input
                    id="savingsValue"
                    type="number"
                    placeholder="5000"
                    value={formData.assets.savings}
                    onChange={(e) => handleInputChange('assets', { ...formData.assets, savings: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="livestockValue">{t('financial_profile.livestock_value')} ({getCurrencySymbol()})</Label>
                  <Input
                    id="livestockValue"
                    type="number"
                    placeholder="5000"
                    value={formData.assets.livestock}
                    onChange={(e) => handleInputChange('assets', { ...formData.assets, livestock: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="equipmentValue">{t('financial_profile.equipment_value')} ({getCurrencySymbol()})</Label>
                  <Input
                    id="equipmentValue"
                    type="number"
                    placeholder="3000"
                    value={formData.assets.equipment}
                    onChange={(e) => handleInputChange('assets', { ...formData.assets, equipment: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="otherAssetsValue">{t('financial_profile.other_assets')} ({getCurrencySymbol()})</Label>
                  <Input
                    id="otherAssetsValue"
                    type="number"
                    placeholder="2000"
                    value={formData.assets.other}
                    onChange={(e) => handleInputChange('assets', { ...formData.assets, other: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Advanced Analytics */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {t('financial_profile.financial_patterns')}
              </CardTitle>
              <CardDescription>{t('financial_profile.patterns_description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="spendingPatterns">{t('financial_profile.spending_patterns')}</Label>
                <Textarea
                  id="spendingPatterns"
                  placeholder={t('financial_profile.spending_patterns_placeholder')}
                  value={formData.spendingPatterns}
                  onChange={(e) => handleInputChange('spendingPatterns', e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="seasonalIncome"
                  checked={formData.seasonalIncome}
                  onCheckedChange={(checked) => handleInputChange('seasonalIncome', checked as boolean)}
                />
                <Label htmlFor="seasonalIncome">{t('financial_profile.seasonal_income')}</Label>
              </div>
              <div>
                <Label htmlFor="incomeVariation">{t('financial_profile.income_variation')}</Label>
                <Textarea
                  id="incomeVariation"
                  placeholder={t('financial_profile.income_variation_placeholder')}
                  value={formData.incomeVariation}
                  onChange={(e) => handleInputChange('incomeVariation', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 5: Community & Social */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t('financial_profile.community_involvement')}
              </CardTitle>
              <CardDescription>{t('financial_profile.community_description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="communityRole">{t('financial_profile.community_role')}</Label>
                <Select value={formData.communityRole} onValueChange={(value) => handleInputChange('communityRole', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('financial_profile.community_role')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">{t('community_roles.member')}</SelectItem>
                    <SelectItem value="leader">{t('community_roles.leader')}</SelectItem>
                    <SelectItem value="treasurer">{t('community_roles.treasurer')}</SelectItem>
                    <SelectItem value="secretary">{t('community_roles.secretary')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="socialConnections">{t('financial_profile.social_connections')}</Label>
                <Textarea
                  id="socialConnections"
                  placeholder={t('financial_profile.social_connections_placeholder')}
                  value={formData.socialConnections}
                  onChange={(e) => handleInputChange('socialConnections', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              size="lg"
              className="w-full md:w-auto"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  {hasExistingProfile ? t('financial_profile.updating') : t('financial_profile.saving')}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {hasExistingProfile ? t('financial_profile.update_profile') : t('financial_profile.save_profile')}
                </>
              )}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Profile Summary (when not editing) */}
      {hasExistingProfile && !isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Income Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                {t('financial_profile.income')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t('financial_profile.monthly_income')}:</span>
                  <span className="font-medium">{formatCurrency(formData.monthlyIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t('financial_profile.source')}:</span>
                  <span className="font-medium capitalize">{formData.incomeSource}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t('financial_profile.bank_account')}:</span>
                  <span className="font-medium capitalize">{formData.bankAccount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expenses Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                {t('financial_profile.expenses')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {formData.monthlyExpenses.housing && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('financial_profile.housing')}:</span>
                    <span className="font-medium">{formatCurrency(formData.monthlyExpenses.housing)}</span>
                  </div>
                )}
                {formData.monthlyExpenses.food && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('financial_profile.food')}:</span>
                    <span className="font-medium">{formatCurrency(formData.monthlyExpenses.food)}</span>
                  </div>
                )}
                {formData.monthlyExpenses.transportation && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('financial_profile.transportation')}:</span>
                    <span className="font-medium">{formatCurrency(formData.monthlyExpenses.transportation)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Assets Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {t('financial_profile.assets')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {formData.assets.property && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('financial_profile.property_value')}:</span>
                    <span className="font-medium">{formatCurrency(formData.assets.property)}</span>
                  </div>
                )}
                {formData.assets.savings && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('financial_profile.savings')}:</span>
                    <span className="font-medium">{formatCurrency(formData.assets.savings)}</span>
                  </div>
                )}
                {formData.businessType && formData.businessType !== 'none' && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('dashboard.business')}:</span>
                    <span className="font-medium capitalize">{formData.businessType}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Credit Score Results */}
      {creditScore && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                {t('financial_profile.your_credit_score')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{creditScore}</div>
                <div className="text-sm text-green-600 mb-4">
                  {creditScore >= 700 ? t('dashboard.excellent') : creditScore >= 600 ? t('dashboard.good') : t('dashboard.fair')} {t('dashboard.credit_score')}
                </div>
                <Progress value={(creditScore / 850) * 100} className="w-full mb-4" />
                <p className="text-sm text-muted-foreground">
                  {t('financial_profile.score_based_on', { completion })}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
} 
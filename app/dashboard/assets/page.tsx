"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  Building2,
  Package,
  Wrench,
  Users,
  Share2,
  Plus,
  ArrowRight,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  FileText,
  Upload,
} from "lucide-react"
import { useTranslations } from "@/contexts/TranslationsContext"
import { useCurrency } from "@/contexts/CurrencyContext"

interface Asset {
  id: string
  name: string
  type: string
  value: number
  verificationStatus: 'verified' | 'pending' | 'unverified'
  lastUpdated: string
  description: string
  documents?: string[]
}

export default function AssetsPage() {
  const { t, isLoading: translationsLoading } = useTranslations()
  const { formatCurrency } = useCurrency()
  const [searchQuery, setSearchQuery] = useState("")
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setIsLoading(true)
        // Simulate API call - replace with real API endpoint
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const userAssets: Asset[] = [
          {
            id: "A001",
            name: t('assets.residential_property'),
            type: t('assets.property'),
            value: 150000,
            verificationStatus: 'verified',
            lastUpdated: "2024-03-20",
            description: t('assets.residential_desc'),
            documents: ['property_deed.pdf', 'valuation_report.pdf']
          },
          {
            id: "A002",
            name: t('assets.business_equipment'),
            type: t('assets.equipment'),
            value: 25000,
            verificationStatus: 'pending',
            lastUpdated: "2024-03-18",
            description: t('assets.business_equipment_desc'),
            documents: ['equipment_receipts.pdf']
          },
          {
            id: "A003",
            name: t('assets.livestock_assets'),
            type: t('assets.livestock'),
            value: 8000,
            verificationStatus: 'verified',
            lastUpdated: "2024-03-15",
            description: t('assets.livestock_desc'),
            documents: ['livestock_certificate.pdf']
          },
          {
            id: "A004",
            name: t('assets.vehicle_assets'),
            type: t('assets.vehicle'),
            value: 12000,
            verificationStatus: 'unverified',
            lastUpdated: "2024-03-10",
            description: t('assets.vehicle_desc'),
          },
          {
            id: "A005",
            name: t('assets.savings_account'),
            type: t('assets.savings'),
            value: 5000,
            verificationStatus: 'verified',
            lastUpdated: "2024-03-22",
            description: t('assets.savings_desc'),
            documents: ['bank_statement.pdf']
          },
          {
            id: "A006",
            name: t('assets.business_inventory'),
            type: t('assets.business'),
            value: 18000,
            verificationStatus: 'pending',
            lastUpdated: "2024-03-19",
            description: t('assets.business_inventory_desc'),
          }
        ]
        
        setAssets(userAssets)
      } catch (err) {
        setError(t('errors.generic'))
      } finally {
        setIsLoading(false)
      }
    }

    if (!translationsLoading) {
      fetchAssets()
    }
  }, [t, translationsLoading])

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
  const verifiedValue = assets
    .filter(asset => asset.verificationStatus === 'verified')
    .reduce((sum, asset) => sum + asset.value, 0)
  const pendingValue = assets
    .filter(asset => asset.verificationStatus === 'pending')
    .reduce((sum, asset) => sum + asset.value, 0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">{t('assets.status_verified')}</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">{t('assets.status_pending')}</Badge>
      default:
        return <Badge className="bg-red-100 text-red-800">{t('assets.status_unverified')}</Badge>
    }
  }

  if (translationsLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>{t('common.loading')}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">{t('assets.title')}</h1>
        <p className="text-gray-600 mt-2">{t('assets.subtitle')}</p>
      </motion.div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Asset Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">{t('assets.total_value')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(totalValue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">{t('assets.verified_value')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(verifiedValue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-gray-600">{t('assets.pending_verification')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(pendingValue)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Add */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={t('assets.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              {t('assets.add_asset')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* My Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span>{t('assets.asset_portfolio')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssets.map((asset) => (
              <div key={asset.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{asset.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline">{asset.type}</Badge>
                      {getStatusBadge(asset.verificationStatus)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(asset.value)}</p>
                    <p className="text-sm text-gray-500">{t('assets.last_updated')}: {asset.lastUpdated}</p>
                  </div>
                </div>
                
                {asset.documents && asset.documents.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">{t('assets.verification_documents')}:</p>
                    <div className="flex flex-wrap gap-2">
                      {asset.documents.map((doc, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(asset.verificationStatus)}
                    <span className="text-sm text-gray-600">
                      {asset.verificationStatus === 'verified' 
                        ? t('assets.status_verified')
                        : asset.verificationStatus === 'pending'
                        ? t('assets.status_pending')
                        : t('assets.status_unverified')
                      }
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {asset.verificationStatus === 'unverified' && (
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        {t('assets.verify_asset')}
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      {t('assets.view_details')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wrench className="h-6 w-6 text-emerald-600" />
            <span>{t('assets.quick_actions')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Upload className="h-6 w-6" />
              <span>{t('assets.upload_documents')}</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>{t('assets.verification_documents')}</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <DollarSign className="h-6 w-6" />
              <span>{t('assets.asset_value')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
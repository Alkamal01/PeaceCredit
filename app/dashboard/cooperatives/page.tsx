"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  Search,
  MapPin,
  Users2,
  Building2,
  Target,
  ArrowRight,
  Plus,
  MessageSquare,
  Calendar,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { useTranslations } from "@/contexts/TranslationsContext"

interface Cooperative {
  id: string
  name: string
  balancePool: number
  users: { id: string; name: string }[]
  createdAt: string
  updatedAt: string
}

export default function CooperativesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cooperatives, setCooperatives] = useState<Cooperative[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const { t, isLoading: translationsLoading } = useTranslations()

  useEffect(() => {
    const fetchCooperatives = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/cooperatives')
        
        if (!response.ok) {
          throw new Error('Failed to fetch cooperatives')
        }
        
        const data = await response.json()
        setCooperatives(data.cooperatives || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCooperatives()
  }, [])

  const getCooperativeType = (name: string) => {
    if (name.toLowerCase().includes('artisan') || name.toLowerCase().includes('craft')) {
      return t('cooperatives.type_craft')
    }
    if (name.toLowerCase().includes('farm') || name.toLowerCase().includes('agriculture')) {
      return t('cooperatives.type_agriculture')
    }
    if (name.toLowerCase().includes('tech')) {
      return t('cooperatives.type_technology')
    }
    if (name.toLowerCase().includes('energy')) {
      return t('cooperatives.type_energy')
    }
    return t('cooperatives.type_craft') // Default
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading || translationsLoading) {
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

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">{t('cooperatives.title')}</h1>
        <p className="text-gray-600 mt-2">{t('cooperatives.subtitle')}</p>
      </motion.div>

      {/* Search and Create */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={t('cooperatives.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              {t('cooperatives.create_coop')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Cooperatives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users2 className="h-6 w-6 text-blue-600" />
            <span>{t('cooperatives.your_active')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cooperatives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cooperatives.map((coop) => (
                <div key={coop.id} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{coop.name}</h3>
                      <p className="text-sm text-gray-600">{getCooperativeType(coop.name)}</p>
                      <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>Community</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {t('cooperatives.status_active')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{coop.users.length} {t('cooperatives.members')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{t('cooperatives.next_meeting')}: {formatDate(coop.updatedAt)}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {t('cooperatives.chat')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">{t('dashboard.not_in_cooperative')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Suggested Cooperatives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-purple-600" />
            <span>{t('cooperatives.suggested')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mock suggested cooperatives for now */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Tech Innovation Hub</h3>
                  <p className="text-sm text-gray-600">{t('cooperatives.type_technology')}</p>
                  <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>Tech District</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    {t('cooperatives.status_open')}
                  </span>
                  <span className="text-sm text-gray-600">
                    {t('cooperatives.match')}: 85%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>8 {t('cooperatives.members')}</span>
                </div>
                <Button variant="outline" size="sm">
                  {t('cooperatives.learn_more')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Sustainable Energy Group</h3>
                  <p className="text-sm text-gray-600">{t('cooperatives.type_energy')}</p>
                  <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>Green Zone</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    {t('cooperatives.status_open')}
                  </span>
                  <span className="text-sm text-gray-600">
                    {t('cooperatives.match')}: 75%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>15 {t('cooperatives.members')}</span>
                </div>
                <Button variant="outline" size="sm">
                  {t('cooperatives.learn_more')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Co-op Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-emerald-600" />
            <span>{t('cooperatives.resources')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span>{t('cooperatives.meeting_calendar')}</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <MessageSquare className="h-6 w-6" />
              <span>{t('cooperatives.discussion_board')}</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Target className="h-6 w-6" />
              <span>{t('cooperatives.goals_progress')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  BookOpen,
  Video,
  FileText,
  Users,
  Lightbulb,
  ArrowRight,
  Download,
  Share2,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { useTranslations } from "@/contexts/TranslationsContext"

interface Resource {
  id: string
  title: string
  description: string
  type: string
  format: string
  duration?: string
  pages?: string
  level: string
  icon: any
  downloadUrl?: string
}

export default function ResourcesPage() {
  const { t, isLoading: translationsLoading } = useTranslations()
  const [searchQuery, setSearchQuery] = useState("")
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true)
        // Simulate API call - replace with real API endpoint
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const learningResources: Resource[] = [
          {
            id: "R001",
            title: t('resources.financial_literacy'),
            description: t('resources.financial_literacy_desc'),
            type: t('resources.type_course'),
            format: t('resources.format_video'),
            duration: `4 ${t('resources.duration_hours')}`,
            level: t('resources.level_beginner'),
            icon: Video,
            downloadUrl: "/resources/financial-literacy.pdf"
          },
          {
            id: "R002",
            title: t('resources.microfinance_guide'),
            description: t('resources.microfinance_guide_desc'),
            type: t('resources.type_guide'),
            format: t('resources.format_pdf'),
            pages: `32 ${t('resources.pages')}`,
            level: t('resources.level_intermediate'),
            icon: FileText,
            downloadUrl: "/resources/microfinance-guide.pdf"
          },
          {
            id: "R003",
            title: t('resources.business_planning'),
            description: t('resources.business_planning_desc'),
            type: t('resources.type_workshop'),
            format: t('resources.format_interactive'),
            duration: `2 ${t('resources.duration_days')}`,
            level: t('resources.level_advanced'),
            icon: Users,
          },
          {
            id: "R004",
            title: t('resources.credit_building'),
            description: t('resources.credit_building_desc'),
            type: t('resources.type_course'),
            format: t('resources.format_video'),
            duration: `3 ${t('resources.duration_hours')}`,
            level: t('resources.level_intermediate'),
            icon: BookOpen,
          },
          {
            id: "R005",
            title: t('resources.cooperative_management'),
            description: t('resources.cooperative_management_desc'),
            type: t('resources.type_guide'),
            format: t('resources.format_pdf'),
            pages: `28 ${t('resources.pages')}`,
            level: t('resources.level_advanced'),
            icon: Users,
          },
          {
            id: "R006",
            title: t('resources.digital_payments'),
            description: t('resources.digital_payments_desc'),
            type: t('resources.type_course'),
            format: t('resources.format_interactive'),
            duration: `2 ${t('resources.duration_hours')}`,
            level: t('resources.level_beginner'),
            icon: Video,
          }
        ]
        
        setResources(learningResources)
      } catch (err) {
        setError(t('errors.generic'))
      } finally {
        setIsLoading(false)
      }
    }

    if (!translationsLoading) {
      fetchResources()
    }
  }, [t, translationsLoading])

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        <h1 className="text-3xl font-bold text-gray-900">{t('resources.title')}</h1>
        <p className="text-gray-600 mt-2">{t('resources.subtitle')}</p>
      </motion.div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder={t('resources.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span>{t('resources.learning_resources')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <resource.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                      <span>{resource.format}</span>
                      <span>•</span>
                      <span>{resource.level}</span>
                      {resource.duration && (
                        <>
                          <span>•</span>
                          <span>{resource.duration}</span>
                        </>
                      )}
                      {resource.pages && (
                        <>
                          <span>•</span>
                          <span>{resource.pages}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  {resource.downloadUrl ? (
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      {t('resources.download')}
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      {t('resources.explore')}
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    {t('resources.share')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-6 w-6 text-emerald-600" />
            <span>{t('resources.quick_access')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <BookOpen className="h-6 w-6" />
              <span>{t('resources.my_learning')}</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Download className="h-6 w-6" />
              <span>{t('resources.downloads')}</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Share2 className="h-6 w-6" />
              <span>{t('resources.shared_resources')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
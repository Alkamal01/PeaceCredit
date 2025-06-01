"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const learningResources = [
    {
      id: "R001",
      title: "Peace-Building Fundamentals",
      type: "Course",
      format: "Video Series",
      duration: "4 hours",
      level: "Beginner",
      icon: Video,
    },
    {
      id: "R002",
      title: "Community Mediation Guide",
      type: "Guide",
      format: "PDF",
      pages: "45",
      level: "Intermediate",
      icon: FileText,
    },
    {
      id: "R003",
      title: "Conflict Resolution Workshop",
      type: "Workshop",
      format: "Interactive",
      duration: "2 days",
      level: "Advanced",
      icon: Users,
    },
  ]

  const communityResources = [
    {
      id: "C001",
      title: "Local Peace Initiatives",
      description: "Directory of active peace-building projects in your area",
      type: "Directory",
      icon: Lightbulb,
    },
    {
      id: "C002",
      title: "Resource Sharing Network",
      description: "Connect with community members for resource exchange",
      type: "Network",
      icon: Share2,
    },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
        <p className="text-gray-600 mt-2">Access learning materials and community resources</p>
      </motion.div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search resources..."
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
            <span>Learning Resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningResources.map((resource) => (
              <div key={resource.id} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <resource.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{resource.type}</p>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                      <span>{resource.format}</span>
                      <span>•</span>
                      <span>{resource.level}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-purple-600" />
            <span>Community Resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communityResources.map((resource) => (
              <div key={resource.id} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <resource.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {resource.type}
                    </span>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
            <span>Quick Access</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <BookOpen className="h-6 w-6" />
              <span>My Learning</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Download className="h-6 w-6" />
              <span>Downloads</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Share2 className="h-6 w-6" />
              <span>Shared Resources</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
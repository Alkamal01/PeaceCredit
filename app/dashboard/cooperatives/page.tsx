"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"

export default function CooperativesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const activeCoops = [
    {
      id: "C001",
      name: "Artisan Collective",
      type: "Craft & Trade",
      members: 12,
      location: "Urban Center",
      status: "Active",
      nextMeeting: "2024-03-25",
    },
    {
      id: "C002",
      name: "Farmers Market Co-op",
      type: "Agriculture",
      members: 25,
      location: "Rural Area",
      status: "Active",
      nextMeeting: "2024-03-28",
    },
  ]

  const suggestedCoops = [
    {
      id: "C003",
      name: "Tech Innovation Hub",
      type: "Technology",
      members: 8,
      location: "Tech District",
      status: "Open to Join",
      matchScore: 85,
    },
    {
      id: "C004",
      name: "Sustainable Energy Group",
      type: "Energy",
      members: 15,
      location: "Green Zone",
      status: "Open to Join",
      matchScore: 75,
    },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Cooperatives</h1>
        <p className="text-gray-600 mt-2">Join and manage your community cooperatives</p>
      </motion.div>

      {/* Search and Create */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search cooperatives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Co-op
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Cooperatives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users2 className="h-6 w-6 text-blue-600" />
            <span>Your Active Cooperatives</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCoops.map((coop) => (
              <div key={coop.id} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{coop.name}</h3>
                    <p className="text-sm text-gray-600">{coop.type}</p>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{coop.location}</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {coop.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{coop.members} members</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Next: {coop.nextMeeting}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Cooperatives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-purple-600" />
            <span>Suggested Cooperatives</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedCoops.map((coop) => (
              <div key={coop.id} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{coop.name}</h3>
                    <p className="text-sm text-gray-600">{coop.type}</p>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{coop.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {coop.status}
                    </span>
                    <span className="text-sm text-gray-600">
                      Match: {coop.matchScore}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{coop.members} members</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Co-op Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-emerald-600" />
            <span>Co-op Resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Meeting Calendar</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <MessageSquare className="h-6 w-6" />
              <span>Discussion Board</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Target className="h-6 w-6" />
              <span>Goals & Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Calendar,
  MessageSquare,
  Globe,
  Building2,
  Network,
  Heart,
  Target,
  Zap,
  Award,
  User,
  ArrowRight,
  Search,
  MapPin,
  Clock,
  Shield,
  HeartHandshake,
  Handshake,
  Lightbulb,
} from "lucide-react"

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const upcomingEvents = [
    {
      id: "E001",
      title: "Community Healing Circle",
      date: "2024-03-20",
      time: "18:00",
      location: "Community Center",
      attendees: 45,
      type: "Healing",
    },
    {
      id: "E002",
      title: "Peace Dialogue Workshop",
      date: "2024-03-25",
      time: "14:00",
      location: "Virtual",
      attendees: 120,
      type: "Dialogue",
    },
  ]

  const peaceInitiatives = [
    {
      id: "N001",
      name: "Sarah Johnson",
      role: "Community Mediator",
      location: "Rural Community A",
      expertise: "Conflict Resolution",
      impact: "Resolved 15 community disputes",
    },
    {
      id: "N002",
      name: "Michael Chen",
      role: "Youth Peace Ambassador",
      location: "Urban Center B",
      expertise: "Youth Engagement",
      impact: "Led 8 peace workshops",
    },
  ]

  const healingPrograms = [
    {
      id: "C001",
      title: "Trauma-Informed Care",
      type: "Mental Health",
      participants: 35,
      status: "Active",
      impact: "Supporting healing journeys",
    },
    {
      id: "C002",
      title: "Community Reconciliation",
      type: "Social Healing",
      participants: 50,
      status: "In Progress",
      impact: "Building bridges",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Peace Community</h1>
        <p className="text-gray-600 mt-2">Building bridges, healing wounds, and fostering peace</p>
      </motion.div>

      {/* Search and Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search peace initiatives, healing programs, or community events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white">
                Create Peace Event
                <HeartHandshake className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span>Upcoming Peace Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {event.attendees} attending
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {event.type}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Join Event
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Peace Initiatives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-purple-600" />
              <span>Peace Leaders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {peaceInitiatives.map((initiative) => (
                <div key={initiative.id} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{initiative.name}</h3>
                      <p className="text-sm text-gray-600">{initiative.role}</p>
                      <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>{initiative.location}</span>
                      </div>
                      <p className="text-sm text-emerald-600 mt-2">{initiative.impact}</p>
                    </div>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {initiative.expertise}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Healing Programs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-emerald-600" />
              <span>Healing Programs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healingPrograms.map((program) => (
                <div key={program.id} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
                      <p className="text-sm text-gray-600">{program.type}</p>
                      <p className="text-sm text-emerald-600 mt-1">{program.impact}</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                      {program.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{program.participants} participants</span>
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
      </motion.div>
    </div>
  )
} 
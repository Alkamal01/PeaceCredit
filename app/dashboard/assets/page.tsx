"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"

export default function AssetsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const myAssets = [
    {
      id: "A001",
      name: "Community Workshop",
      type: "Facility",
      location: "Urban Center",
      status: "Available",
      nextBooking: "2024-03-25",
      sharedWith: 3,
    },
    {
      id: "A002",
      name: "Agricultural Tools",
      type: "Equipment",
      location: "Rural Area",
      status: "In Use",
      returnDate: "2024-03-28",
      sharedWith: 1,
    },
  ]

  const sharedAssets = [
    {
      id: "S001",
      name: "Community Kitchen",
      type: "Facility",
      owner: "Food Co-op",
      location: "Downtown",
      availability: "Weekends",
    },
    {
      id: "S002",
      name: "Transportation Van",
      type: "Vehicle",
      owner: "Mobility Collective",
      location: "City Center",
      availability: "On Request",
    },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">My Assets</h1>
        <p className="text-gray-600 mt-2">Manage and share your community assets</p>
      </motion.div>

      {/* Search and Add */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* My Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span>My Assets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myAssets.map((asset) => (
              <div key={asset.id} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                    <p className="text-sm text-gray-600">{asset.type}</p>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{asset.location}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    asset.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {asset.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Shared with {asset.sharedWith}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {asset.nextBooking ? `Next: ${asset.nextBooking}` : `Return: ${asset.returnDate}`}
                      </span>
                    </div>
                  </div>
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

      {/* Shared Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-purple-600" />
            <span>Shared Assets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sharedAssets.map((asset) => (
              <div key={asset.id} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                    <p className="text-sm text-gray-600">{asset.type}</p>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{asset.location}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">
                    By {asset.owner}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{asset.availability}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Request Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Booking Calendar</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Share2 className="h-6 w-6" />
              <span>Share Assets</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Community Pool</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
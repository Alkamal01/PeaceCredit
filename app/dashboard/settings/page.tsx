"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Settings, 
  Globe, 
  Shield, 
  Bell, 
  CreditCard, 
  User,
  ArrowRight
} from "lucide-react"

export default function SettingsPage() {
  const settingsOptions = [
    {
      title: "Currency & Locale",
      description: "Configure your preferred currency and language settings",
      icon: Globe,
      href: "/dashboard/settings/currency",
      available: true
    },
    {
      title: "Profile Settings",
      description: "Manage your personal information and account details",
      icon: User,
      href: "/dashboard/settings/profile",
      available: false
    },
    {
      title: "Security",
      description: "Password, two-factor authentication, and security preferences",
      icon: Shield,
      href: "/dashboard/settings/security",
      available: false
    },
    {
      title: "Notifications",
      description: "Email, SMS, and push notification preferences",
      icon: Bell,
      href: "/dashboard/settings/notifications",
      available: false
    },
    {
      title: "Payment Methods",
      description: "Manage your payment methods and billing information",
      icon: CreditCard,
      href: "/dashboard/settings/payments",
      available: false
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsOptions.map((option) => (
          <Card key={option.href} className={`transition-all hover:shadow-md ${!option.available ? 'opacity-60' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <option.icon className="h-5 w-5 text-blue-600" />
                {option.title}
                {!option.available && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {option.available ? (
                <Link href={option.href}>
                  <Button variant="outline" className="w-full">
                    Configure
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Frequently used settings and actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/dashboard/settings/currency">
              <Button variant="outline" className="w-full justify-start">
                <Globe className="h-4 w-4 mr-2" />
                Change Currency
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start" disabled>
              <Shield className="h-4 w-4 mr-2" />
              Security Settings
            </Button>
            <Button variant="outline" className="w-full justify-start" disabled>
              <Bell className="h-4 w-4 mr-2" />
              Notification Preferences
            </Button>
            <Button variant="outline" className="w-full justify-start" disabled>
              <User className="h-4 w-4 mr-2" />
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
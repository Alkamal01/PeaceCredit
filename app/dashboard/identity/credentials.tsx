"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Wallet,
  Users,
  GraduationCap,
  Building2,
  LucideIcon,
} from "lucide-react"

interface Credential {
  id: string
  type: string
  issuer: string
  status: "verified" | "pending" | "expired"
  date: string
  icon: LucideIcon
  description: string
}

interface CredentialsProps {
  did: string
}

export function Credentials({ did }: CredentialsProps) {
  const [credentials, setCredentials] = useState<Credential[]>([
    {
      id: "vc1",
      type: "Mobile Money User",
      issuer: "PeaceCredit",
      status: "verified",
      date: "2024-03-15",
      icon: Wallet,
      description: "Verified mobile money account holder",
    },
    {
      id: "vc2",
      type: "Trusted Community Member",
      issuer: "Local Cooperative",
      status: "verified",
      date: "2024-03-10",
      icon: Users,
      description: "Active member of the community cooperative",
    },
    {
      id: "vc3",
      type: "Financial Literacy Certified",
      issuer: "PeaceCredit Academy",
      status: "pending",
      date: "2024-03-20",
      icon: GraduationCap,
      description: "Completed financial literacy training",
    },
  ])

  const availableCredentials = [
    {
      type: "Mobile Money User",
      description: "Verify your mobile money account",
      icon: Wallet,
      requirements: ["Active mobile money account", "Minimum 3 months history"],
    },
    {
      type: "Community Leader",
      description: "Get verified as a community leader",
      icon: Users,
      requirements: ["Community endorsement", "Leadership experience"],
    },
    {
      type: "Business Owner",
      description: "Verify your business ownership",
      icon: Building2,
      requirements: ["Business registration", "Operating history"],
    },
  ]

  const handleRequestCredential = async (type: string) => {
    // TODO: Implement credential request using Polygon ID SDK
    console.log(`Requesting credential: ${type}`)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900">Verifiable Credentials</h2>
        <p className="text-gray-600 mt-2">Manage your digital credentials and reputation</p>
      </motion.div>

      {/* Current Credentials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-emerald-600" />
            <span>Your Credentials</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {credentials.map((credential) => {
              const CredentialIcon = credential.icon
              return (
                <div key={credential.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`h-12 w-12 rounded-full ${
                    credential.status === "verified" ? "bg-emerald-100" :
                    credential.status === "pending" ? "bg-yellow-100" :
                    "bg-red-100"
                  } flex items-center justify-center`}>
                    <CredentialIcon className={`h-6 w-6 ${
                      credential.status === "verified" ? "text-emerald-600" :
                      credential.status === "pending" ? "text-yellow-600" :
                      "text-red-600"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{credential.type}</h4>
                    <p className="text-sm text-gray-600">{credential.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Issued by {credential.issuer} on {credential.date}</p>
                  </div>
                  <Badge variant={
                    credential.status === "verified" ? "default" :
                    credential.status === "pending" ? "secondary" :
                    "destructive"
                  }>
                    {credential.status === "verified" ? "Verified" :
                     credential.status === "pending" ? "Pending" :
                     "Expired"}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Available Credentials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle2 className="h-6 w-6 text-blue-600" />
            <span>Available Credentials</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableCredentials.map((credential) => {
              const CredentialIcon = credential.icon
              return (
                <div key={credential.type} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <CredentialIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{credential.type}</h4>
                    <p className="text-sm text-gray-600">{credential.description}</p>
                    <div className="mt-2 space-y-1">
                      {credential.requirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-500">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleRequestCredential(credential.type)}
                  >
                    Request
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* DID Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-purple-600" />
            <span>DID Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-mono text-purple-900 break-all">{did}</p>
            </div>
            <p className="text-sm text-gray-600">
              This is your Decentralized Identifier (DID). It's used to store and verify your credentials securely.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
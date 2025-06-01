"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useIdentity } from "@/hooks/use-identity"
import { connectWallet } from "@/lib/polygon-id"
import {
  Wallet,
  Key,
  Shield,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  UserCircle,
  Phone,
  Users,
  LucideIcon,
} from "lucide-react"

interface CreateDIDProps {
  onComplete: () => void
}

interface Step {
  title: string
  description: string
  icon: LucideIcon
}

export function CreateDID({ onComplete }: CreateDIDProps) {
  const { createDID, verifyPhone, confirmPhoneVerification } = useIdentity()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    referrer: "",
  })
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const steps: Step[] = [
    {
      title: "Connect Wallet",
      description: "Connect your wallet to create your digital identity",
      icon: Wallet,
    },
    {
      title: "Basic Information",
      description: "Enter your basic details",
      icon: UserCircle,
    },
    {
      title: "Mobile Verification",
      description: "Verify your phone number",
      icon: Phone,
    },
    {
      title: "Community Referral",
      description: "Add a trusted community member as referrer",
      icon: Users,
    },
  ]

  const handleWalletConnect = async () => {
    try {
      setIsVerifying(true)
      setError(null)
      
      // Connect wallet and generate DID using Polygon ID SDK
      const { did, walletAddress } = await connectWallet()
      
      // Create DID in our backend
      const response = await fetch('/api/identity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ did, walletAddress }),
        credentials: 'include', // Important: This ensures cookies are sent with the request
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please sign in to continue')
        }
        throw new Error('Failed to create DID')
      }

      await response.json()
      setStep(2)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
  }

  const handlePhoneVerification = async () => {
    try {
      setIsVerifying(true)
      setError(null)
      await verifyPhone(formData.phone)
      setStep(4)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify phone")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError(null)
      await confirmPhoneVerification(formData.phone, verificationCode)
      onComplete()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete setup")
    }
  }

  const CurrentStepIcon = steps[step - 1].icon

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900">Create Your Digital Identity</h2>
        <p className="text-gray-600 mt-2">Follow these steps to create your self-sovereign identity</p>
      </motion.div>

      {error && (
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((s, index) => {
          const StepIcon = s.icon
          return (
            <div key={s.title} className="flex-1 relative">
              <div className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  index + 1 === step ? "bg-blue-100" :
                  index + 1 < step ? "bg-green-100" :
                  "bg-gray-100"
                }`}>
                  {index + 1 < step ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <StepIcon className={`h-5 w-5 ${
                      index + 1 === step ? "text-blue-600" : "text-gray-600"
                    }`} />
                  )}
                </div>
                <span className="text-sm mt-2 text-center">{s.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`absolute top-5 left-[60%] w-[80%] h-0.5 ${
                  index + 1 < step ? "bg-green-600" : "bg-gray-200"
                }`} />
              )}
            </div>
          )
        })}
      </div>

      <Progress value={(step / steps.length) * 100} className="h-2" />

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CurrentStepIcon className="h-6 w-6 text-blue-600" />
            <span>{steps[step - 1].title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-gray-600">{steps[0].description}</p>
              <Button 
                onClick={handleWalletConnect} 
                className="w-full"
                disabled={isVerifying}
              >
                Connect Wallet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleBasicInfoSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isVerifying}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <Button 
                onClick={handlePhoneVerification} 
                className="w-full"
                disabled={isVerifying}
              >
                {isVerifying ? "Sending Code..." : "Verify Phone Number"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleReferralSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referrer">Referrer's Phone Number</Label>
                <Input
                  id="referrer"
                  type="tel"
                  value={formData.referrer}
                  onChange={(e) => setFormData({ ...formData, referrer: e.target.value })}
                  required
                />
                <p className="text-sm text-gray-500">
                  Enter the phone number of a trusted community member who can vouch for you
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isVerifying}
              >
                {isVerifying ? "Completing Setup..." : "Complete Setup"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-900">Security Notice</h4>
              <p className="text-sm text-blue-700">
                Your digital identity is stored securely in your wallet. Make sure to backup your recovery phrase and keep it safe.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
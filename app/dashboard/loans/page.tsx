"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCard,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  TrendingUp,
  Calendar,
  Heart,
  Users,
  Globe,
  Target,
} from "lucide-react"

export default function LoansPage() {
  const [loanAmount, setLoanAmount] = useState("")
  const [loanPurpose, setLoanPurpose] = useState("")
  const [showLoanForm, setShowLoanForm] = useState(false)

  const activeLoans = [
    {
      id: "L001",
      amount: 5000,
      purpose: "Community Business Initiative",
      status: "Active",
      progress: 60,
      nextPayment: "2024-03-15",
      remainingAmount: 2000,
      impact: "Supporting 5 local artisans",
      peaceScore: 85,
    },
    {
      id: "L002",
      amount: 3000,
      purpose: "Education & Skills Development",
      status: "Active",
      progress: 30,
      nextPayment: "2024-03-20",
      remainingAmount: 2100,
      impact: "Training 10 youth in digital skills",
      peaceScore: 90,
    },
  ]

  const loanHistory = [
    {
      id: "L003",
      amount: 2000,
      purpose: "Women's Cooperative",
      status: "Completed",
      date: "2023-12-15",
      impact: "Empowered 8 women entrepreneurs",
    },
    {
      id: "L004",
      amount: 1500,
      purpose: "Youth Peace Initiative",
      status: "Completed",
      date: "2023-09-01",
      impact: "Created 3 community projects",
    },
  ]

  const peaceMetrics = [
    {
      title: "Community Impact",
      value: "85%",
      description: "Positive impact on community cohesion",
      icon: <Heart className="h-6 w-6 text-red-600" />,
    },
    {
      title: "Economic Stability",
      value: "78%",
      description: "Contribution to local economic stability",
      icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: "Social Integration",
      value: "92%",
      description: "Support for social integration initiatives",
      icon: <Users className="h-6 w-6 text-blue-600" />,
    },
  ]

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Loan application submitted", { loanAmount, loanPurpose })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Peace-Building Loans</h1>
        <p className="text-gray-600 mt-2">Empowering communities through sustainable economic development</p>
      </motion.div>

      {/* Peace Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {peaceMetrics.map((metric) => (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {metric.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Active Loans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-6 w-6 text-blue-600" />
              <span>Active Peace-Building Initiatives</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activeLoans.map((loan) => (
                <div key={loan.id} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Initiative #{loan.id}</h3>
                      <p className="text-gray-600">{loan.purpose}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {loan.status}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        Peace Score: {loan.peaceScore}%
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="text-lg font-semibold">${loan.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Next Payment</p>
                      <p className="text-lg font-semibold">{loan.nextPayment}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Impact</p>
                      <p className="text-lg font-semibold">{loan.impact}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{loan.progress}%</span>
                    </div>
                    <Progress value={loan.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Loan History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-gray-600" />
              <span>Completed Peace Initiatives</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loanHistory.map((loan) => (
                <div key={loan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Initiative #{loan.id}</h3>
                    <p className="text-sm text-gray-600">{loan.purpose}</p>
                    <p className="text-sm text-emerald-600 mt-1">{loan.impact}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${loan.amount}</p>
                    <p className="text-sm text-gray-600">{loan.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* New Loan Application */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-emerald-600" />
              <span>Start a New Peace Initiative</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="h-6 w-6 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-emerald-900">AI Peace Impact Assistant</h3>
                  </div>
                  <p className="text-emerald-800 mb-4">
                    Get personalized recommendations for peace-building initiatives based on community needs and impact potential.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span className="text-emerald-800">Community-driven impact assessment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span className="text-emerald-800">Sustainable development focus</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span className="text-emerald-800">Peace-building metrics tracking</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowLoanForm(!showLoanForm)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white"
                >
                  {showLoanForm ? "Hide Application Form" : "Start Initiative"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {showLoanForm && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-lg border border-emerald-100"
                >
                  <form onSubmit={handleLoanSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Initiative Budget</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="loanAmount"
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanPurpose">Initiative Type</Label>
                      <Select
                        value={loanPurpose}
                        onValueChange={setLoanPurpose}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select initiative type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="education">Education & Skills Development</SelectItem>
                          <SelectItem value="community">Community Business Initiative</SelectItem>
                          <SelectItem value="youth">Youth Peace Program</SelectItem>
                          <SelectItem value="women">Women's Empowerment</SelectItem>
                          <SelectItem value="other">Other Peace Initiative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <Sparkles className="inline-block h-4 w-4 mr-1" />
                        AI Recommendation: Based on community needs, this initiative could have a high impact on peace-building metrics.
                      </p>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white">
                      Submit Initiative
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 
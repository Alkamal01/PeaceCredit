"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard,
  TrendingUp,
  History,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

export default function CreditPage() {
  const [creditScore, setCreditScore] = useState(750)

  const creditHistory = [
    {
      date: "2024-03-15",
      type: "Loan Repayment",
      amount: 500,
      status: "Completed",
    },
    {
      date: "2024-03-01",
      type: "Credit Assessment",
      amount: 0,
      status: "Completed",
    },
    {
      date: "2024-02-15",
      type: "Loan Disbursement",
      amount: 1000,
      status: "Completed",
    },
  ]

  const creditFactors = [
    { name: "Payment History", score: 95, weight: "High" },
    { name: "Credit Utilization", score: 70, weight: "Medium" },
    { name: "Credit History Length", score: 85, weight: "High" },
    { name: "Credit Mix", score: 80, weight: "Medium" },
    { name: "New Credit", score: 90, weight: "Low" },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Credit Profile</h1>
        <p className="text-gray-600 mt-2">Your complete credit history and analysis</p>
      </motion.div>

      {/* Credit Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-blue-600" />
            <span>Credit Score Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Current Score</h3>
                <span className="text-sm text-gray-500">Last updated: Today</span>
              </div>
              <div className="relative h-32 w-32 mx-auto">
                <Progress value={creditScore} className="h-32 w-32 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{creditScore}</span>
                </div>
              </div>
              <Button className="w-full">
                Request New Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Credit Factors</h3>
              {creditFactors.map((factor) => (
                <div key={factor.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{factor.name}</span>
                    <span className="text-gray-500">{factor.weight}</span>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-6 w-6 text-purple-600" />
            <span>Credit History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {creditHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.type}</h4>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {item.amount > 0 && (
                    <span className="text-gray-900">${item.amount}</span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Credit Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <span>Credit Improvement Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-emerald-50 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1" />
              <div>
                <h4 className="font-semibold text-emerald-900">Maintain Payment History</h4>
                <p className="text-emerald-800 mt-1">
                  Continue making timely payments to maintain your excellent payment history score.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900">Reduce Credit Utilization</h4>
                <p className="text-blue-800 mt-1">
                  Consider reducing your credit utilization to improve your score. Aim for below 30%.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
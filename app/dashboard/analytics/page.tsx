"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Activity,
  Calendar,
  CreditCard,
  Building2,
} from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")

  const financialMetrics = [
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: "Active Loans",
      value: "8",
      change: "+2",
      trend: "up",
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Community Growth",
      value: "156",
      change: "+23",
      trend: "up",
      icon: <Users className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "Resource Utilization",
      value: "78%",
      change: "-2.5%",
      trend: "down",
      icon: <Activity className="h-6 w-6 text-orange-600" />,
    },
  ]

  const growthTrends = [
    {
      month: "Jan",
      revenue: 8500,
      loans: 5,
      community: 120,
    },
    {
      month: "Feb",
      revenue: 9200,
      loans: 6,
      community: 135,
    },
    {
      month: "Mar",
      revenue: 12450,
      loans: 8,
      community: 156,
    },
  ]

  const aiInsights = [
    {
      title: "Revenue Optimization",
      description: "Based on your current growth rate, you could increase revenue by 15% through targeted loan products.",
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Community Engagement",
      description: "Your community engagement score is high. Consider hosting more networking events to strengthen connections.",
      icon: <Users className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "Resource Allocation",
      description: "AI suggests reallocating 20% of resources to high-growth areas for better efficiency.",
      icon: <Target className="h-6 w-6 text-emerald-600" />,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Track your growth and performance</p>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex space-x-2">
              <Button
                variant={timeRange === "week" ? "default" : "outline"}
                onClick={() => setTimeRange("week")}
              >
                Week
              </Button>
              <Button
                variant={timeRange === "month" ? "default" : "outline"}
                onClick={() => setTimeRange("month")}
              >
                Month
              </Button>
              <Button
                variant={timeRange === "year" ? "default" : "outline"}
                onClick={() => setTimeRange("year")}
              >
                Year
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Financial Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financialMetrics.map((metric) => (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {metric.icon}
                  </div>
                  <span className={`flex items-center text-sm ${
                    metric.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {metric.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                <p className="text-sm text-gray-600">{metric.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Growth Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <span>Growth Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {growthTrends.map((trend) => (
                <div key={trend.month} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{trend.month}</span>
                    <span className="text-gray-600">${trend.revenue.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                      style={{ width: `${(trend.revenue / 12450) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{trend.loans} loans</span>
                    <span>{trend.community} members</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <span>AI Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiInsights.map((insight) => (
                <div key={insight.title} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    {insight.icon}
                    <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                  </div>
                  <p className="text-gray-600">{insight.description}</p>
                  <Button variant="outline" className="mt-4 w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 
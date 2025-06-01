"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  HelpCircle,
  Search,
  MessageSquare,
  Phone,
  Mail,
  BookOpen,
  Users,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does PeaceCredit work?",
      answer: "PeaceCredit is a community-based credit system that focuses on peace-building through economic empowerment. It uses AI to assess creditworthiness based on community engagement, resource sharing, and peace-building activities.",
    },
    {
      question: "How can I join a cooperative?",
      answer: "You can join a cooperative through the Cooperatives page. Browse available cooperatives, check their requirements, and submit a join request. Our AI will help match you with the most suitable cooperative based on your skills and interests.",
    },
    {
      question: "What is the Peace Score?",
      answer: "The Peace Score is a unique metric that measures your contribution to peace-building and community development. It considers factors like community engagement, conflict resolution, and resource sharing.",
    },
    {
      question: "How can I share my assets?",
      answer: "You can share your assets through the My Assets page. List your available assets, set sharing preferences, and connect with community members who need them. Our system ensures safe and fair resource sharing.",
    },
  ]

  const contactOptions = [
    {
      title: "Community Support",
      description: "Get help from community members",
      icon: Users,
      action: "Join Community",
    },
    {
      title: "Email Support",
      description: "support@peacecredit.org",
      icon: Mail,
      action: "Send Email",
    },
    {
      title: "Phone Support",
      description: "+1 (555) 123-4567",
      icon: Phone,
      action: "Call Now",
    },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-2">Get assistance and find answers to your questions</p>
      </motion.div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="h-6 w-6 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                <button
                  className="w-full flex items-center justify-between text-left"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-purple-600" />
            <span>Contact Us</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactOptions.map((option) => (
              <div key={option.title} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <option.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{option.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  {option.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            <span>Quick Links</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <BookOpen className="h-6 w-6" />
              <span>Documentation</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Community Forum</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <HelpCircle className="h-6 w-6" />
              <span>Video Tutorials</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
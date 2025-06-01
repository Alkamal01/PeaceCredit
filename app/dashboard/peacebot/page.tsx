"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bot,
  Send,
  MessageSquare,
  HeartHandshake,
  Lightbulb,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react"

export default function PeaceBotPage() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Hello! I'm PeaceBot, your AI assistant for peace-building and community development. How can I help you today?",
    },
  ])

  const suggestedTopics = [
    {
      title: "Conflict Resolution",
      description: "Learn about peaceful conflict resolution techniques",
      icon: HeartHandshake,
    },
    {
      title: "Community Building",
      description: "Get tips for strengthening community bonds",
      icon: Users,
    },
    {
      title: "Resource Sharing",
      description: "Discover ways to share and optimize community resources",
      icon: Lightbulb,
    },
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message to chat
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: message },
    ])

    // Simulate AI response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I understand you're interested in peace-building. Let me help you with that. What specific aspect would you like to explore?",
        },
      ])
    }, 1000)

    setMessage("")
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">PeaceBot</h1>
        <p className="text-gray-600 mt-2">Your AI assistant for peace-building and community development</p>
      </motion.div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <span>Chat with PeaceBot</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    msg.role === "assistant"
                      ? "bg-blue-50 text-blue-900"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {msg.role === "assistant" && (
                      <Bot className="h-5 w-5 text-blue-600 mt-1" />
                    )}
                    <p>{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <span>Suggested Topics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestedTopics.map((topic) => (
              <Button
                key={topic.title}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => setMessage(`Tell me about ${topic.title.toLowerCase()}`)}
              >
                <topic.icon className="h-6 w-6" />
                <div className="text-center">
                  <span className="font-semibold block">{topic.title}</span>
                  <span className="text-sm text-gray-600">{topic.description}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-emerald-600" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <HeartHandshake className="h-6 w-6" />
              <span>Peace Resources</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Community Support</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Lightbulb className="h-6 w-6" />
              <span>AI Insights</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Bot,
  Send,
  MessageSquare,
  HeartHandshake,
  Lightbulb,
  Users,
  Sparkles,
  Loader2,
  User,
  AlertCircle,
  Zap,
  Brain,
  Shield,
  Globe,
} from "lucide-react"
import { useTranslations } from "@/contexts/TranslationsContext"
import { useRouter } from "next/navigation"
import { useIdentity } from "@/hooks/use-identity"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function PeaceBotPage() {
  const router = useRouter()
  const { isAuthenticated } = useIdentity()
  const { t, isLoading: translationsLoading } = useTranslations()
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chatHistory, setChatHistory] = useState<Message[]>([])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize chat history after translations load
  useEffect(() => {
    if (!translationsLoading && chatHistory.length === 0) {
      setChatHistory([
        {
          role: "assistant",
          content: t('peacebot.welcome_message'),
          timestamp: new Date(),
        },
      ])
    }
  }, [translationsLoading, t, chatHistory.length])

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push("/auth/login")
    return null
  }

  // Show loading state while translations are loading
  if (translationsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const suggestedQuestions = [
    {
      title: t('peacebot.suggested_questions.credit_score.title'),
      question: t('peacebot.suggested_questions.credit_score.question'),
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
    },
    {
      title: t('peacebot.suggested_questions.cooperatives.title'),
      question: t('peacebot.suggested_questions.cooperatives.question'),
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 hover:bg-emerald-100",
    },
    {
      title: t('peacebot.suggested_questions.financial_literacy.title'),
      question: t('peacebot.suggested_questions.financial_literacy.question'),
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100",
    },
    {
      title: t('peacebot.suggested_questions.peace_building.title'),
      question: t('peacebot.suggested_questions.peace_building.question'),
      icon: HeartHandshake,
      color: "text-rose-600",
      bgColor: "bg-rose-50 hover:bg-rose-100",
    },
  ]

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || message.trim()
    if (!textToSend) return

    setError("")
    setIsLoading(true)
    
    const userMessage: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    }

    setChatHistory(prev => [...prev, userMessage])
    setMessage("")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textToSend }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setChatHistory(prev => [...prev, assistantMessage])
    } catch (err) {
      setError(t('peacebot.error_connection'))
      console.error("Chat error:", err)
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('peacebot.title')}
              </h1>
              <p className="text-gray-600">{t('peacebot.subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>{t('peacebot.features.secure')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="h-4 w-4" />
              <span>{t('peacebot.features.multilingual')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Sparkles className="h-4 w-4" />
              <span>{t('peacebot.features.ai_powered')}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span>{t('peacebot.chat_title')}</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {t('peacebot.status_online')}
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Chat Messages */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {chatHistory.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`max-w-[80%] ${msg.role === "assistant" ? "order-2" : "order-1"}`}>
                        <div
                          className={`p-4 rounded-2xl shadow-sm ${
                            msg.role === "assistant"
                              ? "bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 rounded-bl-md"
                              : "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-md"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            {msg.role === "assistant" && (
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <Bot className="h-4 w-4 text-white" />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                              <p className={`text-xs mt-2 ${
                                msg.role === "assistant" ? "text-gray-500" : "text-blue-100"
                              }`}>
                                {formatTime(msg.timestamp)}
                              </p>
                            </div>
                            {msg.role === "user" && (
                              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <User className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl rounded-bl-md shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                          <span className="text-gray-600">{t('peacebot.thinking')}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Error Alert */}
              {error && (
                <div className="px-6 pb-4">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Message Input */}
              <div className="border-t bg-gray-50/50 p-4">
                <div className="flex space-x-3">
                  <Input
                    ref={inputRef}
                    placeholder={t('peacebot.input_placeholder')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="flex-1 border-0 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 rounded-xl"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !message.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 shadow-lg"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Suggested Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-amber-600" />
                <span>{t('peacebot.quick_questions')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Button
                      variant="outline"
                      className={`w-full h-auto p-4 text-left border-0 ${item.bgColor} transition-all duration-200 hover:shadow-md`}
                      onClick={() => handleSendMessage(item.question)}
                      disabled={isLoading}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl ${item.bgColor.replace('hover:', '')} flex items-center justify-center`}>
                          <item.icon className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{item.question}</div>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 
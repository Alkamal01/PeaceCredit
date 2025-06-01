"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Building,
  User,
  Clock,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent">
                  Get in Touch
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Have questions or want to learn more about how PeaceCredit can help your community? We're here to help.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-xl border-0">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Full Name</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization" className="flex items-center space-x-2">
                        <Building className="h-4 w-4" />
                        <span>Organization</span>
                      </Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Enter your organization name"
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Message</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we help you?"
                        required
                        className="min-h-[150px] border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                    >
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="h-6 w-6 text-blue-600" />,
                      title: "Email",
                      content: "support@peacecredit.org",
                      description: "We'll respond within 24 hours",
                    },
                    {
                      icon: <Phone className="h-6 w-6 text-blue-600" />,
                      title: "Phone",
                      content: "+1 (555) 123-4567",
                      description: "Available Monday to Friday, 9am - 5pm EST",
                    },
                    {
                      icon: <MapPin className="h-6 w-6 text-blue-600" />,
                      title: "Location",
                      content: "Global Presence",
                      description: "Serving communities worldwide",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="p-2 bg-blue-50 rounded-lg">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.content}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Separator className="my-8" />

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    {
                      question: "How does PeaceCredit work?",
                      answer: "PeaceCredit uses AI-powered technology to assess creditworthiness and provide financial services to underserved communities.",
                    },
                    {
                      question: "What regions do you serve?",
                      answer: "We currently operate in multiple countries across Africa, with plans to expand to other regions.",
                    },
                    {
                      question: "How can my community get started?",
                      answer: "Contact us through this form, and our team will guide you through the process of setting up PeaceCredit in your community.",
                    },
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-4 rounded-lg shadow-sm"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <motion.div
                className="flex items-center space-x-2 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Shield className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                  PeaceCredit
                </span>
              </motion.div>
              <p className="text-gray-400 mb-4">
                Empowering economic resilience in fragile communities through AI-powered financial services and
                cooperative building.
              </p>
              <div className="flex space-x-4">
                {["f", "t", "in"].map((icon, index) => (
                  <motion.div
                    key={icon}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer"
                    whileHover={{
                      scale: 1.2,
                      backgroundColor: ["#374151", "#3B82F6", "#374151"],
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <span className="text-xs">{icon}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { name: "Home", href: "/" },
                  { name: "About", href: "/about" },
                  { name: "Testimonials", href: "/testimonials" },
                  { name: "Contact", href: "/contact" },
                ].map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Link href={link.href} className="block text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                {["support@peacecredit.org", "+1 (555) 123-4567", "Building resilient communities"].map(
                  (item, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      {item}
                    </motion.p>
                  ),
                )}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Separator className="my-8 bg-gray-700" />
            <div className="text-center text-gray-400">
              <p>&copy; 2024 PeaceCredit. All rights reserved. Building economic empowerment through technology.</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
} 
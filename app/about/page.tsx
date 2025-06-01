"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Heart,
  Users,
  Target,
  Globe,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Handshake,
  TrendingUp,
  Zap,
  Award,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-200/20 to-green-200/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-purple-200/20 to-blue-200/20 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

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
                  Our Mission
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                We're on a mission to transform fragile communities through innovative financial solutions and sustainable economic growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  Vision
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We envision a world where every community has access to the financial tools and resources they need to thrive. Through AI-powered solutions and sustainable practices, we're building bridges to economic empowerment.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: <Lightbulb className="h-6 w-6 text-blue-600" />,
                    title: "Innovation",
                    description: "Leveraging cutting-edge technology to solve complex challenges",
                  },
                  {
                    icon: <Heart className="h-6 w-6 text-blue-600" />,
                    title: "Community",
                    description: "Building strong, supportive networks for sustainable growth",
                  },
                  {
                    icon: <Target className="h-6 w-6 text-blue-600" />,
                    title: "Impact",
                    description: "Creating measurable, positive change in communities",
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
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="absolute inset-0 rounded-2xl bg-white/50 backdrop-blur-sm p-8">
                  <div className="space-y-6">
                    {[
                      { icon: <Globe className="h-8 w-8 text-blue-600" />, text: "Global Impact" },
                      { icon: <Users className="h-8 w-8 text-teal-600" />, text: "Community Focus" },
                      { icon: <TrendingUp className="h-8 w-8 text-green-600" />, text: "Sustainable Growth" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      >
                        {item.icon}
                        <span className="text-lg font-medium text-gray-900">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at PeaceCredit
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-blue-600" />,
                title: "Trust & Security",
                description: "Building secure, reliable financial solutions you can count on",
              },
              {
                icon: <Zap className="h-8 w-8 text-blue-600" />,
                title: "Innovation",
                description: "Pushing boundaries with cutting-edge technology",
              },
              {
                icon: <Award className="h-8 w-8 text-blue-600" />,
                title: "Excellence",
                description: "Committed to delivering the highest quality service",
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Community",
                description: "Fostering strong, supportive networks",
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
                title: "Growth",
                description: "Supporting sustainable economic development",
              },
              {
                icon: <Heart className="h-8 w-8 text-blue-600" />,
                title: "Empathy",
                description: "Understanding and addressing real community needs",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Join Us in Building a Better Future
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Be part of our mission to create sustainable economic growth and lasting peace in communities worldwide.
            </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/auth">
                  <Button
                    size="lg"
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
          </motion.div>
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
                  { name: "Get Started", href: "/auth" },
                  { name: "Privacy Policy", href: "#" },
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

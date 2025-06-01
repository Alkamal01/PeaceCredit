"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shield, ArrowRight, Star, Quote } from "lucide-react"
import Link from "next/link"

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      location: "Kenya",
      image: "/placeholder.svg",
      quote: "PeaceCredit's AI-powered credit assessment helped me secure the funding I needed to expand my business. The process was transparent and efficient.",
      rating: 5,
    },
    {
      name: "Mohammed Ali",
      role: "Community Leader",
      location: "Somalia",
      image: "/placeholder.svg",
      quote: "The platform has transformed how our community accesses financial services. It's more than just credit - it's about building sustainable economic growth.",
      rating: 5,
    },
    {
      name: "Grace Mwangi",
      role: "Agricultural Entrepreneur",
      location: "Tanzania",
      image: "/placeholder.svg",
      quote: "As a farmer, traditional banks never understood my business. PeaceCredit's innovative approach changed everything for me and my community.",
      rating: 5,
    },
    {
      name: "David Ochieng",
      role: "Tech Startup Founder",
      location: "Uganda",
      image: "/placeholder.svg",
      quote: "The AI-driven insights provided by PeaceCredit helped us optimize our resources and grow our business sustainably.",
      rating: 5,
    },
    {
      name: "Amina Hassan",
      role: "Artisan Cooperative Leader",
      location: "Ethiopia",
      image: "/placeholder.svg",
      quote: "PeaceCredit's community-focused approach has helped our cooperative thrive. Their support goes beyond just financial services.",
      rating: 5,
    },
    {
      name: "James Kamau",
      role: "Local Business Owner",
      location: "Rwanda",
      image: "/placeholder.svg",
      quote: "The platform's user-friendly interface and quick approval process made it easy for me to access the capital I needed to grow my business.",
      rating: 5,
    },
  ]

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
                  Success Stories
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Hear from our community members about how PeaceCredit is transforming lives and building sustainable economic futures.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center">
                        <Quote className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{testimonial.location}</span>
                    </div>
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
              Ready to Start Your Success Story?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of entrepreneurs and community leaders who are building sustainable futures with PeaceCredit.
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
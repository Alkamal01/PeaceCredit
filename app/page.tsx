"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  ChevronDown,
  Heart,
  Target,
  Zap,
  Globe,
  Award,
  User,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Clock,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  Bot,
  Building2,
  ChevronLeft,
  ChevronRight,
  Store,
  Leaf,
  Droplets,
  UserCircle,
  Briefcase,
  School,
} from "lucide-react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  const features = [
    {
      title: "AI-Powered Credit Scoring",
      description: "Access fair credit based on community participation, resource sharing, and peace-building activities",
      icon: HeartHandshake,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Decentralized Identity",
      description: "Secure, portable digital identity that works across borders and institutions",
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Community Cooperatives",
      description: "Join or form cooperatives to pool resources and share risks for sustainable growth",
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Resource Optimization",
      description: "AI-powered recommendations for water, food, and financial resource management",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const benefits = [
    "Access to fair credit without traditional requirements",
    "Secure cross-border identity verification",
    "Community-based risk sharing and support",
    "AI-powered resource optimization",
    "Multilingual support and guidance",
    "Peace-building through economic empowerment",
  ]

  const testimonials = [
    {
      quote: "PeaceCredit helped me start my small business in Lagos. The community support and fair credit access made it possible for me to provide for my family.",
      author: "Adebayo O.",
      role: "Small Business Owner",
      location: "Lagos, Nigeria",
      icon: UserCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      quote: "Through the cooperative structure, our farming community in Oyo State has been able to pool resources and increase our crop yields by 40%.",
      author: "Folake A.",
      role: "Agricultural Cooperative Leader",
      location: "Oyo State, Nigeria",
      icon: UserCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      quote: "The AI-powered resource optimization helped our community in Kano better manage our water resources during the dry season.",
      author: "Ibrahim M.",
      role: "Community Resource Manager",
      location: "Kano, Nigeria",
      icon: UserCircle,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100"
    },
    {
      quote: "As a displaced person from the North-East, PeaceCredit's decentralized ID system helped me access financial services and rebuild my life.",
      author: "Hauwa B.",
      role: "Refugee Entrepreneur",
      location: "Borno State, Nigeria",
      icon: UserCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      quote: "The cooperative structure helped our market women's group in Port Harcourt secure better prices for our goods and access microloans.",
      author: "Chioma E.",
      role: "Market Women Association Leader",
      location: "Port Harcourt, Nigeria",
      icon: UserCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      quote: "PeaceCredit's educational resources helped our youth group in Abuja learn about financial management and start small businesses.",
      author: "Oluwaseun K.",
      role: "Youth Development Coordinator",
      location: "Abuja, Nigeria",
      icon: UserCircle,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ]

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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <h1 className="text-4xl md:text-6xl font-bold mb-6 relative">
                  <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent">
                    Building Peace
                  </span>{" "}
                  <span className="text-gray-900">Through Smart Finance</span>
                </h1>
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                We're revolutionizing financial access in fragile communities with AI-powered solutions. Join us in creating sustainable economic growth and lasting peace.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/auth">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Start Your Journey
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.div>
                    </Button>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/about">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-lg rounded-xl transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Main Circle */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-teal-100"
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
                
                {/* Orbiting Elements */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {[
                    { icon: <Shield className="h-8 w-8 text-blue-600" />, delay: 0 },
                    { icon: <Users className="h-8 w-8 text-teal-600" />, delay: 0.33 },
                    { icon: <TrendingUp className="h-8 w-8 text-green-600" />, delay: 0.66 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
                      style={{
                        top: `${Math.cos(index * (2 * Math.PI / 3)) * 120}px`,
                        left: `${Math.sin(index * (2 * Math.PI / 3)) * 120}px`,
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [-360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: item.delay * 20,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Center Element */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center shadow-xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Shield className="h-16 w-16 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
              className="inline-block"
              onClick={() => scrollToSection("features")}
            >
              <ChevronDown className="h-8 w-8 text-gray-400 cursor-pointer hover:text-blue-600 transition-colors" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transforming Lives Through{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Innovation
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools and services empowers communities to build sustainable economic futures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`h-12 w-12 rounded-full ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose PeaceCredit?</h2>
              <p className="text-xl text-gray-600">Empowering communities through innovative peace finance</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Stories</h2>
            <p className="text-xl text-gray-600">Hear from those building peace through economic empowerment</p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.author} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className={`h-16 w-16 rounded-full ${testimonial.bgColor} flex items-center justify-center`}>
                              <testimonial.icon className={`h-8 w-8 ${testimonial.color}`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                              <p className="text-sm text-gray-600">{testimonial.role}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Globe className="h-4 w-4 mr-2" />
                            {testimonial.location}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Navigation Buttons */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-blue-600 transition-colors"
                onClick={() => emblaApi?.scrollTo(index)}
              />
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
              Ready to Transform Your Community?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of communities already benefiting from PeaceCredit's innovative solutions
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
      <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Shield className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                  PeaceCredit
                </span>
              </motion.div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering communities through innovative financial solutions and sustainable economic growth.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: "f", color: "hover:bg-blue-600" },
                  { icon: "t", color: "hover:bg-sky-500" },
                  { icon: "in", color: "hover:bg-blue-700" },
                ].map((social, index) => (
                  <motion.a
                    key={social.icon}
                    href="#"
                    className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 transition-colors ${social.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  { name: "Home", href: "/" },
                  { name: "About", href: "/about" },
                  { name: "Get Started", href: "/auth" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-4">
                {[
                  { name: "Blog", href: "/blog" },
                  { name: "Documentation", href: "/docs" },
                  { name: "Support", href: "/support" },
                  { name: "Privacy Policy", href: "/privacy" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 text-gray-400">
                  <Mail className="h-5 w-5" />
                  <span>support@peacecredit.org</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Phone className="h-5 w-5" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="h-5 w-5" />
                  <span>Building resilient communities</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-12 bg-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} PeaceCredit. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

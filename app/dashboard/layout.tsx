"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Package,
  Bot,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  Home,
  Building2,
  HeartHandshake,
  Shield,
  FileText,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import { signOut } from "next-auth/react"
import { useTranslations } from "@/contexts/TranslationsContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useIsMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true) // Default to true for SSR
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t, isLoading: translationsLoading } = useTranslations()

  // Define sidebar items using translations
  const sidebarItems = [
    {
      title: t('navigation.dashboard'),
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t('navigation.my_credit'),
      href: "/dashboard/credit",
      icon: CreditCard,
    },
    {
      title: t('navigation.financial_profile'),
      href: "/dashboard/credit/financial-profile",
      icon: FileText,
    },
    {
      title: t('navigation.cooperatives'),
      href: "/dashboard/cooperatives",
      icon: Users,
    },
    {
      title: "Resources",
      href: "/dashboard/resources",
      icon: Package,
    },
    {
      title: "My Assets",
      href: "/dashboard/assets",
      icon: Building2,
    },
    {
      title: "Identity",
      href: "/dashboard/identity",
      icon: Shield,
    },
    {
      title: "PeaceBot",
      href: "/dashboard/peacebot",
      icon: Bot,
    },
  ]

  // Handle hydration
  useEffect(() => {
    setMounted(true)
    // Set initial sidebar state based on mobile detection after mount
    setIsSidebarOpen(!isMobile)
  }, [isMobile])

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/auth/login")
  }

  // Prevent hydration mismatch by not rendering mobile-specific content until mounted
  if (!mounted || translationsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.png"
                  alt="PeaceCredit Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  PeaceCredit
                </span>
              </Link>
            </div>
          </div>
        </nav>
        <main className="pt-16">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden"
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="PeaceCredit Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                PeaceCredit
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              {t('common.language')}
            </Button>
            <Button variant="ghost" size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              {t('navigation.help')}
            </Button>
            <Link href="/dashboard/settings/currency">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                {t('navigation.settings')}
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-600 hover:text-red-700"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t('common.logout')}
            </Button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : isMobile ? "-100%" : "-240px",
          width: isMobile ? "280px" : "240px"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 overflow-y-auto ${
          isMobile && !isSidebarOpen ? "pointer-events-none" : ""
        }`}
      >
        <div className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    isActive ? "bg-blue-50 text-blue-700 border-blue-200" : ""
                  }`}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className={`transition-all duration-300 ease-in-out pt-16 ${
          isSidebarOpen && !isMobile ? "ml-60" : "ml-0"
        }`}
      >
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('common.confirm')} {t('common.logout')}</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to sign in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              {t('common.logout')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
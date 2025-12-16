"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Package,
  Car,
  FileText,
  BookOpen,
  ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { safeSignOut } from "@/lib/supabase/client"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/taxi", label: "Taxi", icon: Car },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/diaries", label: "Travel Diaries", icon: BookOpen },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = async () => {
    if (!isClient) return
    await safeSignOut()
    router.push("/admin/login")
    router.refresh()
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-saffron to-sunset-orange rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="12" r="5" fill="#FFD700" className="opacity-90" />
              <path d="M20 8L32 28H8L20 8Z" fill="white" />
              <path d="M12 16L22 28H2L12 16Z" fill="white" className="opacity-80" />
              <path d="M20 8L24 14H16L20 8Z" fill="#fff" />
            </svg>
          </div>
          <div>
            <h1 className="font-serif font-bold text-foreground">
              <span className="text-saffron">Tour</span>
              <span className="text-foreground">To</span>
              <span className="text-forest-green">Himachal</span>
            </h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-saffron to-sunset-orange rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="12" r="5" fill="#FFD700" />
                <path d="M20 8L32 28H8L20 8Z" fill="white" />
                <path d="M12 16L22 28H2L12 16Z" fill="white" className="opacity-80" />
              </svg>
            </div>
            <span className="font-serif font-bold text-sm">
              <span className="text-saffron">Tour</span>To<span className="text-forest-green">Himachal</span>
            </span>
          </Link>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2">
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isMobileOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-background border-r border-border flex flex-col"
      >
        <SidebarContent />
      </motion.aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 bg-background border-r border-border flex-col">
        <SidebarContent />
      </aside>
    </>
  )
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Package, FileText, ImageIcon, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const actions = [
  { href: "/admin/packages/new", label: "Add Package", icon: Package, color: "bg-blue-100 text-blue-600" },
  { href: "/admin/blogs/new", label: "Write Blog", icon: FileText, color: "bg-green-100 text-green-600" },
  { href: "/admin/media", label: "Upload Media", icon: ImageIcon, color: "bg-amber-100 text-amber-600" },
  { href: "/admin/settings", label: "Settings", icon: Settings, color: "bg-purple-100 text-purple-600" },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={action.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {action.label}
              </span>
              <Plus className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}

"use client"

import { motion } from "framer-motion"
import { Users, UserPlus, Package, Car, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface DashboardStatsProps {
  stats: {
    totalLeads: number
    newToday: number
    packageEnquiries: number
    taxiEnquiries: number
  }
}

const statCards = [
  {
    key: "totalLeads",
    label: "Total Leads",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    key: "newToday",
    label: "New Today",
    icon: UserPlus,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    key: "packageEnquiries",
    label: "Package Enquiries",
    icon: Package,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    key: "taxiEnquiries",
    label: "Taxi Enquiries",
    icon: Car,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stats[stat.key as keyof typeof stats]}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              {stat.key === "newToday" && stats.newToday > 0 && (
                <div className="flex items-center gap-1 mt-3 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>Active inquiries</span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

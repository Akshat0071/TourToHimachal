"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MessageCircle, ArrowRight, Inbox } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  service_type: string
  status: string
  created_at: string
  reference_number: string
}

interface RecentLeadsProps {
  leads: Lead[]
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  booked: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
}

const serviceLabels: Record<string, string> = {
  package: "Package",
  taxi: "Taxi",
  enquiry: "Enquiry",
}

export function RecentLeads({ leads }: RecentLeadsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Leads</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/leads" className="gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {leads.length === 0 ? (
          <div className="text-center py-8">
            <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No leads yet</p>
            <p className="text-sm text-muted-foreground">New inquiries will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground truncate">{lead.name}</p>
                    <Badge variant="outline" className={statusColors[lead.status]}>
                      {lead.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{serviceLabels[lead.service_type] || lead.service_type}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=Hi ${lead.name}, thank you for contacting Himachal Yatra!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#25D366] text-white hover:bg-[#25D366]/90 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

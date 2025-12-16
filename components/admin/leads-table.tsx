"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Mail, Phone, MoreHorizontal, Eye, Trash2, Inbox } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  service_type: string
  status: string
  created_at: string
  reference_number: string
  file_url?: string
}

interface LeadsTableProps {
  leads: Lead[]
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
  booked: "bg-green-100 text-green-800 border-green-200",
  closed: "bg-gray-100 text-gray-800 border-gray-200",
}

const serviceLabels: Record<string, string> = {
  package: "Package",
  taxi: "Taxi",
  enquiry: "Enquiry",
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const router = useRouter()
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    setIsUpdating(true)
    const supabase = createClient()

    const { error } = await supabase.from("leads").update({ status: newStatus }).eq("id", leadId)

    if (error) {
      toast.error("Failed to update status")
    } else {
      toast.success(`Status updated to ${newStatus}`)
      router.refresh()
    }
    setIsUpdating(false)
  }

  const deleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return

    const supabase = createClient()
    const { error } = await supabase.from("leads").delete().eq("id", leadId)

    if (error) {
      toast.error("Failed to delete lead")
    } else {
      toast.success("Lead deleted successfully")
      router.refresh()
    }
  }

  if (leads.length === 0) {
    return (
      <div className="bg-background border border-border rounded-xl p-12 text-center">
        <Inbox className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No leads found</h3>
        <p className="text-muted-foreground">When customers submit inquiries, they will appear here.</p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-background border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead, index) => (
              <motion.tr
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{lead.name}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-[200px]">{lead.subject}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${lead.email}`}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors"
                      title={lead.email}
                    >
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </a>
                    <a
                      href={`tel:${lead.phone}`}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors"
                      title={lead.phone}
                    >
                      <Phone className="w-4 h-4 text-muted-foreground" />
                    </a>
                    <a
                      href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=Hi ${lead.name}, thank you for contacting TourToHimachal!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{serviceLabels[lead.service_type] || lead.service_type}</Badge>
                </TableCell>
                <TableCell>
                  <Select
                    value={lead.status}
                    onValueChange={(value) => updateLeadStatus(lead.id, value)}
                    disabled={isUpdating}
                  >
                    <SelectTrigger className={`w-[120px] h-8 text-xs ${statusColors[lead.status]}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="booked">Booked</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(lead.created_at), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{lead.reference_number}</code>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedLead(lead)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => deleteLead(lead.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Lead Details Modal */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>Reference: {selectedLead?.reference_number}</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedLead.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedLead.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service Type</p>
                  <p className="font-medium capitalize">{selectedLead.service_type}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subject</p>
                <p className="font-medium">{selectedLead.subject}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Message</p>
                <p className="text-foreground whitespace-pre-wrap bg-muted p-3 rounded-lg text-sm">
                  {selectedLead.message}
                </p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button asChild className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90">
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}?text=Hi ${selectedLead.name}, thank you for contacting TourToHimachal regarding your ${selectedLead.service_type} inquiry!`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <a href={`mailto:${selectedLead.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

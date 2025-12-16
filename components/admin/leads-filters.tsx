"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LeadsFiltersProps {
  currentStatus?: string
  currentType?: string
}

export function LeadsFilters({ currentStatus = "all", currentType = "all" }: LeadsFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`/admin/leads?${params.toString()}`)
  }

  const handleExport = () => {
    // Create CSV export
    const params = new URLSearchParams(searchParams.toString())
    window.open(`/api/admin/leads/export?${params.toString()}`, "_blank")
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-background p-4 rounded-xl border border-border">
      <div className="flex items-center gap-3">
        <Filter className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Filters:</span>

        <Select value={currentStatus} onValueChange={(value) => updateFilter("status", value)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={currentType} onValueChange={(value) => updateFilter("type", value)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="package">Package</SelectItem>
            <SelectItem value="taxi">Taxi</SelectItem>
            <SelectItem value="enquiry">Enquiry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" onClick={handleExport} className="gap-2 bg-transparent">
        <Download className="w-4 h-4" />
        Export CSV
      </Button>
    </div>
  )
}

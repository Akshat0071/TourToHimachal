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
    <div className="flex flex-col gap-3 bg-background p-3 sm:p-4 rounded-xl border border-border">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-muted-foreground shrink-0" />
        <span className="text-xs sm:text-sm font-medium text-foreground">Filters:</span>
        {/* Mobile: Export button aligned with filter label */}
        <Button
          variant="outline"
          onClick={handleExport}
          className="gap-2 bg-transparent text-xs sm:text-sm ml-auto whitespace-nowrap sm:hidden"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </Button>
      </div>
      
      {/* Controls row: All Status | All Types | Export CSV on one line with spacing */}
      <div className="flex flex-row flex-wrap items-center gap-2">
        <Select value={currentStatus} onValueChange={(value) => updateFilter("status", value)}>
          <SelectTrigger className="w-36 text-xs sm:text-sm">
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
          <SelectTrigger className="w-36 text-xs sm:text-sm">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="package">Package</SelectItem>
            <SelectItem value="taxi">Taxi</SelectItem>
            <SelectItem value="enquiry">Enquiry</SelectItem>
          </SelectContent>
        </Select>

        {/* Desktop/Tablet: Export button on controls row, right-aligned */}
        <Button
          variant="outline"
          onClick={handleExport}
          className="hidden sm:inline-flex gap-2 bg-transparent text-xs sm:text-sm ml-auto whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </Button>
      </div>
    </div>
  )
}

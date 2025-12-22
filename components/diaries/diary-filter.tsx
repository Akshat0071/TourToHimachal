"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { diaryTags, diaryMonths, diaryRegions } from "@/data/diaries"

interface DiaryFilterProps {
  selectedRegion: string
  selectedTags: string[]
  selectedMonth: string | null
  searchQuery: string
  onRegionChange: (region: string) => void
  onTagChange: (tags: string[]) => void
  onMonthChange: (month: string | null) => void
  onSearchChange: (query: string) => void
  onClearFilters: () => void
}

export function DiaryFilter({
  selectedRegion,
  selectedTags,
  selectedMonth,
  searchQuery,
  onRegionChange,
  onTagChange,
  onMonthChange,
  onSearchChange,
  onClearFilters,
}: DiaryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Local state for deferred filtering
  const [localRegion, setLocalRegion] = useState<string>(selectedRegion)
  const [localTags, setLocalTags] = useState<string[]>(selectedTags)
  const [localMonth, setLocalMonth] = useState<string | null>(selectedMonth)

  // Sync local state when props change (external update or clear)
  useEffect(() => {
    setLocalRegion(selectedRegion)
    setLocalTags(selectedTags)
    setLocalMonth(selectedMonth)
  }, [selectedRegion, selectedTags, selectedMonth])

  const hasActiveFilters =
    selectedRegion !== "All" ||
    selectedTags.length > 0 ||
    (selectedMonth !== null && selectedMonth !== "All") ||
    !!searchQuery

  const handleTagToggle = (tag: string) => {
    if (tag === "All") {
      setLocalTags([])
      return
    }

    if (localTags.includes(tag)) {
      setLocalTags(localTags.filter((t) => t !== tag))
    } else {
      setLocalTags([...localTags, tag])
    }
  }

  const applyFilters = () => {
    onRegionChange(localRegion)
    onTagChange(localTags)
    onMonthChange(localMonth)
    setIsExpanded(false)
  }

  const handleClear = () => {
    onClearFilters()
    // Local state will be synced via useEffect
  }

  return (
    <div className="bg-gradient-to-r from-[oklch(0.99_0.02_85)] to-[oklch(0.98_0.025_70)] border-2 border-saffron/20 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-lg">
      <div className="hidden lg:block mb-4">
        <h3 className="text-xl font-serif font-bold text-foreground">Filter & Search</h3>
        <p className="text-sm text-muted-foreground">Find your perfect story</p>
      </div>

      {/* Unified Search + Filter Toggle */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-saffron" />
          <Input
            type="text"
            placeholder="Search diaries..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 sm:pl-10 bg-white border-2 border-saffron/20 focus:border-saffron rounded-full lg:rounded-xl h-10 sm:h-11 md:h-12 text-xs sm:text-sm md:text-base pr-12 w-full"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          className="lg:w-auto w-full relative rounded-full lg:rounded-xl border-2 border-saffron/30 bg-white hover:bg-saffron/10 h-10 sm:h-11 md:h-12 px-3 sm:px-4 gap-1.5 sm:gap-2 flex justify-center items-center"
        >
          <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-saffron" />
          <span className="text-xs sm:text-sm font-medium text-foreground">Filters</span>
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-saffron to-sunset-orange text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center">
              !
            </span>
          )}
        </Button>
      </div>

      {/* Collapsible filters (Unified) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-saffron/20 space-y-4">
              {/* Region */}
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-golden-yellow/20">
                <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3">Region</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={localRegion === "All" ? "default" : "outline"}
                    className={`cursor-pointer text-xs hover:bg-mountain-blue/10 ${localRegion === "All" ? "bg-mountain-blue text-white hover:bg-mountain-blue" : ""
                      }`}
                    onClick={() => setLocalRegion("All")}
                  >
                    All
                  </Badge>
                  {diaryRegions.map((region) => (
                    <Badge
                      key={region}
                      variant={localRegion === region ? "default" : "outline"}
                      className={`cursor-pointer text-xs hover:bg-mountain-blue/10 ${localRegion === region ? "bg-mountain-blue text-white hover:bg-mountain-blue" : ""
                        }`}
                      onClick={() => setLocalRegion(localRegion === region ? "All" : region)}
                    >
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-golden-yellow/20">
                <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={localTags.length === 0 ? "default" : "outline"}
                    className={`cursor-pointer text-xs hover:bg-mountain-blue/10 ${localTags.length === 0 ? "bg-mountain-blue text-white hover:bg-mountain-blue" : ""
                      }`}
                    onClick={() => handleTagToggle("All")}
                  >
                    All
                  </Badge>
                  {diaryTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={localTags.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer capitalize text-xs hover:bg-mountain-blue/10 ${localTags.includes(tag) ? "bg-mountain-blue text-white hover:bg-mountain-blue" : ""
                        }`}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Season */}
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-golden-yellow/20">
                <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3">Season</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={!localMonth || localMonth === "All" ? "default" : "outline"}
                    className={`cursor-pointer text-xs hover:bg-mountain-blue/10 ${!localMonth || localMonth === "All" ? "bg-mountain-blue text-white hover:bg-mountain-blue" : ""
                      }`}
                    onClick={() => setLocalMonth(null)}
                  >
                    All
                  </Badge>
                  {diaryMonths.map((month) => (
                    <Badge
                      key={month}
                      variant={localMonth === month ? "default" : "outline"}
                      className={`cursor-pointer text-xs hover:bg-mountain-blue/10 ${localMonth === month ? "bg-mountain-blue text-white hover:bg-mountain-blue" : ""
                        }`}
                      onClick={() => setLocalMonth(localMonth === month ? null : month)}
                    >
                      {month}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={applyFilters}
                  variant="gradient"
                  className="flex-1 rounded-xl h-10 sm:h-11 text-sm shadow-md hover:shadow-lg"
                >
                  Apply Filters
                </Button>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="rounded-xl border-2 border-temple-red/30 text-temple-red hover:bg-temple-red/10 h-10 sm:h-11 px-4"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

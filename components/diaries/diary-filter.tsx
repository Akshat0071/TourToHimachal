"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { diaryTags, diaryMonths } from "@/data/diaries"

interface DiaryFilterProps {
  selectedTags: string[]
  selectedMonth: string | null
  selectedAuthor: string | null
  searchQuery: string
  onTagChange: (tags: string[]) => void
  onMonthChange: (month: string | null) => void
  onAuthorChange: (author: string | null) => void
  onSearchChange: (query: string) => void
  onClearFilters: () => void
}

export function DiaryFilter({
  selectedTags,
  selectedMonth,
  selectedAuthor,
  searchQuery,
  onTagChange,
  onMonthChange,
  onAuthorChange,
  onSearchChange,
  onClearFilters,
}: DiaryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const hasActiveFilters = selectedTags.length > 0 || selectedMonth || selectedAuthor || searchQuery

  const activeFilterCount = selectedTags.length + (selectedMonth ? 1 : 0) + (selectedAuthor ? 1 : 0)

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag))
    } else {
      onTagChange([...selectedTags, tag])
    }
  }

  return (
    <div className="bg-gradient-to-r from-[oklch(0.99_0.02_85)] to-[oklch(0.98_0.025_70)] border-2 border-saffron/20 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-lg">
      {/* Mobile/Tablet: Search + Filter Toggle */}
      <div className="lg:hidden flex gap-2 sm:gap-3 items-center">
        {isSearchOpen ? (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-saffron" />
            <Input
              type="text"
              placeholder="Search diaries..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 sm:pl-10 bg-white border-2 border-saffron/20 focus:border-saffron rounded-full h-10 sm:h-11 md:h-12 text-xs sm:text-sm md:text-base pr-12"
              autoFocus
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setIsSearchOpen(true)}
            variant="outline"
            className="rounded-full border-2 border-saffron/30 bg-white hover:bg-saffron/10 h-10 sm:h-11 md:h-12 px-3 sm:px-4 gap-1.5 sm:gap-2"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-saffron" />
            <span className="text-xs sm:text-sm font-medium text-foreground">Search</span>
          </Button>
        )}

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          className="relative rounded-full border-2 border-saffron/30 bg-white hover:bg-saffron/10 h-10 sm:h-11 md:h-12 px-3 sm:px-4 gap-1.5 sm:gap-2"
        >
          <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-saffron" />
          <span className="text-xs sm:text-sm font-medium text-foreground">Filters</span>
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-saffron to-sunset-orange text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Desktop: Always-visible sidebar title */}
      <div className="hidden lg:block mb-6">
        <h3 className="text-xl font-serif font-bold text-foreground mb-2">Filter & Search</h3>
        <p className="text-sm text-muted-foreground">Find your perfect story</p>
      </div>

      {/* Desktop: Always visible search */}
      <div className="hidden lg:block mb-6">
        <label className="text-sm font-semibold text-foreground mb-3 block">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-saffron" />
          <Input
            type="text"
            placeholder="Search diaries..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white border-2 border-saffron/20 focus:border-saffron rounded-xl h-11 text-sm pr-10"
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
      </div>

      {/* Mobile: Collapsible filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-saffron/20 space-y-4">
              {/* Tags */}
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-golden-yellow/20">
                <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {diaryTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer capitalize text-xs ${
                        selectedTags.includes(tag) ? "bg-mountain-blue text-white" : ""
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Month */}
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-golden-yellow/20">
                <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3">Month</h4>
                <div className="flex flex-wrap gap-2">
                  {diaryMonths.map((month) => (
                    <Badge
                      key={month}
                      variant={selectedMonth === month ? "default" : "outline"}
                      className={`cursor-pointer text-xs ${selectedMonth === month ? "bg-mountain-blue text-white" : ""}`}
                      onClick={() => onMonthChange(selectedMonth === month ? null : month)}
                    >
                      {month}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Author */}
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-golden-yellow/20">
                <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3">Author</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(diaryAuthors).map(([key, author]) => (
                    <Badge
                      key={key}
                      variant={selectedAuthor === key ? "default" : "outline"}
                      className={`cursor-pointer text-xs ${selectedAuthor === key ? "bg-mountain-blue text-white" : ""}`}
                      onClick={() => onAuthorChange(selectedAuthor === key ? null : key)}
                    >
                      {author.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsExpanded(false)}
                  variant="gradient"
                  className="flex-1 rounded-xl h-10 text-sm"
                >
                  Apply
                </Button>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={onClearFilters}
                    className="rounded-xl border-2 border-temple-red/30 text-temple-red hover:bg-temple-red/10 h-10 px-3"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: Always-visible filters */}
      <div className="hidden lg:block space-y-5">
        {/* Tags */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground block">Tags</label>
          <div className="flex flex-wrap gap-2">
            {diaryTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer capitalize text-sm ${
                  selectedTags.includes(tag) ? "bg-mountain-blue text-white hover:bg-mountain-blue/90" : "hover:bg-muted"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Season */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground block">Season</label>
          <div className="flex flex-wrap gap-2">
            {diaryMonths.map((month) => (
              <Badge
                key={month}
                variant={selectedMonth === month ? "default" : "outline"}
                className={`cursor-pointer text-sm ${
                  selectedMonth === month ? "bg-mountain-blue text-white hover:bg-mountain-blue/90" : "hover:bg-muted"
                }`}
                onClick={() => onMonthChange(selectedMonth === month ? null : month)}
              >
                {month}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full rounded-xl border-2 border-temple-red/30 text-temple-red hover:bg-temple-red/10 h-11 text-sm font-semibold"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  )
}

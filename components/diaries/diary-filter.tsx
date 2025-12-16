"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { diaryTags, diaryMonths, diaryAuthors } from "@/data/diaries"

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

  const hasActiveFilters = selectedTags.length > 0 || selectedMonth || selectedAuthor || searchQuery

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag))
    } else {
      onTagChange([...selectedTags, tag])
    }
  }

  return (
    <div className="bg-card rounded-xl shadow-md p-4 md:p-6 mb-8">
      {/* Search and Toggle */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search diaries..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge className="ml-1 bg-saffron text-white h-5 w-5 p-0 flex items-center justify-center text-xs">
                {selectedTags.length + (selectedMonth ? 1 : 0) + (selectedAuthor ? 1 : 0)}
              </Badge>
            )}
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" onClick={onClearFilters} className="text-muted-foreground">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4 border-t space-y-4">
          {/* Tags */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {diaryTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer capitalize ${
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
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Month</h4>
            <div className="flex flex-wrap gap-2">
              {diaryMonths.map((month) => (
                <Badge
                  key={month}
                  variant={selectedMonth === month ? "default" : "outline"}
                  className={`cursor-pointer ${selectedMonth === month ? "bg-mountain-blue text-white" : ""}`}
                  onClick={() => onMonthChange(selectedMonth === month ? null : month)}
                >
                  {month}
                </Badge>
              ))}
            </div>
          </div>

          {/* Author */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Author</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(diaryAuthors).map(([key, author]) => (
                <Badge
                  key={key}
                  variant={selectedAuthor === key ? "default" : "outline"}
                  className={`cursor-pointer ${selectedAuthor === key ? "bg-mountain-blue text-white" : ""}`}
                  onClick={() => onAuthorChange(selectedAuthor === key ? null : key)}
                >
                  {author.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

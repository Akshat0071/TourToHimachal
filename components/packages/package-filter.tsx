"use client"

import { useState } from "react"
import { Search, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { regions, durations, themes } from "@/data/packages"
import { motion, AnimatePresence } from "framer-motion"

interface PackageFilterProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedRegion: string
  setSelectedRegion: (value: string) => void
  selectedDuration: string
  setSelectedDuration: (value: string) => void
  selectedTheme: string
  setSelectedTheme: (value: string) => void
  selectedPrice: string
  setSelectedPrice: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function PackageFilter({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedDuration,
  setSelectedDuration,
  selectedTheme,
  setSelectedTheme,
  selectedPrice,
  setSelectedPrice,
  sortBy,
  setSortBy,
  onClearFilters,
  hasActiveFilters,
}: PackageFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState(50000)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handlePriceChange = (value: number) => {
    setPriceRange(value)
    if (value < 10000) {
      setSelectedPrice("Under ₹10,000")
    } else if (value <= 25000) {
      setSelectedPrice("₹10,000 - ₹25,000")
    } else if (value <= 50000) {
      setSelectedPrice("₹25,000 - ₹50,000")
    } else {
      setSelectedPrice("Above ₹50,000")
    }
  }

  // Count active filters
  const activeFilterCount = [
    selectedRegion !== "All",
    selectedDuration !== "All",
    selectedTheme !== "All",
    selectedPrice !== "All",
  ].filter(Boolean).length

  return (
    <div className="bg-gradient-to-r from-[oklch(0.99_0.02_85)] to-[oklch(0.98_0.025_70)] border-2 border-saffron/20 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-lg">
      {/* Mobile/Tablet: Search + Filter Toggle */}
      <div className="lg:hidden flex gap-2 sm:gap-3 items-center">
        {isSearchOpen ? (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-saffron" />
            <Input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 sm:pl-10 bg-white border-2 border-saffron/20 focus:border-saffron rounded-full h-10 sm:h-11 md:h-12 text-xs sm:text-sm md:text-base pr-12"
              autoFocus
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
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
          onClick={() => setIsFilterOpen(!isFilterOpen)}
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
        <p className="text-sm text-muted-foreground">Find your perfect package</p>
      </div>

      {/* Desktop: Always visible search */}
      <div className="hidden lg:block mb-6">
        <label className="text-sm font-semibold text-foreground mb-3 block">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-saffron" />
          <Input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-2 border-saffron/20 focus:border-saffron rounded-xl h-11 text-sm pr-10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
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
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-saffron/20 space-y-3 sm:space-y-4">
              {/* Price Range Slider */}
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-golden-yellow/20">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <label className="text-xs sm:text-sm font-semibold text-foreground">Price Range</label>
                  <span className="text-xs sm:text-sm font-bold text-saffron">₹{priceRange.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={priceRange}
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  className="price-slider w-full"
                />
                <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2">
                  <span>₹5,000</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Region
                  </label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="rounded-lg sm:rounded-xl border-2 border-mountain-blue/20 bg-white h-9 sm:h-10 md:h-11 text-xs sm:text-sm">
                      <SelectValue placeholder="All Regions" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Duration
                  </label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger className="rounded-lg sm:rounded-xl border-2 border-forest-green/20 bg-white h-9 sm:h-10 md:h-11 text-xs sm:text-sm">
                      <SelectValue placeholder="Any Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration} value={duration}>
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Theme
                  </label>
                  <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                    <SelectTrigger className="rounded-lg sm:rounded-xl border-2 border-saffron/20 bg-white h-9 sm:h-10 md:h-11 text-xs sm:text-sm">
                      <SelectValue placeholder="All Themes" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme} value={theme}>
                          {theme}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="rounded-lg sm:rounded-xl border-2 border-sunset-orange/20 bg-white h-9 sm:h-10 md:h-11 text-xs sm:text-sm">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Popular</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1 sm:space-y-2 col-span-2">
                  <label className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsFilterOpen(false)}
                      variant="gradient"
                      className="flex-1 rounded-lg sm:rounded-xl h-9 sm:h-10 md:h-11 text-xs sm:text-sm"
                    >
                      Apply
                    </Button>
                    {hasActiveFilters && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          onClearFilters()
                          setPriceRange(50000)
                        }}
                        className="rounded-lg sm:rounded-xl border-2 border-temple-red/30 text-temple-red hover:bg-temple-red/10 h-9 sm:h-10 md:h-11 px-3"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: Always-visible filters */}
      <div className="hidden lg:block space-y-5">
        {/* Price Range */}
        <div className="bg-white p-5 rounded-2xl border border-golden-yellow/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-foreground">Price Range</label>
            <span className="text-sm font-bold text-saffron">₹{priceRange.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="5000"
            max="100000"
            step="5000"
            value={priceRange}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="price-slider w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-3">
            <span>₹5,000</span>
            <span>₹1,00,000</span>
          </div>
        </div>

        {/* Region & Duration - Horizontal */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground block">Region</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="rounded-xl border-2 border-mountain-blue/20 bg-white h-11 text-sm">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground block">Duration</label>
            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger className="rounded-xl border-2 border-forest-green/20 bg-white h-11 text-sm">
                <SelectValue placeholder="Any Duration" />
              </SelectTrigger>
              <SelectContent>
                {durations.map((duration) => (
                  <SelectItem key={duration} value={duration}>
                    {duration}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Theme & Sort By - Horizontal */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground block">Theme</label>
            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
              <SelectTrigger className="rounded-xl border-2 border-saffron/20 bg-white h-11 text-sm">
                <SelectValue placeholder="All Themes" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme) => (
                  <SelectItem key={theme} value={theme}>
                    {theme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground block">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="rounded-xl border-2 border-sunset-orange/20 bg-white h-11 text-sm">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={() => {
              onClearFilters()
              setPriceRange(50000)
            }}
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

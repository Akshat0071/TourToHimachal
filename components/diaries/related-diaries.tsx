"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DiaryCard } from "./diary-card"
import { fadeInUp } from "@/lib/animation-variants"

interface Diary {
  slug: string
  title: string
  excerpt?: string
  cover_image?: string
  gallery?: string[]
  author_name?: string
  author_avatar?: string
  destination?: string
  travel_date?: string
  published_at?: string
}

interface RelatedDiariesProps {
  diaries: Diary[]
}

export function RelatedDiaries({ diaries }: RelatedDiariesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = 400
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  if (diaries.length === 0) return null

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Read Next</h2>
        <div className="hidden md:flex gap-2">
          <Button variant="outline" size="icon" onClick={() => scroll("left")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll("right")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {diaries.map((diary) => (
          <div key={diary.slug} className="flex-shrink-0 w-[320px]" style={{ scrollSnapAlign: "start" }}>
            <DiaryCard diary={diary} />
          </div>
        ))}
      </div>
    </motion.section>
  )
}

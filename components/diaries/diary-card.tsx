"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Calendar, ArrowRight, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cardHover, fadeInUp } from "@/lib/animation-variants"

interface Diary {
  id?: string
  slug: string
  title: string
  excerpt?: string
  content?: string
  cover_image?: string
  coverImage?: string // Support both field names
  author_name?: string
  author_avatar?: string
  author?: { name: string; avatar: string } // Support old format
  destination?: string
  travel_date?: string
  published_at?: string
  date?: string // Support both field names
  tags?: string[]
  readTime?: number
  gallery?: string[]
}

interface DiaryCardProps {
  diary: Diary
  featured?: boolean
}

export function DiaryCard({ diary, featured = false }: DiaryCardProps) {
  const dateString = diary.published_at || diary.travel_date || diary.date
  const formattedDate = dateString
    ? new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : ""

  const imageUrl =
    diary.gallery?.[0] || diary.cover_image || diary.coverImage || `/placeholder.svg?height=400&width=600&query=${diary.title}`
  const authorName = diary.author_name || diary.author?.name || "Traveler"
  const authorAvatar = diary.author_avatar || diary.author?.avatar || "/diverse-avatars.png"

  if (featured) {
    return (
      <motion.article variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Link href={`/diaries/${diary.slug}`}>
          <motion.div
            className="group relative bg-card rounded-2xl overflow-hidden shadow-lg"
            variants={cardHover}
            initial="rest"
            whileHover="hover"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={diary.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-saffron text-white">Featured Story</Badge>
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                {diary.destination && (
                  <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{diary.destination}</span>
                  </div>
                )}
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3 group-hover:text-mountain-blue transition-colors">
                  {diary.title}
                </h2>
                {diary.excerpt && <p className="text-muted-foreground mb-4 leading-relaxed">{diary.excerpt}</p>}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  {diary.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {diary.readTime} min read
                    </span>
                  )}
                  {formattedDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formattedDate}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src={authorAvatar || "/placeholder.svg"}
                    alt={authorName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="font-medium text-foreground">{authorName}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article variants={fadeInUp}>
      <Link href={`/diaries/${diary.slug}`}>
        <motion.div
          className="group bg-card rounded-xl overflow-hidden shadow-md h-full"
          variants={cardHover}
          initial="rest"
          whileHover="hover"
        >
          <div className="relative aspect-[16/10]">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={diary.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              {diary.destination && (
                <Badge className="bg-white/20 backdrop-blur-sm text-white text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  {diary.destination}
                </Badge>
              )}
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-mountain-blue transition-colors line-clamp-2">
              {diary.title}
            </h3>
            {diary.excerpt && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{diary.excerpt}</p>}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={authorAvatar || "/placeholder.svg"}
                  alt={authorName}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                <span className="text-sm text-muted-foreground">{authorName}</span>
              </div>
              {formattedDate && (
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{formattedDate}</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center text-mountain-blue text-sm font-medium group-hover:gap-2 transition-all">
              Read More <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  )
}

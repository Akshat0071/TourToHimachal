"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Calendar, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cardHover, fadeInUp } from "@/lib/animation-variants"

interface BlogPost {
  id?: string
  slug: string
  title: string
  excerpt?: string
  cover_image?: string
  featuredImage?: string
  gallery?: string[]
  author?: string
  category?: string
  tags?: string[]
  published_at?: string
  date?: string
  readTime?: number
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const dateString = post.published_at || post.date
  const formattedDate = dateString
    ? new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : ""

  const imageUrl =
    post.gallery?.[0] ||
    post.cover_image ||
    post.featuredImage ||
    `/placeholder.svg?height=400&width=600&query=${post.title}`

  if (featured) {
    return (
      <motion.article variants={fadeInUp}>
        <Link href={`/blog/${post.slug}`}>
          <motion.div
            className="group relative rounded-2xl md:rounded-3xl overflow-hidden"
            variants={cardHover}
            initial="rest"
            whileHover="hover"
          >
            <div className="relative aspect-video">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
              {post.category && (
                <Badge className="bg-gradient-to-r from-saffron to-sunset-orange text-white mb-2 md:mb-3 text-xs">
                  {post.category}
                </Badge>
              )}
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white mb-2 group-hover:text-saffron transition-colors line-clamp-2">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-white/80 mb-3 md:mb-4 line-clamp-2 text-sm md:text-base hidden sm:block">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center gap-3 md:gap-4 text-white/70 text-xs md:text-sm">
                {post.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 md:h-4 md:w-4" />
                    {post.readTime} min
                  </span>
                )}
                {formattedDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                    {formattedDate}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article variants={fadeInUp}>
      <Link href={`/blog/${post.slug}`}>
        <motion.div
          className="group bg-gradient-to-br from-[oklch(0.99_0.015_220)] to-[oklch(0.97_0.025_200)] rounded-2xl md:rounded-3xl overflow-hidden shadow-md h-full flex flex-col border-2 border-mountain-blue/10 hover:border-mountain-blue/30 hover:shadow-xl transition-all duration-300"
          variants={cardHover}
          initial="rest"
          whileHover="hover"
        >
          <div className="relative aspect-[16/10]">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {post.category && (
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-white/95 text-mountain-blue font-semibold text-xs">
                  {post.category}
                </Badge>
              </div>
            )}
          </div>
          <div className="p-4 md:p-5 flex flex-col flex-1 bg-gradient-to-b from-transparent to-white/50">
            <h3 className="text-base md:text-lg font-serif font-bold text-foreground mb-2 group-hover:text-mountain-blue transition-colors line-clamp-2">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2 flex-1">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 md:gap-3 text-xs text-muted-foreground">
                {post.readTime && (
                  <span className="flex items-center gap-1 bg-mountain-blue/10 px-2 py-1 rounded-full">
                    <Clock className="h-3 w-3" />
                    {post.readTime} min
                  </span>
                )}
                {formattedDate && <span>{formattedDate}</span>}
              </div>
              <span className="text-mountain-blue text-xs md:text-sm font-medium flex items-center group-hover:gap-1 transition-all">
                Read <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-1" />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cardHover, fadeInUp } from "@/lib/animation-variants"
import { generateWhatsAppLink } from "@/lib/whatsapp"

interface Package {
  id: string
  title: string
  slug: string
  description?: string
  short_description?: string
  price: number
  original_price?: number
  duration: string
  highlights?: string[]
  inclusions?: string[]
  exclusions?: string[]
  category?: string
  images?: string[]
  is_active: boolean
  is_featured: boolean
}

interface PackageCardProps {
  pkg: Package
}

export function PackageCard({ pkg }: PackageCardProps) {
  const whatsappLink = generateWhatsAppLink({ packageName: pkg.title })

  // Calculate discount percentage
  const discountPercent =
    pkg.original_price && pkg.original_price > pkg.price
      ? Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100)
      : 0

  return (
    <motion.div
      variants={fadeInUp}
      initial="rest"
      whileHover="hover"
      className="group bg-gradient-to-br from-[oklch(0.99_0.015_85)] to-[oklch(0.97_0.025_70)] rounded-2xl md:rounded-3xl overflow-hidden shadow-md border-2 border-saffron/10 hover:border-saffron/30 hover:shadow-xl transition-all duration-300"
    >
      <motion.div variants={cardHover}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={pkg.images?.[0] || `/placeholder.svg?height=400&width=600&query=${pkg.title}`}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {pkg.is_featured && (
              <Badge className="bg-gradient-to-r from-saffron to-sunset-orange text-white border-0 shadow-lg text-xs">
                <Star className="h-3 w-3 mr-1 fill-white" />
                Featured
              </Badge>
            )}
            {discountPercent > 0 && (
              <Badge className="bg-gradient-to-r from-forest-green to-mountain-blue text-white border-0 shadow-lg text-xs">
                {discountPercent}% OFF
              </Badge>
            )}
          </div>

          {pkg.category && (
            <Badge className="absolute top-3 right-3 bg-white/90 text-mountain-blue border-0 shadow-md text-xs">
              {pkg.category}
            </Badge>
          )}

          {/* Price tag at bottom of image */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-lg md:text-xl font-bold text-saffron">₹{pkg.price?.toLocaleString()}</span>
            {pkg.original_price && pkg.original_price > pkg.price && (
              <span className="text-muted-foreground line-through text-xs ml-1.5">
                ₹{pkg.original_price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-3 text-muted-foreground text-xs md:text-sm mb-2">
            <span className="flex items-center gap-1 bg-mountain-blue/10 px-2 py-1 rounded-full">
              <Clock className="h-3 w-3 md:h-4 md:w-4 text-mountain-blue" />
              {pkg.duration}
            </span>
            <span className="flex items-center gap-1 bg-forest-green/10 px-2 py-1 rounded-full">
              <MapPin className="h-3 w-3 md:h-4 md:w-4 text-forest-green" />
              Himachal
            </span>
          </div>

          <h3 className="font-serif text-base md:text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-saffron transition-colors">
            {pkg.title}
          </h3>

          <p className="text-muted-foreground text-xs md:text-sm mb-4 line-clamp-2">
            {pkg.short_description || pkg.description}
          </p>

          <p className="text-xs text-muted-foreground mb-3">per person</p>

          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              className="flex-1 bg-white/50 rounded-full border-2 text-xs md:text-sm h-9 md:h-10"
            >
              <Link href={`/packages/${pkg.slug}`}>View Details</Link>
            </Button>
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-forest-green to-mountain-blue hover:from-forest-green/90 hover:to-mountain-blue/90 text-white rounded-full text-xs md:text-sm h-9 md:h-10"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

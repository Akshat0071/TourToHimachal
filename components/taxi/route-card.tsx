"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp } from "@/lib/animation-variants"
import { generateWhatsAppLink } from "@/lib/whatsapp"

interface Route {
  id: string
  from_location: string
  to_location: string
  distance_km: number
  estimated_time: string
  base_fare: number
  is_active: boolean
}

interface RouteCardProps {
  route: Route
}

export function RouteCard({ route }: RouteCardProps) {
  const whatsappLink = generateWhatsAppLink({
    route: `${route.from_location} to ${route.to_location}`,
  })

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">{route.from_location}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-saffron" />
            <span className="font-medium">{route.to_location}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span>{route.distance_km} km</span>
        <span className="text-border">|</span>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{route.estimated_time}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-muted-foreground">Starting from</span>
          <p className="text-xl font-bold text-primary">₹{route.base_fare?.toLocaleString()}</p>
        </div>
        <Button asChild className="bg-forest-green hover:bg-forest-green/90 text-white">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            Book This Route
          </a>
        </Button>
      </div>
    </motion.div>
  )
}

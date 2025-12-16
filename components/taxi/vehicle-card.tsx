"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Users, Briefcase, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cardHover, fadeInUp } from "@/lib/animation-variants"

interface Vehicle {
  id: string
  name: string
  type: string
  capacity: number
  luggage_capacity?: number
  base_fare: number
  per_km_rate: number
  features?: string[]
  image_url?: string
  is_available: boolean
}

interface VehicleCardProps {
  vehicle: Vehicle
  isSelected: boolean
  onSelect: () => void
}

export function VehicleCard({ vehicle, isSelected, onSelect }: VehicleCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="rest"
      whileHover="hover"
      className={`bg-card rounded-xl overflow-hidden border-2 transition-colors ${
        isSelected ? "border-primary shadow-lg" : "border-border"
      }`}
    >
      <motion.div variants={cardHover}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={vehicle.image_url || `/placeholder.svg?height=200&width=320&query=${vehicle.name} car`}
            alt={vehicle.name}
            fill
            className="object-cover"
          />
          {isSelected && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Check className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-foreground mb-1">{vehicle.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{vehicle.type}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm">{vehicle.capacity} pax</span>
            </div>
            {vehicle.luggage_capacity && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm">{vehicle.luggage_capacity} bags</span>
              </div>
            )}
          </div>

          {vehicle.features && vehicle.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {vehicle.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                  {feature}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary">₹{vehicle.per_km_rate}</span>
              <span className="text-muted-foreground text-sm">/km</span>
            </div>
            <Button onClick={onSelect} variant={isSelected ? "default" : "outline"} size="sm">
              {isSelected ? "Selected" : "Select"}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Shield, Sparkles, MapPin, Headphones, Clock, Receipt } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/animation-variants"
import { safetyFeatures } from "@/data/taxis"

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-6 w-6" />,
  sparkles: <Sparkles className="h-6 w-6" />,
  mapPin: <MapPin className="h-6 w-6" />,
  headphones: <Headphones className="h-6 w-6" />,
  clock: <Clock className="h-6 w-6" />,
  receipt: <Receipt className="h-6 w-6" />,
}

export function SafetyFeatures() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
    >
      {safetyFeatures.map((feature, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
            {iconMap[feature.icon]}
          </div>
          <h4 className="font-medium text-foreground text-sm mb-1">{feature.title}</h4>
          <p className="text-xs text-muted-foreground">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

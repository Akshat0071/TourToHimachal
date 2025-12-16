"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin } from "lucide-react"
import { accordionContent } from "@/lib/animation-variants"

interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
}

interface ItineraryAccordionProps {
  itinerary: ItineraryDay[]
}

export function ItineraryAccordion({ itinerary }: ItineraryAccordionProps) {
  const [openDay, setOpenDay] = useState<number | null>(1)

  const toggleDay = (day: number) => {
    setOpenDay(openDay === day ? null : day)
  }

  return (
    <div className="space-y-3">
      {itinerary.map((item) => (
        <div key={item.day} className="border border-border rounded-xl overflow-hidden bg-card">
          <button
            onClick={() => toggleDay(item.day)}
            className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-muted/50 transition-colors"
            aria-expanded={openDay === item.day}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">D{item.day}</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">Day {item.day}</p>
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform ${
                openDay === item.day ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {openDay === item.day && (
              <motion.div
                variants={accordionContent}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="overflow-hidden"
              >
                <div className="px-4 md:px-5 pb-5 pt-0">
                  <div className="pl-16">
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.activities.map((activity, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                        >
                          <MapPin className="h-3 w-3" />
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

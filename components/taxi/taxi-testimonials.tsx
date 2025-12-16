"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp } from "@/lib/animation-variants"
import { taxiTestimonials } from "@/data/taxis"

export function TaxiTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-serif font-bold text-foreground">What Our Riders Say</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
        {taxiTestimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex-shrink-0 w-[320px] bg-card border border-border rounded-xl p-6"
          >
            <Quote className="h-8 w-8 text-saffron/30 mb-4" />
            <p className="text-muted-foreground mb-4 leading-relaxed">{testimonial.text}</p>
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                />
              ))}
            </div>
            <div>
              <p className="font-medium text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.location} - {testimonial.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

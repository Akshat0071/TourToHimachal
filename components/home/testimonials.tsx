"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/animation-variants"

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    image: "/indian-woman-portrait.png",
    rating: 5,
    review:
      "Amazing experience! The taxi service was punctual and the driver knew all the scenic routes. Our Manali trip was unforgettable.",
  },
  {
    name: "Rahul Verma",
    city: "Mumbai",
    image: "/indian-man-portrait.png",
    rating: 5,
    review:
      "Booked the spiritual tour package for my parents. They were so happy with the arrangements. Highly recommended!",
  },
  {
    name: "Anita Gupta",
    city: "Bangalore",
    image: "/indian-woman-smiling.png",
    rating: 5,
    review: "Best honeymoon package! Everything was perfectly planned. The Shimla-Manali circuit was breathtaking.",
  },
  {
    name: "Vikram Singh",
    city: "Chandigarh",
    image: "/indian-man-smiling.png",
    rating: 5,
    review: "The Spiti Valley trip was life-changing. Great local knowledge and support throughout the journey.",
  },
  {
    name: "Meera Krishnan",
    city: "Chennai",
    image: "/indian-woman-professional.png",
    rating: 5,
    review: "Fantastic family trip to Dharamshala. Kids loved every moment. Will definitely book again!",
  },
]

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-[oklch(0.96_0.03_220)] via-[oklch(0.97_0.02_200)] to-[oklch(0.98_0.025_180)] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 md:w-40 h-32 md:h-40 bg-gradient-to-br from-golden-yellow/30 to-saffron/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 md:w-60 h-48 md:h-60 bg-gradient-to-tr from-mountain-blue/20 to-forest-green/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12"
        >
          <div>
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-mountain-blue/10 rounded-full mb-3 md:mb-4"
            >
              <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-mountain-blue" />
              <span className="text-xs md:text-sm font-semibold text-mountain-blue uppercase tracking-wider">
                What Our Travelers Say
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-2 md:mt-3"
            >
              Happy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mountain-blue to-forest-green">
                Travelers
              </span>
            </motion.h2>
          </div>

          <motion.div variants={fadeInUp} className="flex gap-2 md:gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="rounded-full border-2 hover:bg-mountain-blue hover:text-white hover:border-mountain-blue disabled:opacity-30 h-10 w-10 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="rounded-full border-2 hover:bg-mountain-blue hover:text-white hover:border-mountain-blue disabled:opacity-30 h-10 w-10 md:h-12 md:w-12"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </motion.div>
        </motion.div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[400px] bg-gradient-to-br from-[oklch(0.99_0.015_85)] to-[oklch(0.97_0.025_70)] p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-lg snap-start border-2 border-saffron/20 hover:border-saffron/40 transition-all duration-300 group hover:shadow-xl"
            >
              {/* Quote icon with gradient */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-saffron/30 to-golden-yellow/30 flex items-center justify-center mb-4 md:mb-6 group-hover:from-saffron/40 group-hover:to-golden-yellow/40 transition-colors">
                <Quote className="h-5 w-5 md:h-6 md:w-6 text-saffron" />
              </div>

              <p className="text-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-lg">{testimonial.review}</p>

              <div className="flex items-center gap-3 md:gap-4">
                {/* Avatar with border */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-saffron to-sunset-orange rounded-full blur-sm opacity-50" />
                  <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground text-sm md:text-base truncate">{testimonial.name}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">{testimonial.city}</p>
                </div>

                {/* Star rating - hidden on very small screens */}
                <div className="hidden xs:flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-golden-yellow text-golden-yellow" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

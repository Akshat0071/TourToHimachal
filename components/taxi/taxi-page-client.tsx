"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, MessageCircle, Car, Calendar, Shield } from "lucide-react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { InfiniteScrollHero } from "@/components/ui/infinite-scroll-hero"
import { Button } from "@/components/ui/button"
import { VehicleCard } from "@/components/taxi/vehicle-card"
import { RouteCard } from "@/components/taxi/route-card"
import { TaxiBookingForm } from "@/components/taxi/taxi-booking-form"
import { SafetyFeatures } from "@/components/taxi/safety-features"
import { TaxiTestimonials } from "@/components/taxi/taxi-testimonials"
import { PackageFAQ } from "@/components/packages/package-faq"
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/animation-variants"

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

interface Route {
  id: string
  from_location: string
  to_location: string
  distance_km: number
  estimated_time: string
  base_fare: number
  is_active: boolean
}

interface TaxiPageClientProps {
  vehicles: Vehicle[]
  routes: Route[]
}

const taxiFaqs = [
  {
    question: "How do I book a taxi?",
    answer:
      "You can book through WhatsApp, call us directly, or fill out the booking form on this page. We'll confirm your booking within 30 minutes.",
  },
  {
    question: "Is advance payment required?",
    answer: "No advance payment is required. You can pay after your trip is completed.",
  },
  {
    question: "Are your drivers verified?",
    answer: "Yes, all our drivers are verified with proper documentation, driving licenses, and background checks.",
  },
  {
    question: "Can I modify or cancel my booking?",
    answer:
      "Yes, you can modify or cancel your booking up to 24 hours before the scheduled pickup time without any charges.",
  },
]

export function TaxiPageClient({ vehicles, routes }: TaxiPageClientProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("")

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <InfiniteScrollHero
        images={[
          { url: "/taxi-cab-mountain-road.jpg", alt: "Taxi Service" },
          { url: "/premium-taxi-service-himachal-mountains.jpg", alt: "Premium Taxi" },
          { url: "/himalayan-mountains-landscape.jpg", alt: "Mountain Roads" },
          { url: "/himalayan-mountains-snow-peaks-sunrise.jpg", alt: "Mountain Scenery" },
        ]}
        badge="Trusted by 10,000+ Happy Travelers"
        title="Your Mountain Journey, Our Priority"
        subtitle="Navigate the winding Himalayan roads with confidence! From Chandigarh airport pickups to remote hill station drop-offs, our experienced local drivers ensure safe, comfortable, and memorable journeys. No hidden charges, no surprises — just pure travel bliss."
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="bg-saffron hover:bg-saffron/90 text-white gap-2">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <a href="tel:+919876543210">
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </Button>
        </div>
      </InfiniteScrollHero>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { value: "12+", label: "Years of Service" },
              { value: "50+", label: "Expert Drivers" },
              { value: "10K+", label: "Trips Completed" },
            ].map((stat, index) => (
              <div key={index} className="bg-muted rounded-lg px-8 py-4 text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      {vehicles.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Choose Your Vehicle</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select from our fleet of well-maintained vehicles suited for every group size and budget
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  isSelected={selectedVehicle === vehicle.id}
                  onSelect={() => setSelectedVehicle(vehicle.id)}
                />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Popular Routes */}
      {routes.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Popular Routes & Fares</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Check out our most booked routes with transparent pricing
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {routes.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Booking Form */}
      <section className="py-16 bg-muted/30" id="book">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Book Your Ride</h2>
              <p className="text-muted-foreground mb-6">
                Fill in your travel details and we will get back to you with the best options. No advance payment
                required - pay after your trip!
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Car className="h-5 w-5" />, text: "Wide range of vehicles for every need" },
                  { icon: <Calendar className="h-5 w-5" />, text: "Flexible booking and cancellation" },
                  { icon: <Shield className="h-5 w-5" />, text: "Verified drivers and sanitized cars" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <TaxiBookingForm />
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Safety & Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your safety is our priority. Here is what we offer with every ride.
            </p>
          </motion.div>
          <SafetyFeatures />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <TaxiTestimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <PackageFAQ faqs={taxiFaqs} />
          </motion.div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 lg:hidden z-50">
        <div className="flex gap-3">
          <Button asChild className="flex-1 bg-forest-green hover:bg-forest-green/90 text-white gap-2">
            <a href="#book">
              <Car className="h-5 w-5" />
              Book a Ride
            </a>
          </Button>
          <Button asChild variant="outline" size="icon">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>

      <div className="pb-20 lg:pb-0">
        <Footer />
      </div>
    </main>
  )
}

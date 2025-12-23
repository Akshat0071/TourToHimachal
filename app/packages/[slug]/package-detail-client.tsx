"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, MapPin, Users, Check, X, Phone, MessageCircle } from "lucide-react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PackageHeroSlider } from "@/components/packages/package-hero-slider"
import { RelatedPackagesCarousel } from "@/components/packages/related-packages-carousel"
import { ItineraryAccordion } from "@/components/packages/itinerary-accordion"
import { PackageBookingForm } from "@/components/packages/package-booking-form"
import { useSettings } from "@/lib/settings-context"
import { generateWhatsAppLink } from "@/lib/whatsapp"
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animation-variants"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Package {
  id: string
  slug: string
  title: string
  description: string
  short_description?: string
  price: number
  original_price?: number
  duration: string
  region?: string
  min_persons?: number
  highlights?: string[]
  inclusions?: string[]
  exclusions?: string[]
  category?: string
  images?: string[]
  itinerary?: any
  itinerary_pdf_url?: string
  is_active: boolean
  is_featured: boolean
  seo_title?: string
  seo_description?: string
}

interface PackageDetailClientProps {
  pkg: Package
  allPackages: Package[]
}

export function PackageDetailClient({ pkg, allPackages }: PackageDetailClientProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { settings } = useSettings()
  const whatsappLink = generateWhatsAppLink({ packageName: pkg.title }, settings?.whatsapp_number)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Packages", href: "/packages" }, { label: pkg.title }]} />
        </div>
      </div>

      {/* Hero Slider */}


      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Package Summary */}
              <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {pkg.is_featured && <Badge className="bg-saffron text-white border-0">Featured</Badge>}
                  {pkg.category && (
                    <Badge variant="outline" className="capitalize">
                      {pkg.category}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">{pkg.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                {/* Hero Slider placed between Title and Description */}
                <div className="mb-8 rounded-xl overflow-hidden">
                  <PackageHeroSlider images={pkg.images || []} title={pkg.title} pdfUrl={pkg.itinerary_pdf_url} />
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">{pkg.description}</p>
              </motion.div>

              {/* Highlights */}
              {pkg.highlights && pkg.highlights.length > 0 && (
                <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pkg.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                          <Check className="h-4 w-4 text-forest-green" />
                        </div>
                        <span className="text-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Itinerary */}
              {pkg.itinerary && Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 && (
                <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Day-by-Day Itinerary</h2>
                  <ItineraryAccordion itinerary={pkg.itinerary} />
                </motion.div>
              )}

              {/* Inclusions & Exclusions */}
              {((pkg.inclusions && pkg.inclusions.length > 0) || (pkg.exclusions && pkg.exclusions.length > 0)) && (
                <motion.div
                  variants={slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {pkg.inclusions && pkg.inclusions.length > 0 && (
                    <div className="bg-forest-green/5 border border-forest-green/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Check className="h-5 w-5 text-forest-green" />
                        Inclusions
                      </h3>
                      <ul className="space-y-2">
                        {pkg.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <Check className="h-4 w-4 text-forest-green shrink-0 mt-1" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.exclusions && pkg.exclusions.length > 0 && (
                    <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <X className="h-5 w-5 text-destructive" />
                        Exclusions
                      </h3>
                      <ul className="space-y-2">
                        {pkg.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <X className="h-4 w-4 text-destructive shrink-0 mt-1" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Sidebar - Booking Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <motion.div
                  variants={slideInRight}
                  initial="hidden"
                  animate="visible"
                  className="bg-card border border-border rounded-xl p-6 shadow-lg"
                >
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-primary">₹{pkg.price?.toLocaleString()}</span>
                      {pkg.original_price && pkg.original_price > pkg.price && (
                        <span className="text-muted-foreground line-through">
                          ₹{pkg.original_price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">per person</p>
                    {pkg.original_price && pkg.original_price > pkg.price && (
                      <Badge className="mt-2 bg-forest-green/10 text-forest-green border-0">
                        Save ₹{(pkg.original_price - pkg.price).toLocaleString()}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="h-5 w-5" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>{pkg.region || "Himachal Pradesh"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Users className="h-5 w-5" />
                      <span>Min {(pkg.min_persons ?? 2)} persons</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-saffron hover:bg-saffron/90 text-white gap-2" size="lg">
                          Book Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Book {pkg.title}</DialogTitle>
                          <DialogDescription>
                            Fill in your details and we'll get back to you within 12 hours.
                          </DialogDescription>
                        </DialogHeader>
                        <PackageBookingForm packageName={pkg.title} packagePrice={pkg.price} onSuccess={() => { }} />
                      </DialogContent>
                    </Dialog>

                    <Button
                      asChild
                      className="w-full bg-forest-green hover:bg-forest-green/90 text-white gap-2"
                      size="lg"
                    >
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-5 w-5" />
                        Book on WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full gap-2 bg-transparent" size="lg">
                      <a href={`tel:${(settings?.contact_phone || "+919876543210").replace(/\s/g, "")}`}>
                        <Phone className="h-5 w-5" />
                        Call Now
                      </a>
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    No payment required to book. Pay later at your convenience.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      {allPackages.length > 1 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <RelatedPackagesCarousel packages={allPackages} currentSlug={pkg.slug} />
          </div>
        </section>
      )}

      {/* Sticky Mobile Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 lg:hidden z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-xl font-bold text-primary">₹{pkg.price?.toLocaleString()}</span>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
          <Button
            onClick={() => setIsBookingOpen(true)}
            className="flex-1 max-w-50 bg-saffron hover:bg-saffron/90 text-white gap-2"
          >
            Book Now
          </Button>
        </div>
      </div>

      <div className="pb-20 lg:pb-0">
        <Footer />
      </div>
    </main>
  )
}

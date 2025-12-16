import type React from "react"
import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SettingsProvider } from "@/lib/settings-context"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "TourToHimachal - Tours, Travel Packages & Taxi Services",
  description:
    "Discover the magic of Himachal Pradesh with our curated tour packages, reliable taxi services, and personalized travel experiences. Book spiritual tours, honeymoon packages, adventure trips, and more.",
  keywords:
    "Himachal Pradesh tours, Manali packages, Shimla travel, taxi service Himachal, spiritual tours, honeymoon packages, adventure trekking",
  openGraph: {
    title: "TourToHimachal - Your Gateway to Himalayan Adventures",
    description:
      "Experience breathtaking mountains, sacred temples, thrilling adventures with our curated tour packages and reliable taxi services.",
    type: "website",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        <SettingsProvider>{children}</SettingsProvider>
        <Analytics />
      </body>
    </html>
  )
}

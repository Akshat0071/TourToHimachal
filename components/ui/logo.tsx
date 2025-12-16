"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "full" | "icon"
  isScrolled?: boolean
  href?: string
  onClick?: () => void
  forceColors?: boolean
}

export function Logo({
  className,
  size = "md",
  variant = "full",
  isScrolled = false,
  href = "/",
  onClick,
  forceColors = false,
}: LogoProps) {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-base", tagline: "text-[9px]" },
    md: { icon: "w-10 h-10", text: "text-lg md:text-xl", tagline: "text-[10px] md:text-xs" },
    lg: { icon: "w-12 h-12", text: "text-xl md:text-2xl", tagline: "text-xs" },
  }

  const useColors = forceColors || isScrolled || true

  const LogoContent = () => (
    <div className={cn("flex items-center gap-2 md:gap-3 group", className)}>
      {/* Custom Mountain Logo Icon */}
      <div
        className={cn(
          sizes[size].icon,
          "relative rounded-xl transition-all duration-300 overflow-hidden",
          "bg-gradient-to-br from-saffron via-sunset-orange to-temple-red",
        )}
      >
        {/* Stylized Mountain SVG */}
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full p-1.5" xmlns="http://www.w3.org/2000/svg">
          {/* Background gradient circle */}
          <defs>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
          </defs>

          {/* Sun/Moon behind mountains */}
          <circle cx="28" cy="12" r="5" fill="url(#sunGrad)" className="opacity-90" />

          {/* Main mountain peak */}
          <path d="M20 8L32 28H8L20 8Z" fill="url(#mountainGrad)" className="drop-shadow-sm" />

          {/* Second mountain */}
          <path d="M12 16L22 28H2L12 16Z" fill="url(#mountainGrad)" className="opacity-80" />

          {/* Snow caps */}
          <path d="M20 8L24 14H16L20 8Z" fill="#fff" className="opacity-95" />
          <path d="M12 16L15 20H9L12 16Z" fill="#fff" className="opacity-90" />

          {/* Road/Path winding through */}
          <path
            d="M20 28C20 28 22 24 20 22C18 20 22 18 20 16"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            className="opacity-60"
          />
        </svg>
      </div>

      {variant === "full" && (
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              sizes[size].text,
              "font-serif font-bold tracking-tight transition-colors",
              isScrolled ? "text-foreground" : "text-foreground",
            )}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-golden-yellow to-sunset-orange">
              Tour
            </span>
            <span className="text-mountain-blue">To</span>
            <span className="text-forest-green">Himachal</span>
          </span>
          <span className={cn(sizes[size].tagline, "font-medium tracking-[0.15em] uppercase text-saffron")}>
            Your Himalayan Journey
          </span>
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        <LogoContent />
      </Link>
    )
  }

  return <LogoContent />
}

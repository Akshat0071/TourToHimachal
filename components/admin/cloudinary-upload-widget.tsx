"use client"

import { useEffect, useRef, useState } from "react"
import { Upload, X, Image as ImageIcon, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    cloudinary: any
  }
}

interface CloudinaryUploadWidgetProps {
  onUploadSuccess: (result: CloudinaryUploadResult) => void
  onUploadError?: (error: any) => void
  folder?: string
  maxFiles?: number
  multiple?: boolean
  acceptedFormats?: string[]
  buttonText?: string
  buttonVariant?: "default" | "outline" | "ghost"
}

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  url: string
  format: string
  resource_type: string
  width?: number
  height?: number
  bytes: number
  original_filename: string
}

export function CloudinaryUploadWidget({
  onUploadSuccess,
  onUploadError,
  folder = "himachal-yatra",
  maxFiles = 1,
  multiple = false,
  acceptedFormats = ["jpg", "jpeg", "png", "webp", "gif", "pdf"],
  buttonText = "Upload Image",
  buttonVariant = "outline",
}: CloudinaryUploadWidgetProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const widgetRef = useRef<any>(null)

  useEffect(() => {
    // Check if Cloudinary script is already loaded
    if (window.cloudinary) {
      setIsScriptLoaded(true)
      return
    }

    // Load Cloudinary Upload Widget script
    const script = document.createElement("script")
    script.src = "https://upload-widget.cloudinary.com/global/all.js"
    script.async = true
    script.onload = () => {
      setIsScriptLoaded(true)
    }
    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (widgetRef.current) {
        widgetRef.current.destroy()
      }
    }
  }, [])

  const openWidget = () => {
    if (!isScriptLoaded || !window.cloudinary) {
      console.error("Cloudinary script not loaded")
      onUploadError?.({ message: "Cloudinary script not loaded" })
      return
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName) {
      const errMsg = "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not configured"
      console.error(errMsg)
      onUploadError?.({ message: errMsg })
      return
    }

    if (!uploadPreset) {
      const errMsg = "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is not configured"
      console.error(errMsg)
      onUploadError?.({ message: errMsg })
      return
    }

    console.log("Opening Cloudinary widget with preset:", uploadPreset)

    // Create or reuse widget
    if (!widgetRef.current) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName,
          uploadPreset,
          sources: ["local", "url", "camera"],
          multiple,
          maxFiles,
          clientAllowedFormats: acceptedFormats,
          maxFileSize: 10000000, // 10MB
          folder,
          tags: ["website"],
          resourceType: "auto",
          showAdvancedOptions: false,
          croppingAspectRatio: undefined,
          showCompletedButton: true,
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#90A0B3",
              tabIcon: "#0078FF",
              menuIcons: "#5A616A",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#0078FF",
              action: "#FF620C",
              inactiveTabIcon: "#0E2F5A",
              error: "#F44235",
              inProgress: "#0078FF",
              complete: "#20B832",
              sourceBg: "#E4EBF1",
            },
          },
        },
        (error: any, result: any) => {
          // Handle error - even if error object is empty
          if (error) {
            console.error("Upload error details:", {
              error,
              errorString: JSON.stringify(error),
              errorKeys: Object.keys(error),
            })
            const errorMessage = error?.message || "Upload failed - check upload preset configuration"
            onUploadError?.({ message: errorMessage, ...error })
            return
          }

          // Handle abort/close without error
          if (!result) {
            console.log("Upload cancelled by user")
            return
          }

          if (result.event === "success") {
            console.log("Upload successful:", result.info)
            const uploadResult: CloudinaryUploadResult = {
              public_id: result.info.public_id,
              secure_url: result.info.secure_url,
              url: result.info.url,
              format: result.info.format,
              resource_type: result.info.resource_type,
              width: result.info.width,
              height: result.info.height,
              bytes: result.info.bytes,
              original_filename: result.info.original_filename,
            }
            console.log("Upload result:", uploadResult)
            onUploadSuccess(uploadResult)
          }
        }
      )
    }

    widgetRef.current.open()
  }

  return (
    <Button type="button" variant={buttonVariant} onClick={openWidget} className="gap-2">
      <Upload className="h-4 w-4" />
      {buttonText}
    </Button>
  )
}

interface UploadedImagePreviewProps {
  imageUrl: string
  onRemove?: () => void
  alt?: string
}

export function UploadedImagePreview({ imageUrl, onRemove, alt = "Uploaded image" }: UploadedImagePreviewProps) {
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(imageUrl)
  const isPdf = /\.pdf$/i.test(imageUrl)

  return (
    <div className="relative inline-block">
      <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-border bg-muted">
        {isImage ? (
          <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
        ) : isPdf ? (
          <div className="flex items-center justify-center h-full">
            <FileText className="h-16 w-16 text-muted-foreground" />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <ImageIcon className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
      </div>
      {onRemove && (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}

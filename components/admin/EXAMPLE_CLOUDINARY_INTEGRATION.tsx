/**
 * Example: How to Integrate Cloudinary Upload Widget in Blog Form
 * 
 * This shows how to use the CloudinaryUploadWidget in your blog-form.tsx
 */

"use client"

import { useState } from "react"
import { CloudinaryUploadWidget, CloudinaryUploadResult, UploadedImagePreview } from "./cloudinary-upload-widget"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ExampleBlogFormWithCloudinary() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    cover_image: "", // This will store the Cloudinary URL
    author: "",
    category: "",
  })

  const [coverImagePublicId, setCoverImagePublicId] = useState("")

  const handleImageUpload = (result: CloudinaryUploadResult) => {
    console.log("Upload successful:", result)

    // Store both the URL and public_id
    setFormData((prev) => ({
      ...prev,
      cover_image: result.secure_url, // Store the full URL in your database
    }))
    setCoverImagePublicId(result.public_id) // Optionally store public_id for future transformations
  }

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      cover_image: "",
    }))
    setCoverImagePublicId("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Now when you save to Supabase, formData.cover_image will be a Cloudinary URL
    // Example: https://res.cloudinary.com/dabqqymqe/image/upload/v1234567890/himachal-yatra/blogs/my-image.jpg

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        console.log("Blog saved successfully!")
        // Reset form or redirect
      }
    } catch (error) {
      console.error("Error saving blog:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          required
        />
      </div>

      <div>
        <Label>Cover Image</Label>
        <div className="mt-2 space-y-4">
          {formData.cover_image ? (
            <UploadedImagePreview imageUrl={formData.cover_image} onRemove={handleRemoveImage} alt={formData.title} />
          ) : (
            <CloudinaryUploadWidget
              onUploadSuccess={handleImageUpload}
              onUploadError={(error) => console.error("Upload failed:", error)}
              folder="himachal-yatra/blogs/covers"
              maxFiles={1}
              acceptedFormats={["jpg", "jpeg", "png", "webp"]}
              buttonText="Upload Cover Image"
              buttonVariant="outline"
            />
          )}
        </div>
        {formData.cover_image && (
          <p className="text-sm text-muted-foreground mt-2">URL: {formData.cover_image}</p>
        )}
      </div>

      <div>
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={15}
          required
        />
      </div>

      <Button type="submit">Save Blog Post</Button>
    </form>
  )
}

/**
 * INTEGRATION STEPS:
 * 
 * 1. Replace the file input in your blog-form.tsx with CloudinaryUploadWidget
 * 2. Update the state to store the Cloudinary URL instead of file object
 * 3. When saving to Supabase, save the secure_url as the cover_image
 * 4. When displaying images, use the stored Cloudinary URL directly
 * 
 * OPTIONAL OPTIMIZATIONS:
 * 
 * - Use the helper functions from lib/cloudinary.ts to generate optimized URLs:
 * 
 *   import { getOptimizedImageUrl, getThumbnailUrl } from '@/lib/cloudinary'
 * 
 *   // In your blog listing
 *   const thumbnailUrl = getThumbnailUrl(blog.cover_image, 400)
 * 
 *   // In your blog detail page
 *   const optimizedUrl = getOptimizedImageUrl(blog.cover_image, 1200)
 */

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Upload, Trash2, Copy, ImageIcon, FileText, Check, Folder } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface Media {
  id: string
  name: string
  url: string
  type: string
  size?: number
  folder?: string
  alt_text?: string
  created_at: string
}

interface MediaLibraryProps {
  media: Media[]
}

const folders = [
  { value: "general", label: "General" },
  { value: "packages", label: "Packages" },
  { value: "blogs", label: "Blogs" },
  { value: "diaries", label: "Diaries" },
  { value: "vehicles", label: "Vehicles" },
]

export function MediaLibrary({ media }: MediaLibraryProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    type: "image",
    folder: "general",
    alt_text: "",
  })

  const filteredMedia = filter === "all" ? media : media.filter((m) => m.folder === filter)

  const handleSubmit = async () => {
    if (!formData.name || !formData.url) {
      toast.error("Please fill in all required fields")
      return
    }

    const supabase = createClient()

    const { error } = await supabase.from("media").insert({
      ...formData,
    })

    if (error) {
      toast.error("Failed to add media")
    } else {
      toast.success("Media added successfully")
      setIsOpen(false)
      setFormData({
        name: "",
        url: "",
        type: "image",
        folder: "general",
        alt_text: "",
      })
      router.refresh()
    }
  }

  const copyUrl = async (id: string, url: string) => {
    await navigator.clipboard.writeText(url)
    setCopiedId(id)
    toast.success("URL copied to clipboard")
    setTimeout(() => setCopiedId(null), 2000)
  }

  const deleteMedia = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return

    const supabase = createClient()
    const { error } = await supabase.from("media").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete media")
    } else {
      toast.success("Media deleted successfully")
      router.refresh()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Folder className="w-5 h-5 text-muted-foreground" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All folders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Folders</SelectItem>
              {folders.map((folder) => (
                <SelectItem key={folder.value} value={folder.value}>
                  {folder.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Add Media
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Media</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Image name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL *</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
                  placeholder="https://..."
                />
                <p className="text-xs text-muted-foreground">
                  Upload to Cloudinary and paste the URL here, or use any external image URL.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="folder">Folder</Label>
                  <Select
                    value={formData.folder}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, folder: value }))}
                  >
                    <SelectTrigger id="folder">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {folders.map((folder) => (
                        <SelectItem key={folder.value} value={folder.value}>
                          {folder.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt_text">Alt Text</Label>
                <Input
                  id="alt_text"
                  value={formData.alt_text}
                  onChange={(e) => setFormData((prev) => ({ ...prev, alt_text: e.target.value }))}
                  placeholder="Describe the image"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Add Media</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {filteredMedia.length === 0 ? (
        <div className="bg-background border border-border rounded-xl p-12 text-center">
          <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No media yet</h3>
          <p className="text-muted-foreground mb-4">Upload images and documents to use across your site.</p>
          <Button onClick={() => setIsOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Add Media
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="overflow-hidden group">
                <CardContent className="p-0">
                  <div className="aspect-square relative bg-muted">
                    {item.type === "image" ? (
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={item.alt_text || item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/broken-image.png"
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => copyUrl(item.id, item.url)}
                        className="h-8 w-8 p-0"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => deleteMedia(item.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{item.folder}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

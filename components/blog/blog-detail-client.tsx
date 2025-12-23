"use client"

import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ArrowLeft, Share2, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MarkdownRenderer } from "@/lib/markdown-renderer"
import { useSettings } from "@/lib/settings-context"
import { generateWhatsAppLink } from "@/lib/whatsapp"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  cover_image?: string
  content: string
  author: string
  category?: string
  tags?: string[]
  published_at: string
  created_at: string
  is_published: boolean
}

interface BlogDetailClientProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
  const { settings } = useSettings()
  const whatsappLink = generateWhatsAppLink(
    {
      message: `Check out this article: ${post.title} - ${post.excerpt}`,
    },
    settings?.whatsapp_number
  )

  const publishedDate = new Date(post.published_at || post.created_at)
  const isValidDate = !isNaN(publishedDate.getTime())

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>

          <article className="space-y-6">
            {/* Title and Meta */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.category && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {post.category}
                  </Badge>
                )}
                {post.tags?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                {post.title}
              </h1>

              <p className="text-lg text-muted-foreground">{post.excerpt}</p>

              {/* Author and Date */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                {isValidDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(publishedDate, "MMM dd, yyyy")}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {post.cover_image && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </article>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* Share and Tags */}
            <div className="mt-12 pt-8 border-t border-border space-y-6">
              {/* Share Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-semibold text-foreground">Share:</span>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </a>
              </div>

              {/* All Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="bg-muted rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <div className="group cursor-pointer space-y-2 p-3 rounded-lg hover:bg-background transition">
                        <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        {relatedPost.category && (
                          <p className="text-xs text-muted-foreground">{relatedPost.category}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

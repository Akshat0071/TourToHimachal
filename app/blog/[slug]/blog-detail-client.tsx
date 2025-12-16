"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { BlogHero } from "@/components/blog/blog-hero"
import { BlogTOC } from "@/components/blog/blog-toc"
import { BlogCard } from "@/components/blog/blog-card"
import { SocialShare } from "@/components/diaries/social-share"
import { MarkdownRenderer } from "@/lib/markdown-renderer"
import { fadeInUp, staggerContainer } from "@/lib/animation-variants"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  cover_image?: string
  gallery?: string[]
  author?: string
  category?: string
  tags?: string[]
  published_at?: string
  created_at?: string
}

interface BlogDetailClientProps {
  post: BlogPost
  relatedPosts: BlogPost[]
  url: string
}

export function BlogDetailClient({ post, relatedPosts, url }: BlogDetailClientProps) {
  const shareUrl = url
  const markdownContent = post.content || ""

  return (
    <>
      <Header />
      <main>
        <BlogHero post={post} />

        <article className="container mx-auto px-4 py-12">
          <div className="grid xl:grid-cols-[1fr_250px] gap-12 max-w-5xl mx-auto">
            {/* Main Content */}
            <div>
              {/* Social Share */}
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-8 pb-8 border-b">
                <SocialShare title={post.title} url={shareUrl} />
              </motion.div>

              {/* Content Body */}
              <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                <MarkdownRenderer content={markdownContent} />
              </motion.div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-12 pt-8 border-t"
                >
                  <h4 className="text-sm font-semibold text-foreground mb-3">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Share Again */}
              <div className="py-8 border-t border-b mt-8">
                <SocialShare title={post.title} url={shareUrl} />
              </div>
            </div>

            {/* Table of Contents */}
            <BlogTOC content={markdownContent} />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8 text-center">
                  Related Posts
                </h2>
              </motion.div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              >
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </motion.div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}

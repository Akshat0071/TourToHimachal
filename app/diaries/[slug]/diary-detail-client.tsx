"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { DiaryHero } from "@/components/diaries/diary-hero"
import { DiaryGallery } from "@/components/diaries/diary-gallery"
import { AuthorCard } from "@/components/diaries/author-card"
import { RelatedDiaries } from "@/components/diaries/related-diaries"
import { SocialShare } from "@/components/diaries/social-share"
import { MarkdownRenderer } from "@/lib/markdown-renderer"
import { fadeInUp } from "@/lib/animation-variants"

interface Diary {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  cover_image?: string
  gallery?: string[]
  author_name: string
  author_avatar?: string
  destination?: string
  travel_date?: string
  published_at?: string
  tags?: string[]
  readTime?: number
}

interface DiaryDetailClientProps {
  diary: Diary
  relatedDiaries: Diary[]
  url: string
}

export function DiaryDetailClient({ diary, relatedDiaries, url }: DiaryDetailClientProps) {
  const shareUrl = url
  const galleryImages = diary.gallery && diary.gallery.length > 0 ? diary.gallery : diary.cover_image ? [diary.cover_image] : []
  const authorInfo = {
    name: diary.author_name,
    avatar: diary.author_avatar,
  }

  return (
    <>
      <Header />
      <main>
        <DiaryHero diary={diary} images={galleryImages} />

        <article className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Social Share */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-8 pb-8 border-b">
              <SocialShare title={diary.title} url={shareUrl} />
            </motion.div>

            {/* Content Body */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <MarkdownRenderer content={diary.content || ""} />
            </motion.div>

            {/* Gallery */}
            <DiaryGallery images={galleryImages} title={diary.title} />

            {/* Author Card */}
            <div className="my-12">
              <AuthorCard author={authorInfo} />
            </div>

            {/* Share Again */}
            <div className="py-8 border-t border-b">
              <SocialShare title={diary.title} url={shareUrl} />
            </div>

            {/* Related Diaries */}
            <RelatedDiaries diaries={relatedDiaries} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

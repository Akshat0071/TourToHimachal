import { createPublicClient } from "@/lib/supabase/public"
import { BlogPageClient } from "@/components/blog/blog-page-client"

export const revalidate = 0 // Always fetch fresh data

export default async function BlogPage() {
  const supabase = createPublicClient()

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching blogs:", error)
  }

  // Extract unique categories from blogs
  const categories = [...new Set(blogs?.map((blog) => blog.category).filter(Boolean) || [])]

  return <BlogPageClient blogs={blogs || []} categories={categories} />
}

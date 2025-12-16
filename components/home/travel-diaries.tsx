import { createPublicClient } from "@/lib/supabase/public"
import { TravelDiariesClient } from "./travel-diaries-client"

export async function TravelDiaries() {
  const supabase = createPublicClient()

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, cover_image, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3)

  if (error) {
    console.error("Error fetching blogs:", error)
  }

  return <TravelDiariesClient blogs={blogs || []} />
}

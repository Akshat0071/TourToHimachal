import { createPublicClient } from "@/lib/supabase/public"
import { PackagesPageClient } from "@/components/packages/packages-page-client"

export const revalidate = 0 // Always fetch fresh data

export default async function PackagesPage() {
  const supabase = createPublicClient()

  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching packages:", error)
  }

  return <PackagesPageClient packages={packages || []} />
}

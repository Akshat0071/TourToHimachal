import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PackagesTable } from "@/components/admin/packages-table"

export default async function PackagesPage() {
  const supabase = await createClient()

  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching packages:", error)
  }

  return (
    <div>
      <AdminHeader title="Packages Management" description="Create and manage tour packages" />

      <div className="p-6 space-y-6">
        <div className="flex justify-end">
          <Button asChild>
            <Link href="/admin/packages/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Package
            </Link>
          </Button>
        </div>

        <PackagesTable packages={packages || []} />
      </div>
    </div>
  )
}

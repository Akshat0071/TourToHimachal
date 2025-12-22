import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ReviewsTable } from "@/components/admin/reviews-table"

export const dynamic = "force-dynamic"

export default async function ReviewsPage() {
    const supabase = await createClient()

    const { data: reviews, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching reviews:", error)
    }

    return (
        <div>
            <AdminHeader
                title="Reviews Management"
                description="Manage customer reviews and approvals"
            />

            <div className="p-6 space-y-6">
                <div className="flex justify-end">
                    <Button asChild className="bg-mountain-blue text-white hover:bg-mountain-blue/90">
                        <Link href="/admin/reviews/new">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Review
                        </Link>
                    </Button>
                </div>

                <ReviewsTable reviews={reviews || []} />
            </div>
        </div>
    )
}

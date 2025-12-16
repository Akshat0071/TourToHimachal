import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentLeads } from "@/components/admin/recent-leads"
import { QuickActions } from "@/components/admin/quick-actions"

export default async function DashboardPage() {
  const supabase = await createClient()

  // Fetch stats
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [totalLeadsResult, newTodayResult, packageLeadsResult, taxiLeadsResult, recentLeadsResult] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", today.toISOString()),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("service_type", "package"),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("service_type", "taxi"),
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
  ])

  const stats = {
    totalLeads: totalLeadsResult.count || 0,
    newToday: newTodayResult.count || 0,
    packageEnquiries: packageLeadsResult.count || 0,
    taxiEnquiries: taxiLeadsResult.count || 0,
  }

  const recentLeads = recentLeadsResult.data || []

  return (
    <div>
      <AdminHeader title="Dashboard" description="Welcome back! Here's an overview of your business." />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <DashboardStats stats={stats} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Leads */}
          <div className="lg:col-span-2">
            <RecentLeads leads={recentLeads} />
          </div>

          {/* Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}

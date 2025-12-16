import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { DiaryForm } from "@/components/admin/diary-form"

interface EditDiaryPageProps {
  params: Promise<{ id: string }>
}

export default async function EditDiaryPage({ params }: EditDiaryPageProps) {
  const { id } = await params

  if (id === "new") {
    redirect("/admin/diaries/new")
  }

  const supabase = await createClient()

  const { data: diary, error } = await supabase.from("diaries").select("*").eq("id", id).single()

  if (error || !diary) {
    notFound()
  }

  return (
    <div>
      <AdminHeader title="Edit Diary" description={diary.title} />
      <div className="p-6">
        <DiaryForm initialData={diary} />
      </div>
    </div>
  )
}

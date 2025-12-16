import { AdminHeader } from "@/components/admin/admin-header"
import { DiaryForm } from "@/components/admin/diary-form"

export default function NewDiaryPage() {
  return (
    <div>
      <AdminHeader title="Add Travel Diary" description="Create a new traveler story" />
      <div className="p-6">
        <DiaryForm />
      </div>
    </div>
  )
}

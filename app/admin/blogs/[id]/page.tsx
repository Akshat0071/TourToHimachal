import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { BlogForm } from "@/components/admin/blog-form"

interface EditBlogPageProps {
  params: Promise<{ id: string }>
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params

  if (id === "new") {
    redirect("/admin/blogs/new")
  }

  const supabase = await createClient()

  const { data: blog, error } = await supabase.from("blogs").select("*").eq("id", id).single()

  if (error || !blog) {
    notFound()
  }

  return (
    <div>
      <AdminHeader title="Edit Blog" description={blog.title} />
      <div className="p-6">
        <BlogForm initialData={blog} />
      </div>
    </div>
  )
}

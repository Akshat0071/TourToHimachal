"use client"

import { AdminHeader } from "@/components/admin/admin-header"
import { PackageForm } from "@/components/admin/package-form"

export default function NewPackagePage() {
  return (
    <div>
      <AdminHeader title="Create Package" description="Add a new tour package" />
      <div className="p-6">
        <PackageForm />
      </div>
    </div>
  )
}

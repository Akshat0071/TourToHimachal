"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye, MoreHorizontal, BookOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { format } from "date-fns"

interface Diary {
  id: string
  title: string
  slug: string
  author_name: string
  destination?: string
  is_published: boolean
  created_at: string
}

interface DiariesTableProps {
  diaries: Diary[]
}

export function DiariesTable({ diaries }: DiariesTableProps) {
  const router = useRouter()

  const togglePublished = async (id: string, currentValue: boolean) => {
    const supabase = createClient()
    const updateData: { is_published: boolean; published_at?: string | null } = {
      is_published: !currentValue,
    }
    if (!currentValue) {
      updateData.published_at = new Date().toISOString()
    }

    const { error } = await supabase.from("diaries").update(updateData).eq("id", id)

    if (error) {
      toast.error("Failed to update diary")
    } else {
      toast.success(`Diary ${!currentValue ? "published" : "unpublished"}`)
      router.refresh()
    }
  }

  const deleteDiary = async (id: string) => {
    if (!confirm("Are you sure you want to delete this diary?")) return

    const supabase = createClient()
    const { error } = await supabase.from("diaries").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete diary")
    } else {
      toast.success("Diary deleted successfully")
      router.refresh()
    }
  }

  if (diaries.length === 0) {
    return (
      <div className="bg-background border border-border rounded-xl p-12 text-center">
        <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No travel diaries yet</h3>
        <p className="text-muted-foreground mb-4">Add traveler stories and experiences.</p>
        <Button asChild>
          <Link href="/admin/diaries/new">Add Diary</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-background border border-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {diaries.map((diary, index) => (
            <motion.tr
              key={diary.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="border-b border-border hover:bg-muted/50 transition-colors"
            >
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{diary.title}</p>
                  <p className="text-sm text-muted-foreground">/{diary.slug}</p>
                </div>
              </TableCell>
              <TableCell>{diary.author_name}</TableCell>
              <TableCell>
                <Badge variant="outline">{diary.destination || "Various"}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={diary.is_published}
                    onCheckedChange={() => togglePublished(diary.id, diary.is_published)}
                  />
                  <span className="text-sm text-muted-foreground">{diary.is_published ? "Published" : "Draft"}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(new Date(diary.created_at), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/diaries/${diary.slug}`} target="_blank">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/diaries/${diary.id}`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => deleteDiary(diary.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

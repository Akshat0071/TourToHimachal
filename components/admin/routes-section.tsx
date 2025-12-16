"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, MapPin } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface Route {
  id: string
  from_location: string
  to_location: string
  distance_km?: number
  estimated_time?: string
  base_fare?: number
  is_active: boolean
}

interface RoutesSectionProps {
  routes: Route[]
}

export function RoutesSection({ routes }: RoutesSectionProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [editingRoute, setEditingRoute] = useState<Route | null>(null)
  const [formData, setFormData] = useState({
    from_location: "",
    to_location: "",
    distance_km: 0,
    estimated_time: "",
    base_fare: 0,
  })

  const resetForm = () => {
    setFormData({
      from_location: "",
      to_location: "",
      distance_km: 0,
      estimated_time: "",
      base_fare: 0,
    })
    setEditingRoute(null)
  }

  const openEdit = (route: Route) => {
    setEditingRoute(route)
    setFormData({
      from_location: route.from_location,
      to_location: route.to_location,
      distance_km: route.distance_km || 0,
      estimated_time: route.estimated_time || "",
      base_fare: route.base_fare || 0,
    })
    setIsOpen(true)
  }

  const handleSubmit = async () => {
    const supabase = createClient()

    const data = {
      ...formData,
      distance_km: Number(formData.distance_km),
      base_fare: Number(formData.base_fare),
    }

    let error

    if (editingRoute) {
      const result = await supabase.from("taxi_routes").update(data).eq("id", editingRoute.id)
      error = result.error
    } else {
      const result = await supabase.from("taxi_routes").insert(data)
      error = result.error
    }

    if (error) {
      toast.error("Failed to save route")
    } else {
      toast.success(`Route ${editingRoute ? "updated" : "added"} successfully`)
      setIsOpen(false)
      resetForm()
      router.refresh()
    }
  }

  const toggleActive = async (id: string, currentValue: boolean) => {
    const supabase = createClient()
    const { error } = await supabase.from("taxi_routes").update({ is_active: !currentValue }).eq("id", id)

    if (error) {
      toast.error("Failed to update route")
    } else {
      toast.success(`Route ${!currentValue ? "enabled" : "disabled"}`)
      router.refresh()
    }
  }

  const deleteRoute = async (id: string) => {
    if (!confirm("Are you sure you want to delete this route?")) return

    const supabase = createClient()
    const { error } = await supabase.from("taxi_routes").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete route")
    } else {
      toast.success("Route deleted successfully")
      router.refresh()
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Routes
        </CardTitle>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Route
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRoute ? "Edit Route" : "Add Route"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    value={formData.from_location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, from_location: e.target.value }))}
                    placeholder="e.g., Chandigarh"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    value={formData.to_location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, to_location: e.target.value }))}
                    placeholder="e.g., Shimla"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance (km)</Label>
                  <Input
                    id="distance"
                    type="number"
                    min="0"
                    value={formData.distance_km}
                    onChange={(e) => setFormData((prev) => ({ ...prev, distance_km: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Estimated Time</Label>
                  <Input
                    id="time"
                    value={formData.estimated_time}
                    onChange={(e) => setFormData((prev) => ({ ...prev, estimated_time: e.target.value }))}
                    placeholder="e.g., 4 hours"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fare">Base Fare (₹)</Label>
                <Input
                  id="fare"
                  type="number"
                  min="0"
                  value={formData.base_fare}
                  onChange={(e) => setFormData((prev) => ({ ...prev, base_fare: Number(e.target.value) }))}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>{editingRoute ? "Update" : "Add"} Route</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {routes.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No routes added yet</p>
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Base Fare</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route, index) => (
                  <motion.tr
                    key={route.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-border"
                  >
                    <TableCell className="font-medium">
                      {route.from_location} → {route.to_location}
                    </TableCell>
                    <TableCell>{route.distance_km} km</TableCell>
                    <TableCell>{route.estimated_time}</TableCell>
                    <TableCell>₹{route.base_fare?.toLocaleString()}</TableCell>
                    <TableCell>
                      <Switch
                        checked={route.is_active}
                        onCheckedChange={() => toggleActive(route.id, route.is_active)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(route)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteRoute(route.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

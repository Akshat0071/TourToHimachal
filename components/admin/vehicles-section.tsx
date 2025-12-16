"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Car } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { CloudinaryUploadWidget, UploadedImagePreview, type CloudinaryUploadResult } from "./cloudinary-upload-widget"

interface Vehicle {
  id: string
  name: string
  type: string
  capacity: number
  luggage_capacity?: number
  features?: string[]
  base_fare?: number
  per_km_rate?: number
  image_url?: string
  is_available: boolean
}

interface VehiclesSectionProps {
  vehicles: Vehicle[]
}

export function VehiclesSection({ vehicles }: VehiclesSectionProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    capacity: 4,
    luggage_capacity: 2,
    base_fare: 0,
    per_km_rate: 0,
    image_url: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      capacity: 4,
      luggage_capacity: 2,
      base_fare: 0,
      per_km_rate: 0,
      image_url: "",
    })
    setEditingVehicle(null)
  }

  const openEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      capacity: vehicle.capacity,
      luggage_capacity: vehicle.luggage_capacity || 2,
      base_fare: vehicle.base_fare || 0,
      per_km_rate: vehicle.per_km_rate || 0,
      image_url: vehicle.image_url || "",
    })
    setIsOpen(true)
  }

  const handleSubmit = async () => {
    const supabase = createClient()

    const data = {
      ...formData,
      capacity: Number(formData.capacity),
      luggage_capacity: Number(formData.luggage_capacity),
      base_fare: Number(formData.base_fare),
      per_km_rate: Number(formData.per_km_rate),
    }

    let error

    if (editingVehicle) {
      const result = await supabase.from("vehicles").update(data).eq("id", editingVehicle.id)
      error = result.error
    } else {
      const result = await supabase.from("vehicles").insert(data)
      error = result.error
    }

    if (error) {
      toast.error("Failed to save vehicle")
    } else {
      toast.success(`Vehicle ${editingVehicle ? "updated" : "added"} successfully`)
      setIsOpen(false)
      resetForm()
      router.refresh()
    }
  }

  const toggleAvailability = async (id: string, currentValue: boolean) => {
    const supabase = createClient()
    const { error } = await supabase.from("vehicles").update({ is_available: !currentValue }).eq("id", id)

    if (error) {
      toast.error("Failed to update vehicle")
    } else {
      toast.success(`Vehicle ${!currentValue ? "enabled" : "disabled"}`)
      router.refresh()
    }
  }

  const deleteVehicle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return

    const supabase = createClient()
    const { error } = await supabase.from("vehicles").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete vehicle")
    } else {
      toast.success("Vehicle deleted successfully")
      router.refresh()
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Car className="w-5 h-5" />
          Vehicles
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
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingVehicle ? "Edit Vehicle" : "Add Vehicle"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Vehicle Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Swift Dzire"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                    placeholder="e.g., sedan, suv"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Passenger Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, capacity: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="luggage">Luggage Capacity</Label>
                  <Input
                    id="luggage"
                    type="number"
                    min="0"
                    value={formData.luggage_capacity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, luggage_capacity: Number(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="base_fare">Base Fare (₹)</Label>
                  <Input
                    id="base_fare"
                    type="number"
                    min="0"
                    value={formData.base_fare}
                    onChange={(e) => setFormData((prev) => ({ ...prev, base_fare: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="per_km">Per KM Rate (₹)</Label>
                  <Input
                    id="per_km"
                    type="number"
                    min="0"
                    value={formData.per_km_rate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, per_km_rate: Number(e.target.value) }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Vehicle Image</Label>
                {formData.image_url ? (
                  <div className="space-y-2">
                    <UploadedImagePreview
                      imageUrl={formData.image_url}
                      onRemove={() => setFormData((prev) => ({ ...prev, image_url: "" }))}
                      alt={formData.name}
                    />
                  </div>
                ) : (
                  <CloudinaryUploadWidget
                    onUploadSuccess={(result: CloudinaryUploadResult) => {
                      setFormData((prev) => ({ ...prev, image_url: result.secure_url }))
                      toast.success("Image uploaded successfully!")
                    }}
                    onUploadError={(error) => {
                      console.error("Upload failed:", error)
                      toast.error("Failed to upload image")
                    }}
                    folder="himachal-yatra/vehicles"
                    maxFiles={1}
                    acceptedFormats={["jpg", "jpeg", "png", "webp"]}
                    buttonText="Upload Vehicle Image"
                    buttonVariant="outline"
                  />
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>{editingVehicle ? "Update" : "Add"} Vehicle</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {vehicles.length === 0 ? (
          <div className="text-center py-8">
            <Car className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No vehicles added yet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 border border-border rounded-xl"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{vehicle.name}</h4>
                    <Badge variant="outline" className="mt-1">
                      {vehicle.type}
                    </Badge>
                  </div>
                  <Switch
                    checked={vehicle.is_available}
                    onCheckedChange={() => toggleAvailability(vehicle.id, vehicle.is_available)}
                  />
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    {vehicle.capacity} passengers • {vehicle.luggage_capacity || 0} bags
                  </p>
                  <p>
                    ₹{vehicle.base_fare} base • ₹{vehicle.per_km_rate}/km
                  </p>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(vehicle)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteVehicle(vehicle.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

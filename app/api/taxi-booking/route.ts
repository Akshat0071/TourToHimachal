import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, subject, message, serviceType } = body

    // Validate required fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, phone, and message are required",
        },
        { status: 400 },
      )
    }

    const supabase = await createClient()

    // Insert the lead into the database
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name,
        phone,
        email: email || null,
        subject: subject || `${serviceType} booking`,
        message,
        service_type: serviceType || "taxi",
        status: "new",
      })
      .select("reference_number")
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save your booking. Please try again.",
          error: error.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Your booking has been saved!",
      referenceNumber: data.reference_number,
    })
  } catch (error) {
    console.error("Taxi booking API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

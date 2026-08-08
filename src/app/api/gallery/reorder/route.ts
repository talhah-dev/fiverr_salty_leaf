import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/config/mongoDB"
import GalleryImage from "@/models/Galleryimage"

type ReorderItem = {
    id: string
    order: number
}

export async function PATCH(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const items: ReorderItem[] = body.items

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { success: false, message: "items array is required" },
                { status: 400 }
            )
        }

        await Promise.all(
            items.map((item) =>
                GalleryImage.findByIdAndUpdate(item.id, {
                    $set: { order: item.order },
                })
            )
        )

        return NextResponse.json(
            { success: true, message: "Order updated" },
            { status: 200 }
        )
    } catch (error) {
        console.error("PATCH /api/gallery/reorder error:", error)

        return NextResponse.json(
            { success: false, message: "Failed to reorder images" },
            { status: 500 }
        )
    }
}
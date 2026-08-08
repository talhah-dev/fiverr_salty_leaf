import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/config/mongoDB"
import GalleryImage from "@/models/Galleryimage"

export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const category = searchParams.get("category")

        const filter = category ? { category } : {}

        const images = await GalleryImage.find(filter).sort({
            order: 1,
            createdAt: -1,
        })

        return NextResponse.json(
            { success: true, data: images },
            { status: 200 }
        )
    } catch (error) {
        console.error("GET /api/gallery error:", error)

        return NextResponse.json(
            { success: false, message: "Failed to fetch gallery images" },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const { url, alt, category, order } = body

        if (!url) {
            return NextResponse.json(
                { success: false, message: "Image url is required" },
                { status: 400 }
            )
        }

        const image = await GalleryImage.create({
            url,
            alt: alt || "",
            category: category || "general",
            order: order ?? 0,
        })

        return NextResponse.json(
            { success: true, data: image },
            { status: 201 }
        )
    } catch (error) {
        console.error("POST /api/gallery error:", error)

        return NextResponse.json(
            { success: false, message: "Failed to save gallery image" },
            { status: 500 }
        )
    }
}
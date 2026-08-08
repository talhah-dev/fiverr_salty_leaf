import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { del } from "@vercel/blob"
import connectDB from "@/config/mongoDB"
import GalleryImage from "@/models/Galleryimage"

type RouteParams = {
    params: Promise<{ id: string }>
}

function isValidId(id: string) {
    return mongoose.Types.ObjectId.isValid(id)
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        if (!isValidId(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid image id" },
                { status: 400 }
            )
        }

        await connectDB()

        const image = await GalleryImage.findById(id)

        if (!image) {
            return NextResponse.json(
                { success: false, message: "Image not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { success: true, data: image },
            { status: 200 }
        )
    } catch (error) {
        console.error("GET /api/gallery/[id] error:", error)

        return NextResponse.json(
            { success: false, message: "Failed to fetch image" },
            { status: 500 }
        )
    }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        if (!isValidId(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid image id" },
                { status: 400 }
            )
        }

        await connectDB()

        const body = await request.json()

        const image = await GalleryImage.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        )

        if (!image) {
            return NextResponse.json(
                { success: false, message: "Image not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { success: true, data: image },
            { status: 200 }
        )
    } catch (error) {
        console.error("PATCH /api/gallery/[id] error:", error)

        return NextResponse.json(
            { success: false, message: "Failed to update image" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        if (!isValidId(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid image id" },
                { status: 400 }
            )
        }

        await connectDB()

        const image = await GalleryImage.findById(id)

        if (!image) {
            return NextResponse.json(
                { success: false, message: "Image not found" },
                { status: 404 }
            )
        }

        try {
            await del(image.url)
        } catch (blobError) {
            console.error("Failed to delete blob, continuing with DB delete:", blobError)
        }

        await GalleryImage.findByIdAndDelete(id)

        return NextResponse.json(
            { success: true, message: "Image deleted" },
            { status: 200 }
        )
    } catch (error) {
        console.error("DELETE /api/gallery/[id] error:", error)

        return NextResponse.json(
            { success: false, message: "Failed to delete image" },
            { status: 500 }
        )
    }
}
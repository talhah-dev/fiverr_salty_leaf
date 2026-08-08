import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/config/mongoDB"
import Enquiry from "@/models/Enquiry"

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
                { success: false, message: "Invalid enquiry id" },
                { status: 400 }
            )
        }

        await connectDB()

        const enquiry = await Enquiry.findById(id)

        if (!enquiry) {
            return NextResponse.json(
                { success: false, message: "Enquiry not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { success: true, data: enquiry },
            { status: 200 }
        )
    } catch (error) {
        console.error("GET /api/enquiries/[id] error:", error)

        return NextResponse.json(
            { success: false, message: "Failed to fetch enquiry" },
            { status: 500 }
        )
    }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        if (!isValidId(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid enquiry id" },
                { status: 400 }
            )
        }

        await connectDB()

        const body = await request.json()
        const { status } = body

        if (status && !["new", "read"].includes(status)) {
            return NextResponse.json(
                { success: false, message: "Status must be 'new' or 'read'" },
                { status: 400 }
            )
        }

        const enquiry = await Enquiry.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        )

        if (!enquiry) {
            return NextResponse.json(
                { success: false, message: "Enquiry not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { success: true, data: enquiry },
            { status: 200 }
        )
    } catch (error) {
        console.error("PATCH /api/enquiries/[id] error:", error)

        return NextResponse.json(
            { success: false, message: "Failed to update enquiry" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        if (!isValidId(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid enquiry id" },
                { status: 400 }
            )
        }

        await connectDB()

        const enquiry = await Enquiry.findByIdAndDelete(id)

        if (!enquiry) {
            return NextResponse.json(
                { success: false, message: "Enquiry not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { success: true, message: "Enquiry deleted" },
            { status: 200 }
        )
    } catch (error) {
        console.error("DELETE /api/enquiries/[id] error:", error)

        return NextResponse.json(
            { success: false, message: "Failed to delete enquiry" },
            { status: 500 }
        )
    }
}
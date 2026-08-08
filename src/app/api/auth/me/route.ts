import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export async function GET(request: NextRequest) {
    try {
        if (!JWT_SECRET) {
            return NextResponse.json(
                { success: false, message: "Server misconfiguration" },
                { status: 500 }
            )
        }

        const token = request.cookies.get("admin_session")?.value

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Not authenticated" },
                { status: 401 }
            )
        }

        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: string
            email: string
            role: string
        }

        return NextResponse.json(
            { success: true, data: decoded },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Invalid or expired session" },
            { status: 401 }
        )
    }
}
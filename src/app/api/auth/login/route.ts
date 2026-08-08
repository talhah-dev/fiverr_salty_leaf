import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import connectDB from "@/config/mongoDB"
import Admin from "@/models/Admin"

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(request: NextRequest) {
    try {
        if (!JWT_SECRET) {
            console.error("Missing JWT_SECRET environment variable")
            return NextResponse.json(
                { success: false, message: "Server misconfiguration" },
                { status: 500 }
            )
        }

        await connectDB()

        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            )
        }

        const admin = await Admin.findOne({ email: email.toLowerCase() }).select(
            "+password"
        )

        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Invalid email or password" },
                { status: 401 }
            )
        }

        const isValidPassword = await bcrypt.compare(password, admin.password)

        if (!isValidPassword) {
            return NextResponse.json(
                { success: false, message: "Invalid email or password" },
                { status: 401 }
            )
        }

        const token = jwt.sign(
            { id: admin._id.toString(), email: admin.email, role: admin.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        )

        const response = NextResponse.json(
            {
                success: true,
                data: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                },
            },
            { status: 200 }
        )

        response.cookies.set("admin_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        })

        return response
    } catch (error) {
        console.error("POST /api/auth/login error:", error)

        return NextResponse.json(
            { success: false, message: "Login failed" },
            { status: 500 }
        )
    }
}
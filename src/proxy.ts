import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (pathname === "/admin/login") {
        return NextResponse.next()
    }

    const token = request.cookies.get("admin_session")?.value

    if (!token || !JWT_SECRET) {
        return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
        jwt.verify(token, JWT_SECRET)
        return NextResponse.next()
    } catch {
        return NextResponse.redirect(new URL("/admin/login", request.url))
    }
}

export const config = {
    matcher: ["/admin/:path*"],
    // runtime: "nodejs",
}
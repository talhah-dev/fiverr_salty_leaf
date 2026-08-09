import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname) => {
                const cookieStore = await cookies()
                const token = cookieStore.get("admin_session")?.value

                if (!token || !JWT_SECRET) {
                    throw new Error("Not authenticated")
                }

                try {
                    jwt.verify(token, JWT_SECRET)
                } catch {
                    throw new Error("Invalid or expired session")
                }

                return {
                    allowedContentTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/webp",
                        "image/avif",
                    ],
                    addRandomSuffix: true,
                    maximumSizeInBytes: 10 * 1024 * 1024,
                    tokenPayload: JSON.stringify({ pathname }),
                }
            },
            onUploadCompleted: async ({ blob }) => {
                console.log("Blob upload completed:", blob.url)
            },
        })

        return NextResponse.json(jsonResponse)
    } catch (error) {
        console.error("POST /api/gallery/upload error:", error)

        return NextResponse.json(
            {
                error:
                    error instanceof Error ? error.message : "Upload failed",
            },
            { status: 400 }
        )
    }
}
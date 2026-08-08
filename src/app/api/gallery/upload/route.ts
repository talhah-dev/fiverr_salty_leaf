import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname) => {
                // TODO: once admin auth is wired up, verify the session here
                // and throw if the request isn't from a logged-in admin.

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
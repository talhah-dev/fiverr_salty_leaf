import { NextRequest, NextResponse } from "next/server"
import { BetaAnalyticsDataClient } from "@google-analytics/data"

const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY

const RANGE_OPTIONS: Record<string, string> = {
    "7d": "7daysAgo",
    "30d": "30daysAgo",
    "90d": "90daysAgo",
    "12m": "365daysAgo",
}

function getClient() {
    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        throw new Error("Missing Google Analytics service account credentials")
    }

    return new BetaAnalyticsDataClient({
        credentials: {
            client_email: GOOGLE_CLIENT_EMAIL,
            private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        },
    })
}

export async function GET(request: NextRequest) {
    try {
        if (!GA_PROPERTY_ID) {
            return NextResponse.json(
                { success: false, connected: false, message: "GA_PROPERTY_ID not set" },
                { status: 200 }
            )
        }

        if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
            return NextResponse.json(
                {
                    success: false,
                    connected: false,
                    message: "Google service account credentials not set",
                },
                { status: 200 }
            )
        }

        const { searchParams } = new URL(request.url)
        const rangeParam = searchParams.get("range") || "30d"
        const startDate = RANGE_OPTIONS[rangeParam] ?? RANGE_OPTIONS["30d"]

        const client = getClient()

        const [summary] = await client.runReport({
            property: `properties/${GA_PROPERTY_ID}`,
            dateRanges: [{ startDate, endDate: "today" }],
            metrics: [
                { name: "activeUsers" },
                { name: "averageSessionDuration" },
                { name: "screenPageViews" },
                { name: "sessions" },
                { name: "engagementRate" },
            ],
        })

        // Use monthly buckets for the 12-month view so the chart stays readable,
        // daily buckets for everything shorter.
        const isYearView = rangeParam === "12m"

        const [timelineReport] = await client.runReport({
            property: `properties/${GA_PROPERTY_ID}`,
            dateRanges: [{ startDate, endDate: "today" }],
            dimensions: [{ name: isYearView ? "yearMonth" : "date" }],
            metrics: [{ name: "activeUsers" }],
            orderBys: [
                {
                    dimension: { dimensionName: isYearView ? "yearMonth" : "date" },
                },
            ],
        })

        const [topPages] = await client.runReport({
            property: `properties/${GA_PROPERTY_ID}`,
            dateRanges: [{ startDate, endDate: "today" }],
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "screenPageViews" }],
            orderBys: [
                { metric: { metricName: "screenPageViews" }, desc: true },
            ],
            limit: 5,
        })

        const row = summary.rows?.[0]?.metricValues

        const activeUsers = Number(row?.[0]?.value ?? 0)
        const avgSessionSeconds = Number(row?.[1]?.value ?? 0)
        const pageViews = Number(row?.[2]?.value ?? 0)
        const sessions = Number(row?.[3]?.value ?? 0)
        const engagementRate = Number(row?.[4]?.value ?? 0)

        const timeline =
            timelineReport.rows?.map((r) => ({
                date: r.dimensionValues?.[0]?.value ?? "",
                users: Number(r.metricValues?.[0]?.value ?? 0),
            })) ?? []

        const pages =
            topPages.rows?.map((r) => ({
                path: r.dimensionValues?.[0]?.value ?? "",
                views: Number(r.metricValues?.[0]?.value ?? 0),
            })) ?? []

        const minutes = Math.floor(avgSessionSeconds / 60)
        const seconds = Math.round(avgSessionSeconds % 60)

        return NextResponse.json(
            {
                success: true,
                connected: true,
                range: rangeParam,
                data: {
                    activeUsers,
                    sessions,
                    pageViews,
                    avgEngagement: `${minutes}m ${seconds}s`,
                    engagementRate: `${(engagementRate * 100).toFixed(1)}%`,
                    timeline,
                    topPages: pages,
                },
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("GET /api/analytics error:", error)

        return NextResponse.json(
            {
                success: false,
                connected: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch analytics data",
            },
            { status: 200 }
        )
    }
}
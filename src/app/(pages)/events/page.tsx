import type { Metadata } from "next"
import Events from "@/components/Events"
import React from "react"

export const metadata: Metadata = {
    title: "Event Florist",
    description:
        "Event florals for corporate functions, private celebrations and special occasions in Mandurah, WA. Salty Leaf brings atmosphere and character to every event.",
    alternates: {
        canonical: "/events",
    },
    openGraph: {
        title: "Event Florist | Salty Leaf",
        description:
            "Event florals for corporate functions, private celebrations and special occasions in Mandurah, WA.",
        url: "/events",
        images: [
            {
                url: "/og-events.jpg",
                width: 1200,
                height: 630,
                alt: "Salty Leaf event florals",
            },
        ],
    },
}

export default function EventsPage() {
    return (
        <div className="">
            <Events />
        </div>
    )
}
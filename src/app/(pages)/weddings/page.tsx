import type { Metadata } from "next"
import Wedding from '@/components/Wedding'
import React from 'react'

export const metadata: Metadata = {
    title: "Wedding Florist",
    description:
        "Bespoke wedding flowers in Mandurah, WA. From bridal bouquets to ceremony arches and reception centrepieces, Salty Leaf designs florals that reflect your story.",
    alternates: {
        canonical: "/weddings",
    },
    openGraph: {
        title: "Wedding Florist | Salty Leaf",
        description:
            "Bespoke wedding flowers in Mandurah, WA. Bridal bouquets, ceremony arches and reception centrepieces designed with care.",
        url: "/weddings",
        images: [
            {
                url: "/og-weddings.jpg",
                width: 1200,
                height: 630,
                alt: "Salty Leaf wedding florals",
            },
        ],
    },
}

export default function page() {
    return (
        <div className="">
            <Wedding />
        </div>
    )
}
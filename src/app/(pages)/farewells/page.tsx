import type { Metadata } from "next"
import Farewell from "@/components/Farewell"
import React from "react"

export const metadata: Metadata = {
    title: "Funeral & Farewell Flowers",
    description:
        "Thoughtful funeral and farewell flowers in Mandurah, WA. Salty Leaf creates floral tributes designed with care, respect and compassion for life's most meaningful moments.",
    alternates: {
        canonical: "/farewells",
    },
    openGraph: {
        title: "Funeral & Farewell Flowers | Salty Leaf",
        description:
            "Thoughtful funeral and farewell flowers in Mandurah, WA, designed with care, respect and compassion.",
        url: "/farewells",
        images: [
            {
                url: "/og-farewells.jpg",
                width: 1200,
                height: 630,
                alt: "Salty Leaf farewell florals",
            },
        ],
    },
}

export default function FarewellsPage() {
    return (
        <div className="">
            <Farewell />
        </div>
    )
}
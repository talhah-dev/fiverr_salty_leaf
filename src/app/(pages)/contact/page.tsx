import type { Metadata } from "next"
import Contact from "@/components/Contact"
import React from "react"

export const metadata: Metadata = {
    title: "Contact & Enquiries",
    description:
        "Get in touch with Salty Leaf, Mandurah's florist for weddings, farewells and events. Send an enquiry and let's create something beautiful together.",
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact & Enquiries | Salty Leaf",
        description:
            "Get in touch with Salty Leaf, Mandurah's florist for weddings, farewells and events.",
        url: "/contact",
        images: [
            {
                url: "/og-contact.jpg",
                width: 1200,
                height: 630,
                alt: "Salty Leaf florist",
            },
        ],
    },
}

export default function ContactPage() {
    return (
        <div className="">
            <Contact />
        </div>
    )
}
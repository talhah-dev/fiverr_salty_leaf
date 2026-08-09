import type { Metadata } from "next"
import React from "react"
import Navbar from "@/components/Navbar"
import CategorySection from "@/components/home/CategorySection"
import ContactSection from "@/components/home/ContactSection"
import Hero from "@/components/home/Hero"

export const metadata: Metadata = {
    title: "Florist in Mandurah, WA",
    description:
        "Salty Leaf is a Mandurah-based florist crafting thoughtful floral experiences for weddings, farewells and events. Bespoke, seasonal, made with care.",
    alternates: {
        canonical: "/",
    },
}

export default function HomePg() {
    return (
        <main>
            <section className="relative h-screen min-h-[650px] w-full overflow-hidden">
                <Navbar />

                <Hero />
                <div className="absolute inset-0 md:bg-black/10 bg-black/35" />
            </section>


            <CategorySection />

            <ContactSection />
        </main>
    )
}
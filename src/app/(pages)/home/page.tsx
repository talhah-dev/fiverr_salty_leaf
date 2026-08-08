"use client"

import React from "react"
import { motion } from "motion/react"
import Navbar from "@/components/Navbar"
import CategorySection from "@/components/home/CategorySection"
import ContactSection from "@/components/home/ContactSection"

export default function HomePg() {
    return (
        <main>
            <section className="relative h-screen min-h-[650px] w-full overflow-hidden">
                <Navbar />

                <motion.img
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    src="/homebg.png"
                    alt="Wedding ceremony"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </section>

            <CategorySection />

            <ContactSection />
        </main>
    )
}
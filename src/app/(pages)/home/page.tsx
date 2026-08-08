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
                    src="https://images.unsplash.com/photo-1595407753234-0882f1e77954?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Wedding ceremony"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </section>

            <CategorySection />

            <ContactSection />
        </main>
    )
}
"use client"

import React from "react"
import { motion } from "motion/react"

const categories = [
    {
        title: "WEDDINGS",
        image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        href: "/weddings",
    },
    {
        title: "FAREWELLS",
        image: "https://plus.unsplash.com/premium_photo-1675720042825-84e20074f34a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D",
        href: "/farewells",
    },
    {
        title: "EVENTS",
        image: "https://plus.unsplash.com/premium_photo-1673897888993-a1db844c2ca1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
        href: "/events",
    },
]

export default function CategorySection() {
    return (
        <section className="w-full">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                className="grid w-full grid-cols-1 md:grid-cols-3"
            >
                {categories.map((category) => (
                    <motion.a
                        key={category.title}
                        href={category.href}
                        variants={{
                            hidden: { opacity: 0, y: 40 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="group relative block h-[600px] overflow-hidden sm:h-[700px] lg:h-[760px]"
                    >
                        <motion.img
                            src={category.image}
                            alt={category.title}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-light uppercase tracking-[-0.03em] text-white sm:text-6xl lg:text-[68px]">
                                {category.title}
                            </h2>
                        </div>
                    </motion.a>
                ))}
            </motion.div>
        </section>
    )
}
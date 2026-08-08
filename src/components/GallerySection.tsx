"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import { X } from "lucide-react"

const galleryImages = [
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595407753234-0882f1e77954?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1561593367-66c79c2294e6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595407753234-0882f1e77954?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1561593367-66c79c2294e6?q=80&w=800&auto=format&fit=crop",
]

export default function GallerySection() {
    const doorContainerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const { scrollYProgress } = useScroll({
        target: doorContainerRef,
        offset: ["start start", "end end"],
    })

    const topY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
    const bottomY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
    const labelOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    useEffect(() => {
        document.body.style.overflow = activeIndex !== null ? "hidden" : ""

        return () => {
            document.body.style.overflow = ""
        }
    }, [activeIndex])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveIndex(null)
        }

        window.addEventListener("keydown", handleKey)

        return () => window.removeEventListener("keydown", handleKey)
    }, [])

    return (
        <section className="relative w-full bg-[#faf9f6]">
            <div ref={doorContainerRef} className="relative h-[150vh] w-full">
                <div className="sticky top-0 z-10 h-screen w-full overflow-hidden">
                    <motion.div
                        style={{ y: topY }}
                        className="absolute inset-x-0 top-0 h-1/2 w-full overflow-hidden bg-[#435236]"
                    >
                        <motion.span
                            style={{ opacity: labelOpacity }}
                            className="absolute inset-x-0 bottom-0 translate-y-1/2 text-center font-[family-name:var(--font-cormorant)] text-[22vw] font-bold uppercase leading-none tracking-[-0.03em] text-[#f5f0e7] sm:text-[18vw] lg:text-[15vw]"
                        >
                            Gallery
                        </motion.span>
                    </motion.div>

                    <motion.div
                        style={{ y: bottomY }}
                        className="absolute inset-x-0 bottom-0 h-1/2 w-full overflow-hidden bg-[#435236]"
                    >
                        <motion.span
                            style={{ opacity: labelOpacity }}
                            className="absolute inset-x-0 top-0 -translate-y-1/2 text-center font-[family-name:var(--font-cormorant)] text-[22vw] font-bold uppercase leading-none tracking-[-0.03em] text-[#f5f0e7] sm:text-[18vw] lg:text-[15vw]"
                        >
                            Gallery
                        </motion.span>
                    </motion.div>
                </div>
            </div>

            <div className="relative z-0 -mt-[100vh] grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 sm:gap-3 sm:p-3 lg:grid-cols-4">
                {galleryImages.map((src, i) => (
                    <motion.button
                        key={`${src}-${i}`}
                        type="button"
                        layoutId={`gallery-image-${i}`}
                        onClick={() => setActiveIndex(i)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`relative aspect-square cursor-pointer overflow-hidden ${i % 5 === 0 ? "sm:row-span-2 sm:aspect-auto" : ""
                            }`}
                    >
                        <img
                            src={src}
                            alt="Gallery"
                            className="h-full w-full object-cover"
                        />
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {activeIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        onClick={() => setActiveIndex(null)}
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 sm:p-10"
                    >
                        <motion.button
                            type="button"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                            onClick={() => setActiveIndex(null)}
                            aria-label="Close"
                            className="absolute right-5 top-5 z-10 text-[#f5f0e7] transition-opacity hover:opacity-60 sm:right-8 sm:top-8"
                        >
                            <X className="h-8 w-8" strokeWidth={1.5} />
                        </motion.button>

                        <motion.img
                            key={activeIndex}
                            layoutId={`gallery-image-${activeIndex}`}
                            src={galleryImages[activeIndex]}
                            alt="Gallery expanded"
                            onClick={(e) => e.stopPropagation()}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="max-h-full max-w-full cursor-zoom-out object-contain"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
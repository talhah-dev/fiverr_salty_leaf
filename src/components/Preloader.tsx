"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const TARGET_TEXT = "SALTY LEAF"
const CHAR_STAGGER = 0.06
const CHAR_DURATION = 0.7
const HOLD_DURATION = 700
const WIPE_DURATION = 900

const revealDelay =
    TARGET_TEXT.length * CHAR_STAGGER * 1000 + CHAR_DURATION * 1000

export default function Preloader() {
    const [phase, setPhase] = useState<"reveal" | "hold" | "wipe" | "done">(
        "reveal"
    )

    useEffect(() => {
        if (phase !== "reveal") return

        const timeout = setTimeout(() => setPhase("hold"), revealDelay)

        return () => clearTimeout(timeout)
    }, [phase])

    useEffect(() => {
        if (phase !== "hold") return

        const timeout = setTimeout(() => setPhase("wipe"), HOLD_DURATION)

        return () => clearTimeout(timeout)
    }, [phase])

    useEffect(() => {
        if (phase !== "wipe") return

        const timeout = setTimeout(() => setPhase("done"), WIPE_DURATION)

        return () => clearTimeout(timeout)
    }, [phase])

    useEffect(() => {
        document.body.style.overflow = phase === "done" ? "" : "hidden"

        return () => {
            document.body.style.overflow = ""
        }
    }, [phase])

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: phase === "wipe" ? "-100vh" : 0 }}
                    exit={{ y: "-100vh" }}
                    transition={{ duration: WIPE_DURATION / 1000, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center overflow-hidden bg-[#435236]"
                >
                    <div
                        aria-label={TARGET_TEXT}
                        className="flex select-none font-[family-name:var(--font-cormorant)] text-5xl font-light uppercase tracking-[0.05em] text-[#f5f0e7]  lg:text-8xl"
                    >
                        {TARGET_TEXT.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                aria-hidden="true"
                                initial={{ opacity: 0, y: "60%", filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                                transition={{
                                    duration: CHAR_DURATION,
                                    delay: i * CHAR_STAGGER,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                style={{ display: "inline-block", whiteSpace: "pre" }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
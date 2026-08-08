"use client"

import React from "react"
import { motion } from "motion/react"
import { LuInstagram } from "react-icons/lu"
import { PiFacebookLogo } from "react-icons/pi"
import Link from "next/link"

const MotionLink = motion.create(Link)

export default function ContactSection() {
    return (
        <section className="w-full bg-[#435236] px-6 py-24 sm:px-10 sm:py-28 lg:px-14 lg:py-40">
            <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-32">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="flex items-start"
                >
                    <h2 className="max-w-xl font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[0.95] tracking-[-0.035em] text-[#f5f0e7] sm:text-6xl lg:text-[72px]">
                        Let’s create
                        <br />
                        something
                        <br />
                        unique together.
                    </h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
                    className="font-[family-name:var(--font-inter)] text-sm text-[#f5f0e7] sm:text-base"
                >
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-10"
                    >
                        <h3 className=" md:text-lg mb-2 font-semibold">
                            Address
                        </h3>

                        <p className=" md:text-lg font-normal leading-relaxed">
                            5/10 Rafferty Road, Mandurah 6210
                        </p>
                    </motion.div>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className=" mb-10"
                    >
                        <h3 className=" md:text-lg mb-2 font-semibold">
                            Phone
                        </h3>

                        <Link
                            href="tel:0424469349"
                            className=" md:text-lg transition-opacity hover:opacity-60"
                        >
                            0424469349
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-10"
                    >
                        <h3 className="mb-2 font-semibold md:text-lg">
                            Email
                        </h3>

                        <Link
                            href="mailto:florist@saltyleaf.com.au"
                            className="transition-opacity md:text-lg hover:opacity-60"
                        >
                            florist@saltyleaf.com.au
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h3 className="mb-3 font-semibold">
                            Socials
                        </h3>

                        <div className="flex items-center gap-3">
                            <MotionLink
                                href="#"
                                aria-label="Instagram"
                                whileHover={{ scale: 1.15, opacity: 0.7 }}
                                transition={{ duration: 0.3 }}
                            >
                                <LuInstagram
                                    className="h-8 w-8"
                                    strokeWidth={1.5}
                                />
                            </MotionLink>

                            <MotionLink
                                href="#"
                                aria-label="Facebook"
                                whileHover={{ scale: 1.15, opacity: 0.7 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PiFacebookLogo
                                    className="h-9 w-9"
                                    strokeWidth={1.5}
                                />
                            </MotionLink>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
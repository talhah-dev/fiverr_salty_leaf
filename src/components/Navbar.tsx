"use client"

import React, { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

const navItems = [
    { name: "Home", href: "/" },
    { name: "Weddings", href: "/weddings" },
    { name: "Farewells", href: "/farewells" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="absolute top-0 left-0 z-50 w-full">
            <div className="mx-auto flex h-24 max-w-[1500px] items-center justify-between px-6 sm:px-10 lg:px-14">
                <Link
                    href="/"
                    className="font-[family-name:var(--font-cormorant)] text-5xl font-light tracking-[-0.04em] text-white sm:text-7xl"
                >
                    {/* Salty Leaf */}

                    <img src="/logo.png" className="md:h-24 h-16 brightness-0 invert" alt="" />

                </Link>

                <nav className="hidden items-center gap-10 lg:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="font-[family-name:var(--font-cormorant)] uppercase tracking-[0.08em] text-white font-medium text-xl transition-opacity duration-300 hover:opacity-60"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
                >
                    {isOpen ? (
                        <X className="h-7 w-7" strokeWidth={1.5} />
                    ) : (
                        <Menu className="h-7 w-7" strokeWidth={1.5} />
                    )}
                </button>
            </div>

            <div
                className={`absolute left-0 top-24 w-full overflow-hidden bg-black/90 backdrop-blur-md transition-all duration-500 ease-in-out lg:hidden ${isOpen
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
            >
                <nav className="flex flex-col px-8 py-6">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`border-b border-white/20 py-5 font-[family-name:var(--font-inter)] text-sm font-light uppercase tracking-[0.12em] text-white transition-all duration-500 ${isOpen
                                ? "translate-y-0 opacity-100"
                                : "translate-y-3 opacity-0"
                                }`}
                            style={{
                                transitionDelay: `${index * 60}ms`,
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}
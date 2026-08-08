"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
    BarChart3,
    Image as ImageIcon,
    Inbox,
    LogOut,
    ArrowLeft,
    X,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Loader2,
} from "lucide-react"

const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3, active: false },
    { name: "Enquiries", href: "/admin/enquiries", icon: Inbox, active: true },
    { name: "Gallery Upload", href: "/admin/gallery", icon: ImageIcon, active: false },
]

type Enquiry = {
    _id: string
    name: string
    email: string
    phone: string
    eventType: string
    eventDate: string
    venue: string
    message: string
    createdAt: string
    status: "new" | "read"
}

function formatDate(iso: string) {
    if (!iso) return "—"

    return new Date(iso).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}

function formatSubmittedAt(iso: string) {
    return new Date(iso).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
    })
}

function formatEventType(eventType: string) {
    return eventType.charAt(0).toUpperCase() + eventType.slice(1)
}

export default function AdminEnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const [selected, setSelected] = useState<Enquiry | null>(null)
    const [isPanelMounted, setIsPanelMounted] = useState(false)
    const [isPanelVisible, setIsPanelVisible] = useState(false)

    const fetchEnquiries = async () => {
        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("/api/enquiries", {
                cache: "no-store",
            })

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Failed to load enquiries")
            }

            setEnquiries(result.data)
        } catch (err) {
            console.error("Failed to fetch enquiries:", err)
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong loading enquiries"
            )
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchEnquiries()
    }, [])

    const markAsRead = async (enquiry: Enquiry) => {
        if (enquiry.status === "read") return

        try {
            const response = await fetch(`/api/enquiries/${enquiry._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "read" }),
            })

            const result = await response.json()

            if (!response.ok || !result.success) return

            setEnquiries((prev) =>
                prev.map((item) =>
                    item._id === enquiry._id ? { ...item, status: "read" } : item
                )
            )
        } catch (err) {
            console.error("Failed to mark enquiry as read:", err)
        }
    }

    const openPanel = (enquiry: Enquiry) => {
        setSelected(enquiry)
        setIsPanelMounted(true)
        markAsRead(enquiry)
    }

    const closePanel = () => {
        setIsPanelVisible(false)
        window.setTimeout(() => {
            setIsPanelMounted(false)
            setSelected(null)
        }, 300)
    }

    useEffect(() => {
        if (isPanelMounted) {
            const frame = requestAnimationFrame(() => setIsPanelVisible(true))
            return () => cancelAnimationFrame(frame)
        }
    }, [isPanelMounted])

    useEffect(() => {
        if (!isPanelMounted) return
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = ""
        }
    }, [isPanelMounted])

    return (
        <div className="flex min-h-screen w-full bg-[#f8f5ef]">
            <aside className="hidden w-64 flex-col justify-between border-r border-[#e3e0d6] bg-[#faf9f6] px-6 py-8 lg:flex">
                <div>
                    <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-light uppercase tracking-[-0.02em] text-[#1f211d]">
                        Salty Leaf
                    </h1>

                    <p className="mt-1 font-[family-name:var(--font-inter)] text-[10px] font-medium uppercase tracking-[0.2em] text-[#8a8678]">
                        Admin Panel
                    </p>

                    <nav className="mt-12 flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-3 rounded-md px-4 py-3 font-[family-name:var(--font-inter)] text-sm font-medium transition-colors duration-200 ${link.active
                                    ? "bg-[#435236] text-[#f5f0e7]"
                                    : "text-[#55554e] hover:bg-[#eeece3]"
                                    }`}
                            >
                                <link.icon className="h-4 w-4" strokeWidth={1.75} />
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-col gap-1 border-t border-[#e3e0d6] pt-6">
                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-md px-4 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-[#55554e] transition-colors duration-200 hover:bg-[#eeece3]"
                    >
                        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                        Back to Website
                    </Link>

                    <button
                        type="button"
                        className="flex items-center gap-3 rounded-md px-4 py-3 text-left font-[family-name:var(--font-inter)] text-sm font-medium text-red-800 transition-colors duration-200 hover:bg-red-50"
                    >
                        <LogOut className="h-4 w-4" strokeWidth={1.75} />
                        Log Out
                    </button>
                </div>
            </aside>

            <main className="flex-1 px-6 py-8 sm:px-10 sm:py-10">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1f211d]">
                            Enquiries
                        </h2>

                        <p className="mt-1 font-[family-name:var(--font-inter)] text-sm text-[#8a8678]">
                            {isLoading
                                ? "Loading submissions..."
                                : `${enquiries.length} submissions from the contact form`}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 lg:hidden">
                        <Link
                            href="/"
                            aria-label="Back to website"
                            className="flex h-10 w-10 items-center justify-center rounded-md border border-[#e3e0d6] text-[#55554e]"
                        >
                            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                        </Link>

                        <button
                            type="button"
                            aria-label="Log out"
                            className="flex h-10 w-10 items-center justify-center rounded-md border border-[#e3e0d6] text-red-800"
                        >
                            <LogOut className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                    </div>
                </div>

                {isLoading && (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-[#e3e0d6] bg-[#faf9f6] py-20">
                        <Loader2
                            className="h-6 w-6 animate-spin text-[#8a8678]"
                            strokeWidth={1.75}
                        />
                        <p className="font-[family-name:var(--font-inter)] text-sm text-[#8a8678]">
                            Loading enquiries...
                        </p>
                    </div>
                )}

                {!isLoading && error && (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 py-20 text-center">
                        <p className="font-[family-name:var(--font-inter)] text-sm text-red-800">
                            {error}
                        </p>
                        <button
                            type="button"
                            onClick={fetchEnquiries}
                            className="border border-red-800 px-5 py-2 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-red-800 transition-colors duration-200 hover:bg-red-800 hover:text-white"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!isLoading && !error && enquiries.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#d8d6cf] bg-[#faf9f6] py-20 text-center">
                        <Inbox className="h-8 w-8 text-[#c9c5b8]" strokeWidth={1.5} />
                        <p className="font-[family-name:var(--font-cormorant)] text-xl text-[#1f211d]">
                            No enquiries yet
                        </p>
                        <p className="font-[family-name:var(--font-inter)] text-sm text-[#8a8678]">
                            Submissions from the contact form will appear here.
                        </p>
                    </div>
                )}

                {!isLoading && !error && enquiries.length > 0 && (
                    <div className="overflow-hidden rounded-lg border border-[#e3e0d6] bg-[#faf9f6]">
                        <div className="hidden grid-cols-[1.3fr_1fr_1fr_0.9fr_0.7fr] gap-4 border-b border-[#e3e0d6] px-6 py-3 font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8a8678] sm:grid">
                            <span>Name</span>
                            <span>Event Type</span>
                            <span>Event Date</span>
                            <span>Submitted</span>
                            <span>Status</span>
                        </div>

                        <ul>
                            {enquiries.map((enquiry) => (
                                <li key={enquiry._id}>
                                    <button
                                        type="button"
                                        onClick={() => openPanel(enquiry)}
                                        className="grid w-full grid-cols-1 gap-2 border-b border-[#e3e0d6] px-6 py-4 text-left transition-colors duration-150 last:border-b-0 hover:bg-[#f0eee3] sm:grid-cols-[1.3fr_1fr_1fr_0.9fr_0.7fr] sm:items-center sm:gap-4"
                                    >
                                        <div>
                                            <p className="font-[family-name:var(--font-cormorant)] text-lg font-medium text-[#1f211d]">
                                                {enquiry.name}
                                            </p>
                                            <p className="font-[family-name:var(--font-inter)] text-xs text-[#8a8678] sm:hidden">
                                                {formatEventType(enquiry.eventType)} ·{" "}
                                                {formatDate(enquiry.eventDate)}
                                            </p>
                                        </div>

                                        <span className="hidden font-[family-name:var(--font-inter)] text-sm text-[#55554e] sm:block">
                                            {formatEventType(enquiry.eventType)}
                                        </span>

                                        <span className="hidden font-[family-name:var(--font-inter)] text-sm text-[#55554e] sm:block">
                                            {formatDate(enquiry.eventDate)}
                                        </span>

                                        <span className="hidden font-[family-name:var(--font-inter)] text-sm text-[#8a8678] sm:block">
                                            {formatSubmittedAt(enquiry.createdAt)}
                                        </span>

                                        <span>
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-1 font-[family-name:var(--font-inter)] text-[10px] font-semibold uppercase tracking-[0.08em] ${enquiry.status === "new"
                                                    ? "bg-[#435236]/10 text-[#435236]"
                                                    : "bg-[#e3e0d6] text-[#8a8678]"
                                                    }`}
                                            >
                                                {enquiry.status}
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>

            {isPanelMounted && selected && (
                <>
                    <div
                        onClick={closePanel}
                        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ease-out ${isPanelVisible ? "opacity-100" : "opacity-0"
                            }`}
                    />

                    <div
                        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[#faf9f6] shadow-xl transition-transform duration-300 ease-out will-change-transform ${isPanelVisible ? "translate-x-0" : "translate-x-full"
                            }`}
                    >
                        <div className="flex items-center justify-between border-b border-[#e3e0d6] px-6 py-5">
                            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1f211d]">
                                Enquiry Details
                            </h3>

                            <button
                                type="button"
                                onClick={closePanel}
                                aria-label="Close"
                                className="text-[#55554e] transition-opacity hover:opacity-60"
                            >
                                <X className="h-5 w-5" strokeWidth={1.75} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-6">
                            <p className="font-[family-name:var(--font-cormorant)] text-3xl font-medium text-[#1f211d]">
                                {selected.name}
                            </p>

                            <span className="mt-2 inline-flex items-center rounded-full bg-[#435236]/10 px-2.5 py-1 font-[family-name:var(--font-inter)] text-[10px] font-semibold uppercase tracking-[0.08em] text-[#435236]">
                                {formatEventType(selected.eventType)}
                            </span>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center gap-3 font-[family-name:var(--font-inter)] text-sm text-[#35352e]">
                                    <Mail className="h-4 w-4 text-[#8a8678]" strokeWidth={1.75} />
                                    <a href={`mailto:${selected.email}`} className="hover:underline">
                                        {selected.email}
                                    </a>
                                </div>

                                {selected.phone && (
                                    <div className="flex items-center gap-3 font-[family-name:var(--font-inter)] text-sm text-[#35352e]">
                                        <Phone className="h-4 w-4 text-[#8a8678]" strokeWidth={1.75} />
                                        <a href={`tel:${selected.phone}`} className="hover:underline">
                                            {selected.phone}
                                        </a>
                                    </div>
                                )}

                                <div className="flex items-center gap-3 font-[family-name:var(--font-inter)] text-sm text-[#35352e]">
                                    <Calendar className="h-4 w-4 text-[#8a8678]" strokeWidth={1.75} />
                                    {formatDate(selected.eventDate)}
                                </div>

                                {selected.venue && (
                                    <div className="flex items-center gap-3 font-[family-name:var(--font-inter)] text-sm text-[#35352e]">
                                        <MapPin className="h-4 w-4 text-[#8a8678]" strokeWidth={1.75} />
                                        {selected.venue}
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 border-t border-[#e3e0d6] pt-6">
                                <p className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8678]">
                                    Message
                                </p>

                                <p className="mt-3 font-[family-name:var(--font-cormorant)] text-lg leading-relaxed text-[#35352e]">
                                    {selected.message}
                                </p>
                            </div>

                            <p className="mt-8 font-[family-name:var(--font-inter)] text-xs text-[#8a8678]">
                                Submitted {formatSubmittedAt(selected.createdAt)}
                            </p>
                        </div>

                        <div className="border-t border-[#e3e0d6] px-6 py-4">
                            <a
                                href={`mailto:${selected.email}`}
                                className="flex w-full items-center justify-center gap-2 border border-[#25251f] py-3 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.15em] text-[#25251f] transition-all duration-300 hover:bg-[#25251f] hover:text-[#f8f5ef]"
                            >
                                <Mail className="h-4 w-4" strokeWidth={1.75} />
                                Reply by Email
                            </a>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
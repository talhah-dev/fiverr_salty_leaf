import React from "react"
import Link from "next/link"
import {
    BarChart3,
    Image as ImageIcon,
    Inbox,
    LogOut,
    ArrowLeft,
    TrendingUp,
    Users,
    MousePointerClick,
} from "lucide-react"

const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3, active: true },
    { name: "Enquiries", href: "/admin/enquiries", icon: Inbox, active: false },
    { name: "Gallery Upload", href: "/admin/gallery", icon: ImageIcon, active: false },
]

const statCards = [
    { label: "New Enquiries", value: "12", icon: Inbox },
    { label: "Site Visitors (30d)", value: "3,204", icon: Users },
    { label: "Avg. Engagement", value: "2m 14s", icon: TrendingUp },
    { label: "Click-through Rate", value: "4.6%", icon: MousePointerClick },
]

export default function AdminDashboardPage() {
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
                            Dashboard
                        </h2>

                        <p className="mt-1 font-[family-name:var(--font-inter)] text-sm text-[#8a8678]">
                            An overview of enquiries and site activity.
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

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {statCards.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-lg border border-[#e3e0d6] bg-[#faf9f6] p-5"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-[0.1em] text-[#8a8678]">
                                    {stat.label}
                                </span>

                                <stat.icon
                                    className="h-4 w-4 text-[#8a8678]"
                                    strokeWidth={1.75}
                                />
                            </div>

                            <p className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl font-medium text-[#1f211d]">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 rounded-lg border border-[#e3e0d6] bg-[#faf9f6] p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1f211d]">
                                Google Analytics
                            </h3>

                            <p className="mt-1 font-[family-name:var(--font-inter)] text-xs text-[#8a8678]">
                                Traffic overview, last 30 days
                            </p>
                        </div>

                        <span className="rounded-full bg-[#eeece3] px-3 py-1 font-[family-name:var(--font-inter)] text-[10px] font-medium uppercase tracking-[0.1em] text-[#8a8678]">
                            Not Connected
                        </span>
                    </div>

                    <div className="flex h-64 w-full flex-col items-center justify-center rounded-md border border-dashed border-[#d8d6cf] bg-[#f8f5ef]">
                        <BarChart3
                            className="h-8 w-8 text-[#c9c5b8]"
                            strokeWidth={1.5}
                        />

                        <p className="mt-3 font-[family-name:var(--font-inter)] text-sm text-[#8a8678]">
                            Connect Google Analytics to see traffic data here.
                        </p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Link
                        href="/admin/enquiries"
                        className="group flex items-center justify-between rounded-lg border border-[#e3e0d6] bg-[#faf9f6] p-6 transition-colors duration-200 hover:border-[#435236]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#435236]/10">
                                <Inbox
                                    className="h-5 w-5 text-[#435236]"
                                    strokeWidth={1.75}
                                />
                            </div>

                            <div>
                                <p className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#1f211d]">
                                    Enquiries
                                </p>

                                <p className="font-[family-name:var(--font-inter)] text-xs text-[#8a8678]">
                                    View and manage form submissions
                                </p>
                            </div>
                        </div>

                        <span className="font-[family-name:var(--font-inter)] text-[#8a8678] transition-transform duration-200 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>

                    <Link
                        href="/admin/gallery"
                        className="group flex items-center justify-between rounded-lg border border-[#e3e0d6] bg-[#faf9f6] p-6 transition-colors duration-200 hover:border-[#435236]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#435236]/10">
                                <ImageIcon
                                    className="h-5 w-5 text-[#435236]"
                                    strokeWidth={1.75}
                                />
                            </div>

                            <div>
                                <p className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#1f211d]">
                                    Gallery Upload
                                </p>

                                <p className="font-[family-name:var(--font-inter)] text-xs text-[#8a8678]">
                                    Add or remove gallery images
                                </p>
                            </div>
                        </div>

                        <span className="font-[family-name:var(--font-inter)] text-[#8a8678] transition-transform duration-200 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            </main>
        </div>
    )
}
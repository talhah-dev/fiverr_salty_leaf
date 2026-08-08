"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
    BarChart3,
    Image as ImageIcon,
    Inbox,
    LogOut,
    ArrowLeft,
    UploadCloud,
    Trash2,
    X,
} from "lucide-react"

const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3, active: false },
    { name: "Enquiries", href: "/admin/enquiries", icon: Inbox, active: false },
    { name: "Gallery Upload", href: "/admin/gallery", icon: ImageIcon, active: true },
]

type GalleryImage = {
    id: string
    src: string
    uploadedAt: string
}

const initialImages: GalleryImage[] = [
    {
        id: "1",
        src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop",
        uploadedAt: "2026-08-01",
    },
    {
        id: "2",
        src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=600&auto=format&fit=crop",
        uploadedAt: "2026-07-28",
    },
    {
        id: "3",
        src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600&auto=format&fit=crop",
        uploadedAt: "2026-07-28",
    },
    {
        id: "4",
        src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=600&auto=format&fit=crop",
        uploadedAt: "2026-07-20",
    },
    {
        id: "5",
        src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format&fit=crop",
        uploadedAt: "2026-07-15",
    },
    {
        id: "6",
        src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600&auto=format&fit=crop",
        uploadedAt: "2026-07-10",
    },
]

type PendingFile = {
    id: string
    file: File
    previewUrl: string
}

export default function AdminGalleryPage() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [images, setImages] = useState<GalleryImage[]>(initialImages)
    const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null)
    const [isModalMounted, setIsModalMounted] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const addFiles = (fileList: FileList | null) => {
        if (!fileList) return

        const next: PendingFile[] = Array.from(fileList)
            .filter((file) => file.type.startsWith("image/"))
            .map((file) => ({
                id: `${file.name}-${file.lastModified}-${Math.random()}`,
                file,
                previewUrl: URL.createObjectURL(file),
            }))

        setPendingFiles((prev) => [...prev, ...next])
    }

    const removePendingFile = (id: string) => {
        setPendingFiles((prev) => prev.filter((item) => item.id !== id))
    }

    const handleUploadClick = () => {
        console.log("Uploading files:", pendingFiles.map((p) => p.file.name))
        setPendingFiles([])
    }

    const openDeleteModal = (image: GalleryImage) => {
        setDeleteTarget(image)
        setIsModalMounted(true)
    }

    const closeDeleteModal = () => {
        setIsModalVisible(false)
        window.setTimeout(() => {
            setIsModalMounted(false)
            setDeleteTarget(null)
        }, 250)
    }

    const confirmDelete = () => {
        if (!deleteTarget) return

        console.log("Deleting image:", deleteTarget.id)
        setImages((prev) => prev.filter((img) => img.id !== deleteTarget.id))
        closeDeleteModal()
    }

    useEffect(() => {
        if (isModalMounted) {
            const frame = requestAnimationFrame(() => setIsModalVisible(true))
            return () => cancelAnimationFrame(frame)
        }
    }, [isModalMounted])

    useEffect(() => {
        if (!isModalMounted) return
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = ""
        }
    }, [isModalMounted])

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
                            Gallery
                        </h2>

                        <p className="mt-1 font-[family-name:var(--font-inter)] text-sm text-[#8a8678]">
                            {images.length} images currently live on the site
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

                <div
                    onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragging(true)
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault()
                        setIsDragging(false)
                        addFiles(e.dataTransfer.files)
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-14 text-center transition-colors duration-200 ${isDragging
                        ? "border-[#435236] bg-[#435236]/5"
                        : "border-[#d8d6cf] bg-[#faf9f6] hover:border-[#bcb8af]"
                        }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => addFiles(e.target.files)}
                        className="hidden"
                    />

                    <UploadCloud
                        className="h-8 w-8 text-[#8a8678]"
                        strokeWidth={1.5}
                    />

                    <p className="mt-4 font-[family-name:var(--font-cormorant)] text-xl text-[#1f211d]">
                        Drag and drop images here
                    </p>

                    <p className="mt-1 font-[family-name:var(--font-inter)] text-xs text-[#8a8678]">
                        or click to browse — JPG, PNG up to 10MB each
                    </p>
                </div>

                {pendingFiles.length > 0 && (
                    <div className="mt-6 rounded-lg border border-[#e3e0d6] bg-[#faf9f6] p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8678]">
                                Ready to Upload ({pendingFiles.length})
                            </p>

                            <button
                                type="button"
                                onClick={handleUploadClick}
                                className="border border-[#25251f] px-5 py-2 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#25251f] transition-all duration-300 hover:bg-[#25251f] hover:text-[#f8f5ef]"
                            >
                                Upload All
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                            {pendingFiles.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative aspect-square overflow-hidden rounded-md"
                                >
                                    <img
                                        src={item.previewUrl}
                                        alt={item.file.name}
                                        className="h-full w-full object-cover"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removePendingFile(item.id)}
                                        aria-label="Remove"
                                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                    >
                                        <X className="h-3.5 w-3.5" strokeWidth={2} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-10">
                    <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8678]">
                        Current Gallery
                    </p>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="group relative aspect-square overflow-hidden rounded-md border border-[#e3e0d6]"
                            >
                                <img
                                    src={image.src}
                                    alt="Gallery"
                                    className="h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/50 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                    <span className="font-[family-name:var(--font-inter)] text-[10px] text-white">
                                        {image.uploadedAt}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => openDeleteModal(image)}
                                        aria-label="Delete image"
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-800 transition-colors duration-200 hover:bg-white"
                                    >
                                        <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {isModalMounted && deleteTarget && (
                <>
                    <div
                        onClick={closeDeleteModal}
                        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-250 ease-out ${isModalVisible ? "opacity-100" : "opacity-0"
                            }`}
                    />

                    <div
                        className={`fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 rounded-lg bg-[#faf9f6] p-6 shadow-xl transition-all duration-250 ease-out ${isModalVisible
                            ? "-translate-y-1/2 scale-100 opacity-100"
                            : "-translate-y-[calc(50%-8px)] scale-95 opacity-0"
                            }`}
                    >
                        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1f211d]">
                            Delete this image?
                        </h3>

                        <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-[#8a8678]">
                            This will remove it from the gallery permanently. This can&apos;t be undone.
                        </p>

                        <div className="mt-6 overflow-hidden rounded-md">
                            <img
                                src={deleteTarget.src}
                                alt="Gallery"
                                className="h-32 w-full object-cover"
                            />
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={closeDeleteModal}
                                className="flex-1 border border-[#d8d6cf] py-2.5 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#55554e] transition-colors duration-200 hover:bg-[#eeece3]"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="flex-1 bg-red-800 py-2.5 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-red-900"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
"use client"

import React, { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Invalid email or password")
            }

            router.push("/admin/dashboard")
            router.refresh()
        } catch (err) {
            console.error("Login failed:", err)
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong, please try again"
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-[#f8f5ef] px-6">
            <div className="w-full max-w-sm">
                <div className="text-center">
                    <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light uppercase tracking-[-0.02em] text-[#1f211d]">
                        Salty Leaf
                    </h1>

                    <p className="mt-2 font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-[0.2em] text-[#8a8678]">
                        Admin Access
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-12 space-y-7"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#44443d]"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@saltyleaf.com.au"
                            className="mt-3 h-12 w-full border-0 border-b border-[#bcb8af] bg-transparent px-0 font-[family-name:var(--font-cormorant)] text-xl text-[#25251f] outline-none placeholder:text-[#99958c] focus:border-[#25251f]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#44443d]"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="mt-3 h-12 w-full border-0 border-b border-[#bcb8af] bg-transparent px-0 font-[family-name:var(--font-cormorant)] text-xl text-[#25251f] outline-none placeholder:text-[#99958c] focus:border-[#25251f]"
                        />
                    </div>

                    {error && (
                        <p className="font-[family-name:var(--font-inter)] text-xs text-red-700">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-2 w-full border border-[#25251f] py-3.5 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.15em] text-[#25251f] transition-all duration-300 hover:bg-[#25251f] hover:text-[#f8f5ef] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </div>
        </main>
    )
}
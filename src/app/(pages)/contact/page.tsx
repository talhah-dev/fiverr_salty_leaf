"use client"

import React, { FormEvent, useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Check } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"

type FormData = {
    name: string
    email: string
    phone: string
    eventType: string
    venue: string
    message: string
}

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
}

export default function ContactPage() {
    const [date, setDate] = useState<Date>()
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        venue: "",
        message: "",
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formData.eventType) {
            toast.add({
                title: "Event type required",
                description: "Please select an event type before submitting.",
            })
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch("/api/enquiries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    eventDate: date ? format(date, "yyyy-MM-dd") : "",
                }),
            })

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Something went wrong")
            }

            toast.add({
                title: "Enquiry sent",
                description: "Thanks for reaching out, we'll be in touch soon.",
            })

            setSubmitted(true)

            setFormData({
                name: "",
                email: "",
                phone: "",
                eventType: "",
                venue: "",
                message: "",
            })
            setDate(undefined)
        } catch (error) {
            console.error("Enquiry submission failed:", error)

            toast.add({
                title: "Couldn't send enquiry",
                description:
                    error instanceof Error
                        ? error.message
                        : "Please check your connection and try again.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <main className="bg-[#f8f5ef]">
            <section className="relative min-h-[55vh] w-full overflow-hidden">
                <Navbar />

                <motion.img
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    src="/event1.jpeg"
                    alt="Floral wedding arrangement"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
                    }}
                    className="relative z-10 flex md:min-h-[35rem] min-h-[30rem] items-center justify-center px-6 pt-20 text-center"
                >
                    <div>
                        <motion.h1
                            variants={fadeUp}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-[family-name:var(--font-cormorant)] text-6xl font-light uppercase leading-none tracking-[-0.03em] text-white sm:text-7xl lg:text-8xl"
                        >
                            Enquire
                        </motion.h1>

                        <motion.div
                            variants={fadeUp}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mx-auto mt-6 h-[2px] w-20 bg-white"
                        />

                        <motion.p
                            variants={fadeUp}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mx-auto mt-5 max-w-xl font-[family-name:var(--font-cormorant)] text-2xl font-light text-white sm:text-3xl"
                        >
                            Let&apos;s create something beautiful together.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-14 lg:py-32">
                <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                        <p className="font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-[0.2em] text-[#55554e]">
                            Get In Touch
                        </p>

                        <h2 className="mt-6 max-w-lg font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[0.95] text-[#1f211d] sm:text-6xl lg:text-7xl">
                            Let&apos;s create something unique together.
                        </h2>

                        <div className="mt-10 h-[2px] w-20 bg-[#25251f]" />

                        <p className="mt-8 max-w-md font-[family-name:var(--font-cormorant)] text-xl font-medium leading-[1.4] text-[#35352e] sm:text-2xl">
                            Whether you&apos;re planning a wedding, farewell,
                            celebration or special event, we&apos;d love to
                            hear about it.
                        </p>

                        <div className="mt-14 space-y-8">
                            <div>
                                <p className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.15em] text-[#55554e]">
                                    Address
                                </p>

                                <p className="mt-2 font-[family-name:var(--font-cormorant)] text-xl text-[#25251f]">
                                    5/10 Rafferty Road,
                                    <br />
                                    Mandurah 6210
                                </p>
                            </div>

                            <div>
                                <p className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.15em] text-[#55554e]">
                                    Phone
                                </p>

                                <p className="mt-2 font-[family-name:var(--font-cormorant)] text-xl text-[#25251f]">
                                    0424469349
                                </p>
                            </div>

                            <div>
                                <p className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.15em] text-[#55554e]">
                                    Email
                                </p>

                                <p className="mt-2 font-[family-name:var(--font-cormorant)] text-xl text-[#25251f]">
                                    florist@saltyleaf.com.au
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="border-t border-[#d6d2ca] pt-8 lg:border-t-0 lg:pt-0"
                    >
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                            className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2"
                        >
                            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                                <label
                                    htmlFor="name"
                                    className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#44443d]"
                                >
                                    Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="mt-3 h-12 w-full border-0 border-b border-[#bcb8af] bg-transparent px-0 font-[family-name:var(--font-cormorant)] text-xl text-[#25251f] outline-none placeholder:text-[#99958c] focus:border-[#25251f]"
                                />
                            </motion.div>

                            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                                <label
                                    htmlFor="email"
                                    className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#44443d]"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your email"
                                    className="mt-3 h-12 w-full border-0 border-b border-[#bcb8af] bg-transparent px-0 font-[family-name:var(--font-cormorant)] text-xl text-[#25251f] outline-none placeholder:text-[#99958c] focus:border-[#25251f]"
                                />
                            </motion.div>

                            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                                <label
                                    htmlFor="phone"
                                    className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#44443d]"
                                >
                                    Phone
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Your phone number"
                                    className="mt-3 h-12 w-full border-0 border-b border-[#bcb8af] bg-transparent px-0 font-[family-name:var(--font-cormorant)] text-xl text-[#25251f] outline-none placeholder:text-[#99958c] focus:border-[#25251f]"
                                />
                            </motion.div>

                            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                                <label
                                    htmlFor="eventType"
                                    className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#44443d]"
                                >
                                    Event Type
                                </label>

                                <Select
                                    value={formData.eventType}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            eventType: value ?? "",
                                        }))
                                    }
                                >
                                    <SelectTrigger className="mt-7 h-12 w-full rounded-none border-0 border-b border-[#bcb8af] bg-transparent px-0 font-[family-name:var(--font-cormorant)] text-xl font-normal text-[#25251f] shadow-none focus:ring-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Select an event" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="wedding">
                                            Wedding
                                        </SelectItem>

                                        <SelectItem value="farewell">
                                            Farewell
                                        </SelectItem>

                                        <SelectItem value="corporate">
                                            Corporate Event
                                        </SelectItem>

                                        <SelectItem value="private">
                                            Private Celebration
                                        </SelectItem>

                                        <SelectItem value="birthday">
                                            Birthday
                                        </SelectItem>

                                        <SelectItem value="anniversary">
                                            Anniversary
                                        </SelectItem>

                                        <SelectItem value="other">
                                            Other Event
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </motion.div>

                            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                                <label
                                    htmlFor="eventDate"
                                    className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#44443d]"
                                >
                                    Event Date
                                </label>

                                <Popover>
                                    <PopoverTrigger
                                        render={
                                            <Button
                                                variant="ghost"
                                                data-empty={!date}
                                                className="mt-3 h-12 w-full justify-between rounded-none border-0 border-b border-[#bcb8af] bg-transparent px-0 font-[family-name:var(--font-cormorant)] text-xl font-normal text-[#25251f] shadow-none hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 data-[empty=true]:text-[#99958c]"
                                            />
                                        }
                                    >
                                        <span>
                                            {date
                                                ? format(date, "MM/dd/yyyy")
                                                : "mm/dd/yyyy"}
                                        </span>

                                        <CalendarIcon className="h-5 w-5 text-[#25251f]" />
                                    </PopoverTrigger>

                                    <PopoverContent
                                        align="start"
                                        className="w-auto rounded-none border-[#d6d2ca] bg-[#f8f5ef] p-0"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </motion.div>

                            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                                <label
                                    htmlFor="venue"
                                    className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#44443d]"
                                >
                                    Venue / Location
                                </label>

                                <input
                                    id="venue"
                                    name="venue"
                                    type="text"
                                    value={formData.venue}
                                    onChange={handleChange}
                                    placeholder="Event location"
                                    className="mt-3 h-12 w-full border-0 border-b border-[#bcb8af] bg-transparent px-0 font-[family-name:var(--font-cormorant)] text-xl text-[#25251f] outline-none placeholder:text-[#99958c] focus:border-[#25251f]"
                                />
                            </motion.div>

                            <motion.div
                                variants={fadeUp}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="sm:col-span-2"
                            >
                                <label
                                    htmlFor="message"
                                    className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.12em] text-[#44443d]"
                                >
                                    Tell Us About Your Event
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us a little about your event, your ideas and what you are looking for..."
                                    className="mt-3 w-full resize-none border-0 border-b border-[#bcb8af] bg-transparent px-0 py-3 font-[family-name:var(--font-cormorant)] text-xl leading-[1.4] text-[#25251f] outline-none placeholder:text-[#99958c] focus:border-[#25251f]"
                                />
                            </motion.div>
                        </motion.div>

                        <div className="mt-10">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="inline-flex items-center gap-3 border border-[#25251f] px-8 py-4 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.15em] text-[#25251f]"
                                    >
                                        <Check className="h-4 w-4" />
                                        Enquiry Sent
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        key="submit"
                                        type="submit"
                                        disabled={isSubmitting}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="group inline-flex items-center gap-5 border border-[#25251f] px-8 py-4 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.15em] text-[#25251f] transition-colors duration-300 hover:bg-[#25251f] hover:text-[#f8f5ef] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#25251f]"
                                    >
                                        {isSubmitting ? "Sending..." : "Send Enquiry"}

                                        {!isSubmitting && (
                                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                                →
                                            </span>
                                        )}
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>


                    </motion.form>
                </div>
            </section>

            <section className="relative h-[550px] w-full overflow-hidden sm:h-[650px]">
                <motion.img
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    src="/event2.jpeg"
                    alt="Beautiful flowers"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center px-6 text-center"
                >
                    <div>
                        <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-white sm:text-6xl lg:text-7xl">
                            Your story,
                            <br />
                            beautifully told.
                        </h2>

                        <div className="mx-auto mt-7 h-[2px] w-16 bg-white" />

                        <p className="mt-6 font-[family-name:var(--font-cormorant)] text-2xl text-white sm:text-3xl">
                            We&apos;d love to create something with you.
                        </p>
                    </div>
                </motion.div>
            </section>
        </main>
    )
}
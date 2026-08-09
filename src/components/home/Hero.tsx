"use client"
import React from 'react'
import { motion } from "motion/react"

export default function Hero() {
    return (
        <motion.img
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            src="/homebg.png"
            alt="Wedding ceremony"
            className="absolute inset-0 h-full w-full object-cover"
        />
    )
}

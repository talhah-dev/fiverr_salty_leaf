"use client"

import Navbar from "@/components/Navbar"
import Link from "next/link"
import React from "react"
import { motion } from "motion/react"

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
}

const processSteps = [
    {
        number: "01",
        icon: "🌸",
        title: "Enquire",
        text: "Tell us about your loved one and your wishes.",
    },
    {
        number: "02",
        icon: "🤝",
        title: "Consultation",
        text: "We'll meet to discuss the details with care.",
    },
    {
        number: "03",
        icon: "🌿",
        title: "Design & Planning",
        text: "Thoughtful arrangements planned with compassion.",
    },
    {
        number: "04",
        icon: "🕊️",
        title: "Delivery",
        text: "We handle everything, delivered with dignity.",
    },
]

export default function FarewellsPage() {
    return (
        <main>
            <section className="relative h-screen min-h-[650px] w-full overflow-hidden">
                <Navbar />

                <motion.img
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    src="/farewellbg.png"
                    alt="Floral arrangement"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 md:bg-black/0 bg-black/35" />


                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
                    }}
                    className="absolute left-10 top-1/2 z-10 -translate-y-1/2 sm:left-16 lg:left-24"
                >
                    <div className="flex flex-col items-start">
                        <motion.h1
                            variants={fadeUp}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-[family-name:var(--font-cormorant)] text-5xl font-light uppercase leading-none tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl"
                        >
                            Farewells
                        </motion.h1>

                        <motion.div
                            variants={fadeUp}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mt-5 h-[2px] w-40 rounded-full bg-white"
                        />

                        <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }}>
                            <Link
                                href="/contact"
                                className="mt-3 inline-block font-[family-name:var(--font-cormorant)] text-2xl uppercase tracking-wide text-white transition-opacity duration-300 hover:opacity-60"
                            >
                                Enquire
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <section className="bg-[#f8f5ef] px-6 py-20 sm:px-10 sm:py-24 lg:px-14 lg:py-28">
                <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                        <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-medium uppercase leading-[0.95] tracking-[-0.025em] text-[#1f211d] sm:text-6xl lg:text-6xl">
                            Thoughtful By Nature
                        </h2>

                        <div className="mt-9 h-[2px] w-40 bg-[#25251f]" />

                        <p className="mt-7 max-w-md font-[family-name:var(--font-cormorant)] text-lg font-medium leading-[1.35] text-[#35352e] sm:text-2xl">
                            We create floral tributes that reflect a life
                            beautifully lived.
                        </p>

                        <p className="mt-7 max-w-md font-[family-name:var(--font-cormorant)] text-lg font-medium leading-[1.35] text-[#35352e] sm:text-2xl">
                            Every arrangement is designed with care,
                            respect and compassion, using the finest
                            seasonal flowers.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="w-full"
                    >
                        <img
                            src="/home3.jpg"
                            alt="Funeral floral arrangement"
                            className="h-[500px] w-full object-cover sm:h-[600px] lg:h-[680px]"
                        />
                    </motion.div>
                </div>
            </section>

            <section className="bg-[#f4f1ec] px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
                <div className="mx-auto max-w-[1400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="mb-14 text-center"
                    >
                        <p className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold uppercase tracking-[0.1em] text-[#44443d]">
                            Our Process
                        </p>

                        <div className="mx-auto mt-3 h-[2px] w-12 bg-[#44443d]" />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
                        className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {[
                            {
                                number: "01",
                                title: "Enquire",
                                text: "Get in touch and let us know what you need.",
                                icon: (
                                    <svg fill="#55554e" viewBox="0 0 64 64" version="1.1"  className="h-20"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="_x32_5_attachment"></g> <g id="_x32_4_office"></g> <g id="_x32_3_pin"></g> <g id="_x32_2_business_card"></g> <g id="_x32_1_form"></g> <g id="_x32_0_headset"></g> <g id="_x31_9_video_call"></g> <g id="_x31_8_letter_box"></g> <g id="_x31_7_papperplane"></g> <g id="_x31_6_laptop"></g> <g id="_x31_5_connection"></g> <g id="_x31_4_phonebook"></g> <g id="_x31_3_classic_telephone"></g> <g id="_x31_2_sending_mail"></g> <g id="_x31_1_man_talking"></g> <g id="_x31_0_date"></g> <g id="_x30_9_review"></g> <g id="_x30_8_email"></g> <g id="_x30_7_information"></g> <g id="_x30_6_phone_talking"> <g> <g> <path d="M37.063,18.062h-0.0596c-0.5522,0-0.9702,0.4478-0.9702,1s0.4775,1,1.0298,1s1-0.4478,1-1S37.6152,18.062,37.063,18.062z "></path> <path d="M45.1787,18.062H45.123c-0.5522,0-0.9722,0.4478-0.9722,1s0.4756,1,1.0278,1s1-0.4478,1-1S45.731,18.062,45.1787,18.062z "></path> <path d="M53.2983,18.062h-0.0596c-0.5522,0-0.9702,0.4478-0.9702,1s0.4775,1,1.0298,1s1-0.4478,1-1 S53.8506,18.062,53.2983,18.062z"></path> <path d="M45.1953,45.9268c-5.1489-2.9038-6.6909-2.6665-10.6172-0.4468c-2.0146,1.3389-4.4404,0.5225-8.6563-2.9111 c-0.8276-0.6743-1.6592-1.4263-2.4688-2.2319c-0.8091-0.8125-1.5605-1.644-2.2344-2.4722 c-3.1782-3.8999-4.0435-7.459-3.0112-8.5317c3.042-3.271,2.3516-5.957-0.3335-10.7173c-1.6172-3.0591-3.3931-6.104-5.7568-6.8027 c-1.7139-0.5034-4.2588,0.8154-5.0166,1.3184c-1.9492,1.2983-3.8003,3.5947-4.8311,5.9937 c-1.896,4.4136-1.3931,9.7329-0.29,13.2397c1.812,5.749,6.1611,12.4063,11.6348,17.8086 c5.4043,5.4761,12.0615,9.8242,17.8081,11.6313c1.8154,0.5728,4.1167,0.9844,6.5283,0.9844c2.2437,0,4.583-0.3564,6.7124-1.271 c2.3989-1.0327,4.6938-2.8838,5.9888-4.8306c0.5039-0.7554,1.8276-3.2998,1.3184-5.021 C51.2754,49.3071,48.2305,47.5308,45.1953,45.9268z M44.2368,47.6821c1.8521,0.979,5.2998,2.8018,5.8149,4.5513 c0.1056,0.3564-0.0228,1.0059-0.2598,1.681l-13.5292-7.089C38.8073,45.4165,39.8377,45.2009,44.2368,47.6821z M11.5513,13.7314 c1.7524,0.5181,3.5752,3.9663,4.5674,5.8428c2.6213,4.647,2.613,6.1134,0.9274,8.0579L9.748,14.0356 c0.556-0.2056,1.1049-0.3412,1.499-0.3412C11.3633,13.6943,11.4658,13.7061,11.5513,13.7314z M43.873,59.6807 c-3.9175,1.6836-8.8311,1.1694-11.8501,0.2163c-5.4517-1.7144-11.8032-5.8765-16.9897-11.1328 c-0.0034-0.0034-0.0063-0.0063-0.0098-0.0098C9.7695,43.5698,5.606,37.2178,3.8872,31.7642 c-0.9497-3.0195-1.4619-7.9346,0.2202-11.8501c0.8441-1.9645,2.3123-3.8291,3.8699-4.948l7.923,14.7618 c-0.4362,2.3732,0.9189,5.9038,3.7676,9.4001c0.7153,0.8789,1.5122,1.7607,2.3711,2.623 c0.8594,0.856,1.7407,1.6528,2.6196,2.3687c3.0879,2.5153,6.3303,4.6262,9.3667,3.7915l14.8708,7.792 C47.7888,57.3002,45.8823,58.816,43.873,59.6807z"></path> <path d="M60.9551,10.771C56.3843,2.0591,45.5757-1.3105,36.8604,3.2568l-0.0005,0.0005 c-8.7119,4.5723-12.0825,15.3813-7.5137,24.0952c0.3311,0.6313,0.709,1.2549,1.1274,1.8613l-2.7012,4.6299 c-0.1885,0.3228-0.1812,0.7241,0.0195,1.0396c0.1997,0.3159,0.5596,0.4912,0.9321,0.4604l7.75-0.6851 c2.7095,1.5068,5.6899,2.2627,8.6748,2.2627c2.8374,0,5.6787-0.6836,8.293-2.0552 C62.1543,30.2944,65.5249,19.4854,60.9551,10.771z M52.5127,33.0952c-4.8472,2.543-10.5723,2.4214-15.3154-0.3252 c-0.1523-0.0884-0.3257-0.1348-0.501-0.1348c-0.0293,0-0.0586,0.0015-0.0879,0.0039l-6.1338,0.542l2.0532-3.519 c0.2017-0.3462,0.1777-0.7793-0.0615-1.1006c-0.5132-0.6899-0.9668-1.4092-1.3486-2.1377 c-4.0571-7.7373-1.0645-17.3354,6.6719-21.396l-0.0005,0.0005c7.7378-4.0581,17.3354-1.0635,21.395,6.6719 C63.2417,19.438,60.2485,29.0356,52.5127,33.0952z"></path> </g> </g> </g> <g id="_x30_5_women_talking"></g> <g id="_x30_4_calling"></g> <g id="_x30_3_women"></g> <g id="_x30_2_writing"></g> <g id="_x30_1_chatting"></g> </g></svg>
                                )
                            },
                            {
                                number: "02",
                                title: "Consultation",
                                text: "We'll discuss your needs and preferences.",
                                icon: (
                                    <svg className="h-20" fill="#55554e" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 56 56" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> </g> <g> <path d="M12,24c3.309,0,6-2.691,6-6s-2.691-6-6-6s-6,2.691-6,6S8.691,24,12,24z M12,14c2.206,0,4,1.794,4,4s-1.794,4-4,4 s-4-1.794-4-4S9.794,14,12,14z"></path> <path d="M44,24c3.309,0,6-2.691,6-6s-2.691-6-6-6s-6,2.691-6,6S40.691,24,44,24z M44,14c2.206,0,4,1.794,4,4s-1.794,4-4,4 s-4-1.794-4-4S41.794,14,44,14z"></path> <path d="M54,26v13c0,1.654-1.346,3-3,3V31c0-2.757-2.243-5-5-5h-5c-0.552,0-1,0.448-1,1v4v1v1h-8c-0.552,0-1,0.448-1,1v3h-6v-3 c0-0.552-0.448-1-1-1h-8v-1v-1v-4c0-0.552-0.448-1-1-1h-5c-2.757,0-5,2.243-5,5v11c-1.654,0-3-1.346-3-3V26H0v13 c0,2.045,1.237,3.802,3,4.576V56h2V44h1h1h8v11c0,0.552,0.448,1,1,1h3h1h1v-1V40v-1h3h8h3v1v15v1h1h1h3c0.552,0,1-0.448,1-1V44h8 h1h1v12h2V43.576c1.763-0.774,3-2.531,3-4.576V26H54z M20,37h-2h-6v-6h-2v7c0,0.552,0.448,1,1,1h7c0.551,0,1,0.449,1,1v14h-2V43 c0-0.552-0.448-1-1-1H7V31c0-1.654,1.346-3,3-3h4v3v1v2c0,0.552,0.448,1,1,1h8v2H20z M40,42c-0.552,0-1,0.448-1,1v11h-2V40 c0-0.551,0.449-1,1-1h7c0.552,0,1-0.448,1-1v-7h-2v6h-6h-2h-3v-2h8c0.552,0,1-0.448,1-1v-2v-1v-3h4c1.654,0,3,1.346,3,3v11H40z"></path> <path d="M19,10v3c0,0.431,0.275,0.812,0.684,0.949C19.788,13.983,19.895,14,20,14c0.309,0,0.607-0.144,0.8-0.4l2.7-3.6H31 c1.654,0,3-1.346,3-3V3c0-1.654-1.346-3-3-3H19c-1.654,0-3,1.346-3,3v4C16,8.654,17.346,10,19,10z M18,3c0-0.551,0.449-1,1-1h12 c0.551,0,1,0.449,1,1v4c0,0.551-0.449,1-1,1h-8c-0.315,0-0.611,0.148-0.8,0.4L21,10V9c0-0.552-0.448-1-1-1h-1 c-0.551,0-1-0.449-1-1V3z"></path> <rect x="20" y="4" width="10" height="2"></rect> <rect x="27" y="25" width="6" height="2"></rect> <path d="M26,21c-1.654,0-3,1.346-3,3v4c0,1.654,1.346,3,3,3h8c1.654,0,3-1.346,3-3v-0.697l1.832-2.748 c0.205-0.307,0.224-0.701,0.05-1.026C38.708,23.203,38.369,23,38,23h-1.171c-0.413-1.164-1.525-2-2.829-2H26z M35,24 c0,0.552,0.448,1,1,1h0.131l-0.963,1.445C35.059,26.609,35,26.803,35,27v1c0,0.551-0.449,1-1,1h-8c-0.551,0-1-0.449-1-1v-4 c0-0.551,0.449-1,1-1h8C34.551,23,35,23.449,35,24z"></path> <rect x="23" y="16" width="2" height="2"></rect> <rect x="27" y="16" width="2" height="2"></rect> <rect x="31" y="16" width="2" height="2"></rect> </g> </g> </g></svg>
                                )
                            },
                            {
                                number: "03",
                                title: "Design",
                                text: "We create a fitting floral tribute with care.",
                                icon: (
                                     <svg viewBox="0 0 1024 1024" className="h-20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#55554e"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M489.48 960.05h-1.11a16.09 16.09 0 0 1-15-17.15c14.21-208.64 37.28-768.64-25.82-853.19a16.1 16.1 0 0 1 25.81-19.25c81.69 109.47 37.45 796.64 32.13 874.63a16.1 16.1 0 0 1-16.01 14.96z" fill="#55554e"></path><path d="M506.64 480.34h-0.08a12.88 12.88 0 0 1-11.62-7.49c-1-2.17-101.43-209.65-174-280.12-5.1-5-4.54-21 0.42-26.15a12.87 12.87 0 0 1 18.21-0.26c61.73 60 138.4 211.8 167.21 271.45 12.32-24.81 33.14-65.69 57-108.09 52.06-92.47 93.47-148.07 123.08-165.26a12.87 12.87 0 0 1 17.6 4.67c3.57 6.15 1 21.59-4.7 25.78C654.2 228.15 551.23 403.55 518.27 473a12.87 12.87 0 0 1-11.63 7.34z" fill="#55554e"></path><path d="M504.49 557.61h-0.15a12.87 12.87 0 0 1-10.49-5.61c-1.52-2.22-156.56-209-219-267.51-8.59-8-5.9-21.39-1.41-26.9a12.87 12.87 0 0 1 18.11-1.87c59.63 48.44 177.39 215.11 213.21 266.71C522.51 498 560 446.94 599.22 396.51c113.11-145.43 130-144.39 140.07-143.65a12.87 12.87 0 0 1 12 13.7c-0.44 6.67-6.41 17.93-13.92 20.07-23.16 8.24-130.18 137.06-222.37 265.61a12.89 12.89 0 0 1-10.51 5.37z m233.1-279.06z m1.7-0.11z" fill="#55554e"></path><path d="M502.34 619.85H502a12.86 12.86 0 0 1-9.28-4.33c-1.8-2-177.27-184.07-260.26-217.27-13.46-5.37-15.1-27.25-12.65-33.95a12.87 12.87 0 0 1 16.52-7.67c79.56 29.11 227.91 189 266.52 231.62 19.9-19.76 67.79-66.84 118-112.36 137.85-125 158.4-117 169.46-112.73 6.63 2.58 7.72 12.14 7.54 19.25-0.2 7.81-10.2 21.6-17.44 24-11.1 3.72-143.27 82.88-268.92 209.59a12.89 12.89 0 0 1-9.15 3.85z" fill="#55554e"></path><path d="M502.34 677.8a12.88 12.88 0 0 1-8.38-3.09c-94.65-81-250.8-183.64-287.28-196.51-6.7-2.37-12.2-20.69-11.12-27.72a12.87 12.87 0 0 1 14.69-10.77c9.44 1.45 38.2 5.88 173.92 112 51.93 40.62 100.11 81 118.59 96.63 59.48-45.34 265.94-200.2 314.71-200.2h1a12.88 12.88 0 0 1 12.28 13.45c-0.32 7.11-7.66 18.85-15.28 20-27.58 4.06-176 94.26-305.26 193.56a12.85 12.85 0 0 1-7.87 2.65z" fill="#55554e"></path><path d="M500.2 722.88a12.88 12.88 0 0 1-7.63-2.5c-2.24-1.65-218.81-150.42-317-154.72-12.87-0.56-19.07-20.79-18.77-27.9a12.8 12.8 0 0 1 13.4-12.33c96.36 4 289.68 139.62 330.33 168.89C549.38 662 764.15 523.58 840.7 531.93a12.88 12.88 0 0 1 11.42 14.19c-0.77 7.07-10.34 18.11-17.36 18.07-60.77-0.4-256.24 108.89-327.4 156.52a12.85 12.85 0 0 1-7.16 2.17z" fill="#55554e"></path><path d="M500.2 757.22c-3.28 0-4.5-0.31-45.66-13.34-78.32-24.78-232.81-58.61-296.68-63.4-7.1-0.48-20.86-24.48-20.36-31.54a12.78 12.78 0 0 1 13.8-11.88c66.86 5 231.76 57.19 311 82.27 16.86 5.34 31.77 10.05 37.65 11.73 4.35-1.43 13.71-4.79 23.51-8.29 71.2-25.5 260.34-93.21 346.7-87.86a12.88 12.88 0 0 1 12 13.66c-0.44 7.09-12.86 25.64-20.1 25.08C781 668.55 602 722 532.16 747c-27.45 9.84-28.65 10.22-31.96 10.22z" fill="#55554e"></path><path d="M498 791.56a12.9 12.9 0 0 1-2.85-0.32c-44.55-10.12-302.92-25.39-341.1-12-6.72 2.35-22.15-11-24.5-17.74a12.88 12.88 0 0 1 7.9-16.41c47.57-16.66 314.16 11.43 360.46 20.44 40.88-8.67 339.47-59.38 392.67-13.78a12.88 12.88 0 0 1 1.4 18.16c-4.63 5.4-24.67 9.6-36.34 1.95-40.08-26.26-282.14 2-354.63 19.36a12.8 12.8 0 0 1-3.01 0.34z" fill="#55554e"></path><path d="M208.3 858.1a12.88 12.88 0 0 1-8.72-22.36c80.71-74.16 282.51-52.8 301.09-50.65 50.2-2.27 287.54-9.76 325.83 48.8a12.88 12.88 0 0 1-3.73 17.83c-6 3.89-22.21 1-27.84-4.61-16.22-16.22-96.2-45.36-294.13-36.23a14.43 14.43 0 0 1-2.14-0.08c-2.07-0.25-204.45-21.32-278.55 46.78-2.49 2.25-8.7 0.52-11.81 0.52z" fill="#55554e"></path></g></svg>
                                    
                                )
                            },
                            {
                                number: "04",
                                title: "Farewell",
                                text: "Delivered with respect and on time.",
                                icon: (
                                   <svg className="h-20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#55554e"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="55554e" d="M461.963 22C342.73 99.984 194.385 135.387 18 130.719v18.004C207.74 153.643 367.48 112.724 493.783 22h-31.82zm25.865 35.443L403.7 103.686l88.307 61.007-4.178-107.25zm-109.508 57.48l-92.037 27.298 73.315 78.388 18.722-105.685zm-128.498 35.491l-94.967 14.057 61.54 87.937 33.427-101.994zM116.48 166.78l-95.956 2.918 50.895 94.496 45.06-97.414zM18 279.461v18.662c231.522 63.276 368.876 81.316 476 84.926V365.05c-106.436-3.598-242.956-21.615-476-85.59zm43.379 51.244l24.053 104.602 69.25-82.002-93.303-22.6zm151.05 37.49l29.944 103.069 64.488-85.797-94.431-17.272zm153.087 24.446l40.615 99.351 55.111-92.101-95.726-7.25z"></path></g></svg>
                                )
                            },
                        ].map((item) => (
                            <motion.div
                                key={item.number}
                                variants={fadeUp}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="text-center"
                            >
                                <div className="mb-6 flex h-14 items-center justify-center">
                                    <span className="text-3xl text-[#44443d]">
                                        {item.icon}
                                    </span>
                                </div>

                                <span className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#44443d]">
                                    {item.number}
                                </span>

                                <h3 className="mt-5 font-[family-name:var(--font-cormorant)] text-xl font-bold uppercase tracking-[0.05em] text-[#44443d]">
                                    {item.title}
                                </h3>

                                <p className="mx-auto mt-4 max-w-[220px] font-[family-name:var(--font-cormorant)] text-xl font-medium leading-[1.3] text-[#55554e]">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="bg-[#f8f5ef] px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="mx-auto max-w-4xl text-center"
                >
                    <div className="-mb-8 font-serif text-8xl text-[#25251f]">
                        “
                    </div>

                    <blockquote className="font-[family-name:var(--font-cormorant)] text-3xl font-medium italic leading-[1.25] text-[#35352e] sm:text-4xl lg:text-5xl">
                        The flowers were so beautiful and perfectly captured
                        the spirit of Mum. Thank you for your kindness and for
                        creating such a stunning arrangement.
                    </blockquote>

                    <p className="mt-7 font-[family-name:var(--font-cormorant)] text-sm font-semibold uppercase tracking-[0.2em] text-[#55554e]">
                        — Jane M.
                    </p>
                </motion.div>
            </section>

            <section
                id="enquire"
                className="relative h-[650px] min-h-[600px] w-full overflow-hidden sm:h-[750px]"
            >
                <motion.img
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    src="/farewell1.jpg"
                    alt="Floral heart arrangement"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                    <motion.h2
                        variants={fadeUp}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-white sm:text-6xl lg:text-7xl"
                    >
                        We are here to help
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl font-medium text-white sm:text-4xl"
                    >
                        Please reach out at anytime.
                    </motion.p>

                    <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }}>
                        <Link
                            href="/contact"
                            className="mt-10 inline-block font-[family-name:var(--font-cormorant)] text-5xl font-light uppercase tracking-[-0.02em] text-white transition-opacity duration-300 hover:opacity-60 sm:text-6xl lg:text-7xl"
                        >
                            Enquire
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </main>
    )
}
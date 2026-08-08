import "dotenv/config"
import bcrypt from "bcryptjs"
import connectDB from "@/config/mongoDB"
import Admin from "@/models/Admin"

// EDIT THESE before running, then delete this file once the admin is created.
const ADMIN_NAME = "Salty Leaf Admin"
const ADMIN_EMAIL = "admin@saltyleaf.com"
const ADMIN_PASSWORD = "12345678"

async function seedAdmin() {
    await connectDB()

    const existing = await Admin.findOne({ email: ADMIN_EMAIL })

    if (existing) {
        console.log(`Admin with email ${ADMIN_EMAIL} already exists. Aborting.`)
        process.exit(0)
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12)

    const admin = await Admin.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "superadmin",
    })

    console.log("Admin created successfully:")
    console.log({ id: admin._id, email: admin.email, role: admin.role })
    console.log("\nYou can now delete this seed file (scripts/seedAdmin.ts).")

    process.exit(0)
}

seedAdmin().catch((error) => {
    console.error("Failed to seed admin:", error)
    process.exit(1)
})
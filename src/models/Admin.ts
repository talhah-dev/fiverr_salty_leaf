import mongoose, { Schema, models, model, type Document } from "mongoose"

export interface IAdmin extends Document {
    name: string
    email: string
    password: string
    role: "admin" | "superadmin"
    createdAt: Date
    updatedAt: Date
}

const AdminSchema = new Schema<IAdmin>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["admin", "superadmin"],
            default: "admin",
        },
    },
    { timestamps: true }
)

const Admin = models.Admin || model<IAdmin>("Admin", AdminSchema)

export default Admin
import { Schema, models, model, type Document } from "mongoose"

export interface IGalleryImage extends Document {
    url: string
    alt: string
    category: "wedding" | "farewell" | "event" | "general"
    order: number
    createdAt: Date
    updatedAt: Date
}

const GalleryImageSchema = new Schema<IGalleryImage>(
    {
        url: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            default: "",
            trim: true,
        },
        category: {
            type: String,
            enum: ["wedding", "farewell", "event", "general"],
            default: "general",
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
)

const GalleryImage =
    models.GalleryImage || model<IGalleryImage>("GalleryImage", GalleryImageSchema)

export default GalleryImage
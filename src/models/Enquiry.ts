import { Schema, models, model, type Document } from "mongoose"

export interface IEnquiry extends Document {
    name: string
    email: string
    phone: string
    eventType:
    | "wedding"
    | "farewell"
    | "corporate"
    | "private"
    | "birthday"
    | "anniversary"
    | "other"
    eventDate: string
    venue: string
    message: string
    status: "new" | "read"
    createdAt: Date
    updatedAt: Date
}

const EnquirySchema = new Schema<IEnquiry>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            default: "",
            trim: true,
        },
        eventType: {
            type: String,
            enum: [
                "wedding",
                "farewell",
                "corporate",
                "private",
                "birthday",
                "anniversary",
                "other",
            ],
            required: true,
        },
        eventDate: {
            type: String,
            default: "",
        },
        venue: {
            type: String,
            default: "",
            trim: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["new", "read"],
            default: "new",
        },
    },
    { timestamps: true }
)

const Enquiry = models.Enquiry || model<IEnquiry>("Enquiry", EnquirySchema)

export default Enquiry
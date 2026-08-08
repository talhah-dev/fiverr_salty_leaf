import mongoose from "mongoose"
import dns from "node:dns"

if (process.platform === "win32") {
    dns.setServers(["1.1.1.1", "8.8.8.8"])
}


const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error(
        "Missing MONGODB_URI environment variable. Add it to your .env file."
    )
}

type MongooseCache = {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}

declare global {
    var mongooseCache: MongooseCache | undefined
}

const cached: MongooseCache = global.mongooseCache ?? {
    conn: null,
    promise: null,
}

if (!global.mongooseCache) {
    global.mongooseCache = cached
}

async function connectDB(): Promise<typeof mongoose> {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI as string, {
            bufferCommands: false,
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn
}

export default connectDB
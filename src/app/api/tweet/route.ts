import { db } from "@/lib/db"
import { NextResponse } from "next/server"



export async function GET() {
    const response = await db.tweet.findMany({
        include: {
            user: true
        }
    })
    return NextResponse.json(response)
}

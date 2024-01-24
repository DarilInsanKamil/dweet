import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const tweetSchema = z
    .object({
        isi_tweet: z.string(),
    });

export async function POST(req: Request, { params }: { params: { userId: string } }) {

    try {
        const body = await req.json();
        const { isi_tweet } = tweetSchema.parse(body);

        const users = await db.user.findMany({
            where: {
                OR: [
                    { name: params.userId },
                    { username: params.userId },
                ],
            },
        });

        if (!users || users.length === 0) {
            return NextResponse.json({ message: "User not found!" }, { status: 404 });
        }

        const user = users[0]; // Ambil hasil pertama

        // Gunakan user.id sebagai user_id dalam membuat tweet
        const newTweet = await db.tweet.create({
            data: {
                user_id: user.id,
                isi_tweet,
            },
        });

        return NextResponse.json(newTweet, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}

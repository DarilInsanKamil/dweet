import { getServerSession } from "next-auth";
import { db } from "./db";
import { authOptions } from "./auth";

export const findUserIdByname = async () => {
    const session = await getServerSession(authOptions);

    if (session && session.user && session.user.email) {
        try {
            const response = await db.user.findUnique({
                where: { email: session.user.email }
            });

            if (response) {
                return { id: response.id }; // Assuming 'id' is the correct property name
            } else {
                throw new Error("User not found");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            throw new Error("Failed to fetch user");
        }
    } else {
        throw new Error("Session user email not available");
    }
};


export const getAllTweet = async () => {
    const response = await db.tweet.findMany({
        orderBy: {
            create_tweet: 'desc',
        },
        include: {
            user: true,
            likes: true,
            comments: true
        }
    })
    return response;
}
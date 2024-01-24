import { getServerSession } from "next-auth"
import { db } from "./db"
import { authOptions } from "./auth"
import { z } from "zod"

interface Data {
    id: string,
    isi_tweet: string
}
interface Tweet {
    isi_tweet: string
}
export const useCreateTweet = async (values: Data) => {
    try {
        await db.tweet.create({
            data: {
                user_id: values.id,
                isi_tweet: values.isi_tweet
            }
        })
    } catch (error) {
        console.error(error)
    }
}

const TweetSchema = z.object({
    tweet_id: z.number(),
    create_tweet: z.string(),
    user_id: z.string(),
    isi_tweet: z.string().min(1).max(300)
})

export type State = {
    errors?: {
        isi_tweet?: string
    },
    message?: string | null
}

const CreateTweet = TweetSchema.omit({ tweet_id: true, create_tweet: true })

export const createTweet = async (prevState: State, formData: FormData) => {
    const validateFields = CreateTweet.safeParse({
        user_id: formData.get('user_id'),
        isi_tweet: formData.get('isi_tweet')
    })
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Missing fields. failed to create tweet'
        }
    }
    const { user_id, isi_tweet } = validateFields.data
    try {
        const newTweet = await db.tweet.create({
            data: {
                user_id,
                isi_tweet
            }
        })
        return { data: newTweet, message: "success create tweet" }
    } catch (error) {
        return { message: "Database ErrorL Failed to create tweet" }
    }
}

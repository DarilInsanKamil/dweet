import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const Page = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        return (
            <h2 className="text-2xl">Admin page - welcome back {session?.user.username || session.user.name}</h2>
        )
    }
    return (
        <p>Please login to see this admin page</p>
    )
}

export default Page
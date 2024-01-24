import Cardfeed from "@/components/feed";
import PostForm from "@/components/form/CreateTweet";
import { authOptions } from "@/lib/auth";
import { getAllTweet } from "@/lib/data";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return;
  }
  const data = await getAllTweet();
  return (
    <div className="relative">
      <div className="bg-white sticky top-0 z-10"> 
        <PostForm
          params={{ postId: session?.user.name || session?.user.username }}
        />
      </div>
      <Cardfeed data={data} />
    </div>
  );
};

export default Page;

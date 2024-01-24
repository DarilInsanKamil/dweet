"use client";
import { formatDate } from "@/lib/utils";
import { Heart, MessageCircle } from "lucide-react";

const Cardfeed = ({ data }: any) => {
  return (
    <div>
      {data.map((res: any) => {
        console.log(res.create_tweet);
        return (
          <div
            key={res.tweet_id}
            className="border-b-2 border-neutral-300 p-2"
            onClick={() => console.log(res.tweet_id)}
          >
            <div className="flex gap-2 items-center">
              <img
                src="/vercel.svg"
                alt={res.user.name}
                className="w-[20px] h-[20px] object-cover"
              />
              <p>{res.user.name || res.user.username}</p>
            </div>
            <p>{res.isi_tweet}</p>
            <div className="flex gap-3 items-center mt-2">
              <div className="flex gap-1 items-center">
                <Heart className="w-4 h-4" />
                {res.likes.length}
              </div>
              <div className="flex gap-1 items-center">
                <MessageCircle className="w-4 h-4" />
                {res.comments.length}
              </div>
              <p className="text-xs text-neutral-500">{formatDate(res.create_tweet)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Cardfeed;

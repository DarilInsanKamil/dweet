"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const tweetSchema = z.object({
  isi_tweet: z.string(),
});

const Post = ({ params }: { params: { postId: string } }) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof tweetSchema>>({
    resolver: zodResolver(tweetSchema),
    defaultValues: {
      isi_tweet: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof tweetSchema>) => {
    const response = await fetch(`/api/tweet/${params.postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isi_tweet: values.isi_tweet,
      }),
    });
    if (response.ok) {
      router.push("/api/tweet");
      toast({
        title: "Success",
        variant: "default",
        description: "Success tweet",
      });
    } else {
      console.error("Registration failed");
      toast({
        title: "Error",
        variant: "destructive",
        description: "Oops! Something went wrong!",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="isi_tweet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tweet</FormLabel>
                <FormControl>
                  <Input placeholder="Ketikan sesuatu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Posting
        </Button>
      </form>
    </Form>
  );
};
export default Post;

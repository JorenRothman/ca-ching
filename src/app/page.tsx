import { CreatePost } from "@/components/create-post";
import Form from "@/components/form";
import { validateRequest } from "@/server/auth/validate";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
    const { user } = await validateRequest();

    if (!user) {
        redirect("/login");
    }

    const hello = await api.post.hello({ text: "from trpc 2" });
    return (
        <main className="my-12">
            <Form />
        </main>
    );
}

async function CrudShowcase() {
    const latestPost = await api.post.getLatest();

    return (
        <div className="w-full max-w-xs">
            {latestPost ? (
                <p className="truncate">
                    Your most recent post: {latestPost.name}
                </p>
            ) : (
                <p>You have no posts yet.</p>
            )}

            <CreatePost />
        </div>
    );
}

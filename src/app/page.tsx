import { CreatePost } from "@/components/create-post";
import { api } from "@/trpc/server";

export default async function Home() {
    const hello = await api.post.hello({ text: "from trpc 2" });
    return (
        <main>
            <p>{hello ? hello.greeting : "Loading tRPC query..."}</p>
            <CrudShowcase />
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

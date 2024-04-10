import { api } from "@/trpc/server";

export default async function Home() {
    const hello = await api.post.hello({ text: "from trpc 2" });
    return (
        <main>
            <p>{hello ? hello.greeting : "Loading tRPC query..."}</p>
        </main>
    );
}

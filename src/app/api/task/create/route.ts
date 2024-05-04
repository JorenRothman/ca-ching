import { api } from "@/trpc/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
    name: z.string(),
    duration: z.string(),
    client: z.string(),
});

export async function POST(request: Request) {
    const json = (await request.json()) as unknown;
    const bearer = request.headers.get("Authorization");
    const token = bearer?.substring(7);

    const input = schema.safeParse(json);

    if (input.error) {
        return Response.json({ status: "not ok" });
    }

    await api.task.create({ ...input.data, accessToken: token });

    return Response.json({ status: "ok" });
}

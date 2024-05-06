import { createTaskSchema } from "@/shared/schemas/task";
import { api } from "@/trpc/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const json = (await request.json()) as unknown;
    const bearer = request.headers.get("Authorization");
    const token = bearer?.substring(7);

    const input = createTaskSchema.safeParse(json);

    if (input.error) {
        return Response.json(
            { message: input.error.issues },
            {
                status: 500,
            },
        );
    }

    let client = await api.client.findByName({
        name: input.data.client,
    });

    if (!client) {
        client = (
            await api.client.create({
                name: input.data.client,
                accessToken: token,
            })
        ).shift();
    }

    if (!client) {
        return Response.json(
            {
                message: "Something went wrong",
            },
            {
                status: 500,
            },
        );
    }

    const task = await api.task.create({
        ...input.data,
        client: client.id,
        accessToken: token,
    });

    return Response.json({ task });
}

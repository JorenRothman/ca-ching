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
            { status: "not ok" },
            {
                status: 500,
            }
        );
    }

    await api.task.create({ ...input.data, accessToken: token });

    return Response.json({ status: "ok" });
}

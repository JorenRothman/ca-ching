import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db/db";
import { tasks, users } from "@/server/db/schema";
import { validateRequest } from "@/server/auth/validate";
import { generateId } from "lucia";
import { eq } from "drizzle-orm";
import { createTaskSchema } from "@/shared/schemas/task";
const deleteSchema = z.object({
    id: z.string(),
});

export const taskRouter = createTRPCRouter({
    all: publicProcedure
        .input(z.object({ userID: z.string() }))
        .query(async (opts) => {
            return await db.query.tasks.findMany({
                with: {
                    client: true,
                },
                orderBy(fields, { desc }) {
                    return [desc(fields.date)];
                },
                where: eq(tasks.userID, opts.input.userID),
            });
        }),
    create: publicProcedure
        .input(createTaskSchema)
        .mutation(async ({ input }) => {
            const { user } = await validateRequest(input.accessToken);

            if (!user) {
                throw new Error("Not auth");
            }

            const taskID = generateId(16);

            await db.insert(tasks).values({
                id: taskID,
                userID: user.id,
                title: input.name,
                duration: input.duration,
                clientID: input.client,
            });
        }),
    delete: publicProcedure.input(deleteSchema).mutation(async ({ input }) => {
        const { user } = await validateRequest();

        if (!user) {
            throw new Error("not auth");
        }

        await db.delete(tasks).where(eq(tasks.id, input.id));
    }),
});

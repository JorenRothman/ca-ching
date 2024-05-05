import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db/db";
import { client, tasks } from "@/server/db/schema";
import { validateRequest } from "@/server/auth/validate";
import { generateId } from "lucia";
import { eq } from "drizzle-orm";

const createSchema = z.object({
    name: z.string(),
});

const deleteSchema = z.object({
    id: z.string(),
});

export const clientRouter = createTRPCRouter({
    all: publicProcedure.query(async () => {
        return await db.query.client.findMany();
    }),
    create: publicProcedure.input(createSchema).mutation(async ({ input }) => {
        const { user } = await validateRequest();

        if (!user) {
            throw new Error("Not auth");
        }

        const id = generateId(16);

        const alreadyExists = await db.query.client.findFirst({
            where: eq(client.name, input.name.toLowerCase()),
        });

        if (alreadyExists) {
            throw new Error("Client already exists");
        }

        await db.insert(client).values({
            id,
            name: input.name.toLowerCase(),
        });
    }),
    delete: publicProcedure.input(deleteSchema).mutation(async ({ input }) => {
        const { user } = await validateRequest();

        if (!user) {
            throw new Error("Not auth");
        }

        const deletedClients = await db
            .delete(client)
            .where(eq(client.id, input.id))
            .returning();

        return { clients: deletedClients };
    }),
});

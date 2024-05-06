import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db/db";
import { client, tasks } from "@/server/db/schema";
import { validateRequest } from "@/server/auth/validate";
import { generateId } from "lucia";
import { and, eq } from "drizzle-orm";

const createSchema = z.object({
    name: z.string(),
});

const findSchema = z.object({
    id: z.string(),
});

const findByNameSchema = z.object({
    name: z.string(),
});

const deleteSchema = z.object({
    id: z.string(),
});

export const clientRouter = createTRPCRouter({
    all: publicProcedure.query(async () => {
        return await db.query.client.findMany();
    }),
    find: publicProcedure.input(findSchema).query(async ({ input }) => {
        return await db.query.client.findFirst({
            where: and(eq(client.id, input.id)),
        });
    }),
    findByName: publicProcedure
        .input(findByNameSchema)
        .query(async ({ input }) => {
            return await db.query.client.findFirst({
                where: and(eq(client.name, input.name)),
            });
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

        return await db
            .insert(client)
            .values({
                id,
                name: input.name.toLowerCase(),
            })
            .returning();
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

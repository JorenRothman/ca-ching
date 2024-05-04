import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db/db";
import { accessToken, users } from "@/server/db/schema";
import { validateRequest } from "@/server/auth/validate";
import { generateId } from "lucia";
import { and, eq } from "drizzle-orm";
import { createJWT } from "@/lib/jwt";

export type AccessTokenPayload = {
    userID: string;
};

const createSchema = z.undefined();

const getAllSchema = z.object({
    userID: z.string(),
});

const deleteSchema = z.object({
    id: z.string(),
});

export const accessTokenRouter = createTRPCRouter({
    all: publicProcedure.input(getAllSchema).query(async ({ input }) => {
        return await db.query.accessToken.findMany({
            where: eq(accessToken.userID, input.userID),
        });
    }),
    create: publicProcedure.input(createSchema).mutation(async ({ input }) => {
        const { user } = await validateRequest();

        if (!user) {
            throw new Error("Not auth");
        }

        const id = generateId(16);

        const token = await createJWT<AccessTokenPayload>({ userID: user.id });

        try {
            await db.insert(accessToken).values({
                id,
                userID: user.id,
                token: token,
            });
        } catch (error) {
            console.error(error);
        }

        return { token };
    }),
    delete: publicProcedure.input(deleteSchema).mutation(async ({ input }) => {
        const { user } = await validateRequest();

        if (!user) {
            throw new Error("Not auth");
        }

        try {
            await db
                .delete(accessToken)
                .where(and(eq(accessToken.id, input.id)));
        } catch (error) {
            console.log(error);
            throw new Error("Something went wrong");
        }

        return true;
    }),
});

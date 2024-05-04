import { accessTokenRouter } from "@/server/api/routers/accessToken";
import { clientRouter } from "@/server/api/routers/client";
import { postRouter } from "@/server/api/routers/post";
import { taskRouter } from "@/server/api/routers/tasks";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
    post: postRouter,
    task: taskRouter,
    client: clientRouter,
    accessToken: accessTokenRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

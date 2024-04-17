import { postRouter } from "@/server/api/routers/post";
import { taskRouter } from "@/server/api/routers/tasks";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
    post: postRouter,
    task: taskRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

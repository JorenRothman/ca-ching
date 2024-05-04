import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NODE_ENV: z.string().default("production"),
        DATABASE_URL: z.string(),
        GITHUB_CLIENT_ID: z.string(),
        GITHUB_CLIENT_SECRET: z.string(),
    },
    client: {},
    experimental__runtimeEnv: {},
});

console.log(env.DATABASE_URL);

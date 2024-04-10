import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const env = createEnv({
    server: {
        NODE_ENV: z.string().default("production"),
        DATABASE_URL: z.string(),
    },
    client: {},
    experimental__runtimeEnv: {},
});

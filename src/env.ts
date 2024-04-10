import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NODE_ENV: z.string().default("production"),
    },
    client: {},
    experimental__runtimeEnv: {},
});

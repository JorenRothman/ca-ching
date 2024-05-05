import { ZodError, z } from "zod";

export const envSchema = z.object({
    NODE_ENV: z.string().default("development"),
    DATABASE_URL: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    SECRET: z.string().min(16),
});

export type EnvSchema = z.infer<typeof envSchema>;

try {
    envSchema.parse(process.env);
} catch (error) {
    if (error instanceof ZodError) {
        let message = "Missing required values in .env:\n";
        error.issues.forEach((issue) => {
            message += issue.path[0] + "\n";
        });
        const e = new Error(message);
        e.stack = "";
        throw e;
    } else {
        console.error(error);
    }
}

export const env = envSchema.parse(process.env);

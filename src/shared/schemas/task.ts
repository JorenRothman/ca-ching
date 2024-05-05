import { z } from "zod";

export const createTaskSchema = z.object({
    name: z.string().min(2).max(50),
    duration: z.coerce.number().max(480),
    client: z.string(),
    accessToken: z.string().optional(),
});

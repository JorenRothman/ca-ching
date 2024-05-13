import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./schema";
/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
    connection: postgres.Sql | undefined;
};

export const connection = globalForDb.connection ?? postgres(env.DATABASE_URL);

if (env.NODE_ENV !== "production") {
    globalForDb.connection = connection;
}

export const db = drizzle(connection, { schema });

export const adapter = new DrizzlePostgreSQLAdapter(
    db,
    schema.sessions,
    schema.users,
);

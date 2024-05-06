import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./schema";
import { DefaultLogger, type LogWriter } from "drizzle-orm";

class MyLogWriter implements LogWriter {
    write(message: string) {
        // console.log(message);
    }
}

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
    conn: postgres.Sql | undefined;
};

export const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);

if (env.NODE_ENV !== "production") {
    globalForDb.conn = conn;
}

const logger = new DefaultLogger({ writer: new MyLogWriter() });

export const db = drizzle(conn, { schema, logger });

export const adapter = new DrizzlePostgreSQLAdapter(
    db,
    schema.sessions,
    schema.users
);

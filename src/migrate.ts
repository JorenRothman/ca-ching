import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { conn, db } from "@/server/db/db";
// This will run migrations on the database, skipping the ones already applied
(async () => {
    await migrate(db, { migrationsFolder: "./drizzle" });

    conn.end();
})();

// Don't forget to close the connection, otherwise the script will hang

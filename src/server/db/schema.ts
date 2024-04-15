// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
    index,
    numeric,
    pgTableCreator,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => name);

export const posts = createTable(
    "post",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 256 }),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updatedAt"),
    },
    (example) => ({
        nameIndex: index("name_idx").on(example.name),
    })
);

export const users = createTable("user", {
    id: text("id").primaryKey(),
    githubID: numeric("github_id"),
    username: varchar("username", { length: 24 }),
});

export const usersRelations = relations(users, ({ one }) => ({
    session: one(sessions),
}));

export const sessions = createTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
});

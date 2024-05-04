// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { time } from "console";
import { relations } from "drizzle-orm";
import {
    numeric,
    pgTableCreator,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => name);

export const tasks = createTable("task", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    duration: numeric("duration").notNull(),
    date: timestamp("date").defaultNow().notNull(),
    userID: text("user_id")
        .notNull()
        .references(() => users.id),
    clientID: text("client_id")
        .notNull()
        .references(() => client.id),
});

export const taskRelations = relations(tasks, ({ one }) => ({
    client: one(client, {
        fields: [tasks.clientID],
        references: [client.id],
    }),
}));

export const client = createTable("client", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
});

export const accessToken = createTable("access_token", {
    id: text("id").primaryKey(),
    token: text("token").notNull(),
    createdAt: timestamp("date").defaultNow().notNull(),
    userID: text("user_id")
        .notNull()
        .references(() => users.id),
});

export const users = createTable("user", {
    id: text("id").primaryKey(),
    githubID: numeric("github_id"),
    username: varchar("username", { length: 24 }),
});

export const usersRelations = relations(users, ({ one, many }) => ({
    session: one(sessions),
    accessToken: many(accessToken),
    task: many(tasks),
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

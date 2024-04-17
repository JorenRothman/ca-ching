CREATE TABLE IF NOT EXISTS "access_token" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "client" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	"client_id" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "post";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "access_token" ADD CONSTRAINT "access_token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

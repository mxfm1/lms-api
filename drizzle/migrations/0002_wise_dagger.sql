ALTER TABLE "profile" RENAME COLUMN "ñastName" TO "lastName";--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "companyName" text;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "jobName" text;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_email_unique" UNIQUE("email");
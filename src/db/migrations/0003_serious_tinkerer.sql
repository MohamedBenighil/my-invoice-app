ALTER TABLE "custumers" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "custumers" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "custumers" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "custumers" ADD COLUMN "organisationId" text;--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN "organisationId" text;
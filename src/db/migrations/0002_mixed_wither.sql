CREATE TABLE IF NOT EXISTS "custumers" (
	"id" serial PRIMARY KEY NOT NULL,
	"createTs" timestamp DEFAULT now() NOT NULL,
	"name" text,
	"email" text,
	"userId" text
);
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN "customerId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customerId_custumers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."custumers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "donation_type" AS ENUM('blood', 'milk');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "pre_donation_status" AS ENUM('starting', 'in_progress', 'finished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pre_donation_rating" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" "pre_donation_status" NOT NULL,
	"is_eligibility" boolean NOT NULL,
	"performed_necessary_tests" boolean NOT NULL,
	"test_notes" varchar(255) NOT NULL,
	"full_test_link" varchar(255) NOT NULL,
	"type" "donation_type" NOT NULL,
	"approved" boolean NOT NULL,
	"doctor_name" varchar(255),
	"doctor_registration_number" varchar(255),
	"doctor_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pre_donation_rating" ADD CONSTRAINT "pre_donation_rating_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

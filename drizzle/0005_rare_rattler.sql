CREATE TABLE IF NOT EXISTS "patient_medicaments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"stripe" "medicament_stripe" DEFAULT 'no_stripe',
	"frequency" varchar(255) NOT NULL,
	"dosage" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"patient_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_medicaments" ADD CONSTRAINT "patient_medicaments_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

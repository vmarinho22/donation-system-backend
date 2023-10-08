CREATE TABLE IF NOT EXISTS "patient_blood_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"factor_rh" "factor_rh" NOT NULL,
	"patient_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "blood_donations" DROP COLUMN IF EXISTS "factor_rh";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_blood_data" ADD CONSTRAINT "patient_blood_data_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

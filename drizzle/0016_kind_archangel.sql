ALTER TABLE "pre_donation_rating" ADD COLUMN "patient_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "patient_blood_donations" ADD COLUMN "donation_pre_rating_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pre_donation_rating" ADD CONSTRAINT "pre_donation_rating_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_blood_donations" ADD CONSTRAINT "patient_blood_donations_donation_pre_rating_id_pre_donation_rating_id_fk" FOREIGN KEY ("donation_pre_rating_id") REFERENCES "pre_donation_rating"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

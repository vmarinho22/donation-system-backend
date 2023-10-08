ALTER TABLE "patient_transfusion_history" RENAME TO "patient_blood_donations";--> statement-breakpoint
ALTER TABLE "patient_blood_donations" RENAME COLUMN "quantity" TO "bag_quantity";--> statement-breakpoint
ALTER TABLE "patient_blood_donations" DROP CONSTRAINT "patient_transfusion_history_patient_id_patients_id_fk";
--> statement-breakpoint
ALTER TABLE "patient_blood_donations" DROP CONSTRAINT "patient_transfusion_history_doctor_id_doctors_id_fk";
--> statement-breakpoint
ALTER TABLE "patient_blood_donations" DROP CONSTRAINT "patient_transfusion_history_nurse_id_nurses_id_fk";
--> statement-breakpoint
ALTER TABLE "patient_blood_donations" ADD COLUMN "bag_identifier" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "patient_blood_donations" ADD COLUMN "donated_component" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "patient_blood_donations" ADD COLUMN "finality" varchar(255) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_blood_donations" ADD CONSTRAINT "patient_blood_donations_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_blood_donations" ADD CONSTRAINT "patient_blood_donations_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_blood_donations" ADD CONSTRAINT "patient_blood_donations_nurse_id_nurses_id_fk" FOREIGN KEY ("nurse_id") REFERENCES "nurses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "doctors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"specialty" varchar(255) NOT NULL,
	"registration_number" varchar(255) NOT NULL,
	"subspecialties" varchar(255),
	"emergency_tel_contact" varchar(255) NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nurses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"registration_number" varchar(255) NOT NULL,
	"specialty" varchar(255) NOT NULL,
	"subspecialties" varchar(255),
	"emergency_tel_contact" varchar(255) NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patient_transfusion_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" timestamp NOT NULL,
	"location" varchar(255) NOT NULL,
	"reason" varchar(255) NOT NULL,
	"type_transfused_blood_component" varchar(255) NOT NULL,
	"quantity" real NOT NULL,
	"results" varchar(255) NOT NULL,
	"reactions" varchar(255),
	"notes" varchar(255),
	"patient_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"nurse_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctors" ADD CONSTRAINT "doctors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nurses" ADD CONSTRAINT "nurses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_transfusion_history" ADD CONSTRAINT "patient_transfusion_history_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_transfusion_history" ADD CONSTRAINT "patient_transfusion_history_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_transfusion_history" ADD CONSTRAINT "patient_transfusion_history_nurse_id_nurses_id_fk" FOREIGN KEY ("nurse_id") REFERENCES "nurses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

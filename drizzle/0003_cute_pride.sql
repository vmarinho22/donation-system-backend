DO $$ BEGIN
 CREATE TYPE "sex" AS ENUM('man', 'woman', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"birth_date" timestamp NOT NULL,
	"sex" "sex" NOT NULL,
	"gender" varchar(255),
	"age" integer NOT NULL,
	"weight" integer NOT NULL,
	"height" integer NOT NULL,
	"rg" varchar(10) NOT NULL,
	"user_id" uuid NOT NULL,
	"medical_record_id" uuid NOT NULL,
	"blood_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patients" ADD CONSTRAINT "patients_medical_record_id_medical_records_id_fk" FOREIGN KEY ("medical_record_id") REFERENCES "medical_records"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patients" ADD CONSTRAINT "patients_blood_id_bloods_id_fk" FOREIGN KEY ("blood_id") REFERENCES "bloods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

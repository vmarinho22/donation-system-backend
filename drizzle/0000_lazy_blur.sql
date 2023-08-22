DO $$ BEGIN
 CREATE TYPE "blood_type" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_rh" AS ENUM('+', '-');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "langs" AS ENUM('pt_br', 'en_us');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "sex" AS ENUM('man', 'woman', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "intensity_allergies" AS ENUM('low', 'medium', 'hight');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "medicament_stripe" AS ENUM('no_stripe', 'yellow', 'red', 'black');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "roles" AS ENUM('user', 'admin', 'entity', 'doctor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"postal_code" integer NOT NULL,
	"street" varchar(255) NOT NULL,
	"number" integer NOT NULL,
	"no_number" boolean DEFAULT false,
	"complement" varchar(255),
	"district" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"uf" varchar(2) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blood_donations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"location" varchar(255) NOT NULL,
	"donated_component" varchar(255) NOT NULL,
	"quantity" real NOT NULL,
	"finality" varchar(255) NOT NULL,
	"results" varchar(255),
	"notes" varchar(255),
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bloods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "blood_type" NOT NULL,
	"factor_rh" "factor_rh" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "history_infectious_diseases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"date" timestamp NOT NULL,
	"periods" varchar(255) NOT NULL,
	"treatment_received" varchar(255) NOT NULL,
	"results" varchar(255) NOT NULL,
	"did_screening_exams" varchar(255) NOT NULL,
	"screening_exams" varchar(255),
	"screening_exams_date" varchar(255),
	"was_public_health_notices" boolean NOT NULL,
	"risk_behaviors" varchar(255),
	"any_recent_travel" boolean,
	"user_id" uuid NOT NULL,
	"current_illnesses_symptoms" boolean,
	"notes" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "medical_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"has_chronic_diseases" boolean DEFAULT false,
	"chronic_diseases" varchar(255),
	"has_medical_conditions" boolean DEFAULT false,
	"medical_conditions" varchar(255),
	"has_previous_surgeries" boolean DEFAULT false,
	"previous_surgeries" varchar(255),
	"has_blood_borne_diseases" boolean DEFAULT false,
	"has_communicable_diseases" boolean DEFAULT false,
	"communicable_diseases" varchar(255),
	"has_ist" boolean DEFAULT false,
	"ist" varchar(255),
	"use_illicit_drugs" boolean DEFAULT false,
	"use_injecting_drugs" boolean DEFAULT false,
	"has_practice_unprotected_sex" boolean DEFAULT false,
	"had_pregnancy" boolean DEFAULT false,
	"recently_breastfed" boolean DEFAULT false,
	"last_breastfeeding" timestamp,
	"notes" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(125) NOT NULL,
	"last_name" varchar(125) NOT NULL,
	"social_name" varchar(255),
	"lang" "langs" DEFAULT 'pt_br',
	"photo_url" varchar(255) NOT NULL,
	"birth_date" timestamp NOT NULL,
	"cpf" varchar(11) NOT NULL,
	"rg" varchar(9) NOT NULL,
	"phone" varchar(14) NOT NULL,
	"tel" varchar(14),
	"sex" "sex",
	"gender" varchar(125) NOT NULL,
	"age" integer NOT NULL,
	"height" real NOT NULL,
	"weight" real NOT NULL,
	"address_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_allergies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"causative" varchar(255) NOT NULL,
	"intensity" "intensity_allergies" DEFAULT 'low',
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_medicaments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"stripe" "medicament_stripe" DEFAULT 'no_stripe',
	"frequency" varchar(255) NOT NULL,
	"dosage" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_password_recoveries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" integer NOT NULL,
	"validate" timestamp,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "roles" DEFAULT 'user',
	"profile_id" uuid NOT NULL,
	"medical_record_id" uuid NOT NULL,
	"blood_data_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_transfusion_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" timestamp NOT NULL,
	"location" varchar(255) NOT NULL,
	"reason" varchar(255) NOT NULL,
	"type_transfused_blood_component" varchar(255) NOT NULL,
	"quantity" real NOT NULL,
	"results" varchar(255) NOT NULL,
	"reactions" varchar(255),
	"doctor_responsible" varchar(255) NOT NULL,
	"reference_contact" varchar(255) NOT NULL,
	"notes" varchar(255),
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blood_donations" ADD CONSTRAINT "blood_donations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "history_infectious_diseases" ADD CONSTRAINT "history_infectious_diseases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_address_id_address_id_fk" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_allergies" ADD CONSTRAINT "user_allergies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_medicaments" ADD CONSTRAINT "user_medicaments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_password_recoveries" ADD CONSTRAINT "user_password_recoveries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_medical_record_id_medical_records_id_fk" FOREIGN KEY ("medical_record_id") REFERENCES "medical_records"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_blood_data_id_bloods_id_fk" FOREIGN KEY ("blood_data_id") REFERENCES "bloods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_transfusion_history" ADD CONSTRAINT "user_transfusion_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "blood_donations" ADD COLUMN "factor_rh" "factor_rh" NOT NULL;--> statement-breakpoint
ALTER TABLE "bloods" DROP COLUMN IF EXISTS "factor_rh";
CREATE TYPE "doctor_specialization" AS ENUM('CARDIOLOGY', 'NEUROLOGY', 'PEDIATRICS', 'SURGERY', 'DERMATOLOGY', 'OPHTHALMOLOGY', 'DENTISTRY', 'GYNECOLOGY', 'UROLOGY', 'ORTHOPEDICS', 'RADIOLOGY', 'ANESTHESIOLOGY', 'PSYCHIATRY', 'ONCOLOGY', 'GENERAL_PRACTICE');--> statement-breakpoint
CREATE TYPE "work_schedule_type" AS ENUM('FULL-TIME', 'PART-TIME');--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "patiens" uuid[] DEFAULT ARRAY[]::uuid[] NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ALTER COLUMN "middle_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ALTER COLUMN "specialization" SET DATA TYPE "doctor_specialization" USING "specialization"::"doctor_specialization";--> statement-breakpoint
ALTER TABLE "doctors" ALTER COLUMN "marital_status" SET DATA TYPE boolean USING "marital_status"::boolean;--> statement-breakpoint
ALTER TABLE "doctors" ALTER COLUMN "marital_status" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "doctors" ALTER COLUMN "marital_status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ALTER COLUMN "work_schedule" SET DATA TYPE "work_schedule_type" USING "work_schedule"::"work_schedule_type";--> statement-breakpoint
ALTER TABLE "doctors" ALTER COLUMN "work_schedule" SET DEFAULT 'FULL-TIME'::"work_schedule_type";--> statement-breakpoint
ALTER TABLE "doctors" ALTER COLUMN "work_schedule" SET NOT NULL;
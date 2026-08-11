CREATE TYPE "room_status" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "user_role" AS ENUM('ADMIN', 'DOCTOR');--> statement-breakpoint
CREATE TYPE "user_status" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TABLE "departments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(150) NOT NULL UNIQUE,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "doctor_work_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"doctor_id" uuid NOT NULL,
	"organization_name" varchar(255) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"position" varchar(150) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "doctors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"department_id" uuid NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"middle_name" varchar(100),
	"avatar_url" text,
	"specialization" varchar(150) NOT NULL,
	"birth_date" date,
	"birth_place" varchar(255),
	"address" text,
	"marital_status" varchar(50),
	"education" text,
	"phone" varchar(30),
	"emergency_phone" varchar(30),
	"hire_date" date,
	"employment_type" varchar(50),
	"work_schedule" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medical_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"patient_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"treatment_date" date NOT NULL,
	"disease_type" varchar(255) NOT NULL,
	"diagnosis" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"middle_name" varchar(100),
	"avatar_url" text,
	"birth_date" date,
	"birth_place" varchar(255),
	"address" text,
	"marital_status" varchar(50),
	"education" text,
	"workplace" varchar(255),
	"phone" varchar(30),
	"emergency_phone" varchar(30),
	"blood_group" varchar(10),
	"rh_factor" varchar(5),
	"insurance_policy" varchar(100),
	"insurance_provider" varchar(255),
	"weight" numeric(5,2),
	"height" numeric(5,2),
	"allergies" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"department_id" uuid NOT NULL,
	"room_number" varchar(50) NOT NULL,
	"floor" integer,
	"capacity" integer DEFAULT 1 NOT NULL,
	"description" text,
	"status" "room_status" DEFAULT 'ACTIVE'::"room_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"role" "user_role" DEFAULT 'ADMIN'::"user_role" NOT NULL,
	"status" "user_status" DEFAULT 'ACTIVE'::"user_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "doctor_work_history" ADD CONSTRAINT "doctor_work_history_doctor_id_doctors_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_department_id_departments_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "medical_records" ADD CONSTRAINT "medical_records_patient_id_patients_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "medical_records" ADD CONSTRAINT "medical_records_doctor_id_doctors_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_department_id_departments_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
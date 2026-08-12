import { boolean, date, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { departments } from "./department.model.js";

export const workScheduleEnum = pgEnum('work_schedule_type', ["FULL-TIME", "PART-TIME"]);

export const doctorSpecializationEnum = pgEnum(
    "doctor_specialization",
    [
        "CARDIOLOGY",
        "NEUROLOGY",
        "PEDIATRICS",
        "SURGERY",
        "DERMATOLOGY",
        "OPHTHALMOLOGY",
        "DENTISTRY",
        "GYNECOLOGY",
        "UROLOGY",
        "ORTHOPEDICS",
        "RADIOLOGY",
        "ANESTHESIOLOGY",
        "PSYCHIATRY",
        "ONCOLOGY",
        "GENERAL_PRACTICE",
    ],
);

export const doctors = pgTable("doctors", {
    id: uuid("id").defaultRandom().primaryKey(),
    departmentId: uuid("department_id").notNull().references(() => departments.id,
        { onDelete: "restrict", onUpdate: "cascade" }
    ),
    firstName: varchar("first_name", { length: 100, }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    middleName: varchar("middle_name", { length: 100 }).notNull(),
    avatarUrl: text("avatar_url"),
    specialization: doctorSpecializationEnum('specialization').notNull(),
    birthDate: date("birth_date"),
    birthPlace: varchar("birth_place", { length: 255 }),
    address: text("address"),
    maritalStatus: boolean("marital_status").notNull().default(false),
    education: text("education"),
    phone: varchar("phone", { length: 30 }),
    emergencyPhone: varchar("emergency_phone", { length: 30 }),
    hireDate: date("hire_date"),
    employmentType: varchar("employment_type", { length: 50 }),
    workSchedule: workScheduleEnum("work_schedule").notNull().default('FULL-TIME'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});
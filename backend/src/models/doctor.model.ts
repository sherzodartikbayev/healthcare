import { date, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { departments } from "./department.model.js";

export const doctors = pgTable("doctors", {
    id: uuid("id").defaultRandom().primaryKey(),
    departmentId: uuid("department_id").notNull().references(() => departments.id,
        { onDelete: "restrict", onUpdate: "cascade" }
    ),
    firstName: varchar("first_name", { length: 100, }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    middleName: varchar("middle_name", { length: 100 }),
    avatarUrl: text("avatar_url"),
    specialization: varchar("specialization", { length: 150 }).notNull(),
    birthDate: date("birth_date"),
    birthPlace: varchar("birth_place", { length: 255 }),
    address: text("address"),
    maritalStatus: varchar("marital_status", { length: 50, }),
    education: text("education"),
    phone: varchar("phone", { length: 30 }),
    emergencyPhone: varchar("emergency_phone", { length: 30 }),
    hireDate: date("hire_date"),
    employmentType: varchar("employment_type", { length: 50 }),
    workSchedule: varchar("work_schedule", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});
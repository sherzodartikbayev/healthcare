import { date, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { doctors } from "./doctor.model.js";

export const doctorWorkHistory = pgTable(
    "doctor_work_history",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        doctorId: uuid("doctor_id").notNull().references(() => doctors.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
        organizationName: varchar("organization_name", { length: 255 }).notNull(),
        startDate: date("start_date").notNull(),
        endDate: date("end_date"),
        position: varchar("position", { length: 150 }).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    }
);
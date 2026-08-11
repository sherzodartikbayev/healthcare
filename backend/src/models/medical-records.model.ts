import { date, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { patients } from "./patient.model.js";
import { doctors } from "./doctor.model.js";

export const medicalRecords = pgTable(
    "medical_records",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        patientId: uuid("patient_id").notNull().references(() => patients.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
        doctorId: uuid("doctor_id").notNull().references(() => doctors.id, {
            onDelete: "restrict",
            onUpdate: "cascade",
        }),
        treatmentDate: date("treatment_date").notNull(),
        diseaseType: varchar("disease_type", { length: 255 }).notNull(),
        diagnosis: text("diagnosis"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull()
    }
);
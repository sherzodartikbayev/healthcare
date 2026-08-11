import { date, numeric, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
    id: uuid("id").defaultRandom().primaryKey(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    middleName: varchar("middle_name", { length: 100 }),
    avatarUrl: text("avatar_url"),
    birthDate: date("birth_date"),
    birthPlace: varchar("birth_place", { length: 255 }),
    address: text("address"),
    maritalStatus: varchar("marital_status", { length: 50 }),
    education: text("education"),
    workplace: varchar("workplace", { length: 255 }),
    phone: varchar("phone", { length: 30 }),
    emergencyPhone: varchar("emergency_phone", { length: 30 }),
    bloodGroup: varchar("blood_group", { length: 10 }),
    rhFactor: varchar("rh_factor", { length: 5 }),
    insurancePolicy: varchar("insurance_policy", { length: 100 }),
    insuranceProvider: varchar("insurance_provider", { length: 255 }),
    weight: numeric("weight", {
        precision: 5,
        scale: 2,
    }),
    height: numeric("height", {
        precision: 5,
        scale: 2,
    }),
    allergies: text("allergies"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});
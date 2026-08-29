import {
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";
import { departments } from "./department.model.js";
import { sql } from "drizzle-orm";

export const roomStatusEnum = pgEnum("room_status", [
    "ACTIVE",
    "INACTIVE",
]);

export const rooms = pgTable("rooms", {
    id: uuid("id").defaultRandom().primaryKey(),
    departmentId: uuid("department_id").notNull().references(() => departments.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
    }),
    roomNumber: integer("room_number").notNull(),
    floor: integer("floor"),
    capacity: integer("capacity").notNull().default(1),
    patients: uuid("patiens").array().notNull().default(sql`ARRAY[]::uuid[]`),
    description: text("description"),
    status: roomStatusEnum("status").notNull().default("ACTIVE"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});

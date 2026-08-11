import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum("user_role", [
  "ADMIN",
  "DOCTOR"
]);

export const userStatusEnum = pgEnum('user_status', [
  "ACTIVE",
  "INACTIVE",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRoleEnum("role").notNull().default("ADMIN"),
  status: userStatusEnum("status").notNull().default("ACTIVE"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
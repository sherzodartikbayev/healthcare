import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const departments = pgTable("departments", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 150 }).notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

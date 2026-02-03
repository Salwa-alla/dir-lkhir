import { pgTable, text, integer, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { user } from "./auth/user";

export const needs = pgTable("needs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  city: text("city").notNull(),
  category: text("category").notNull(),
  whatsapp: text("whatsapp").notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  status: text("status").default("open").notNull(), // "open" or "complete"
  volunteersCount: integer("volunteers_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Need = typeof needs.$inferSelect;
export type NewNeed = typeof needs.$inferInsert;

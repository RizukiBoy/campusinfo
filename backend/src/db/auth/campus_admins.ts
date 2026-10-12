import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.js";

/**
 * Admin kampus — 1:1 dengan `users` (unique user_id), terikat satu kampus.
 * PRD §5.2.
 */
export const campusAdmins = pgTable("campus_admins", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id),
  // FK ke `campuses` ditambahkan saat modul campus dibuat (tabel belum ada).
  campusId: uuid("campus_id").notNull(),
  position: varchar("position", { length: 255 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type CampusAdmin = typeof campusAdmins.$inferSelect;
export type NewCampusAdmin = typeof campusAdmins.$inferInsert;

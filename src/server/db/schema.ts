import { relations, sql } from "drizzle-orm";
import {
  numeric,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `protoIzyContent_${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  role: varchar("role", { length: 255 }).notNull().default("USER"),
  tierId: varchar("tierId", { length: 255 }).notNull().default("1"),
  firstName: varchar("firstName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
  email: varchar("email", { length: 255 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const tiers = createTable("tier", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: numeric("price", {
    precision: 4,
    scale: 2,
  }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull(), // Assuming ISO currency codes (e.g., USD, EUR)
  productId: varchar("productId", { length: 255 }),
});

export const videos = createTable("video", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id),
  moodId: text("moodId")
    .notNull()
    .references(() => moods.id),
  url: varchar("url", { length: 1024 }).notNull(),
  text1: text("text1").notNull(),
  text2: text("text2"),
  text3: text("text3"),
});

export const moods = createTable("mood", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  videos: many(videos),
  tier: one(tiers, { fields: [users.tierId], references: [tiers.id] }),
}));

export const videosRelations = relations(videos, ({ one }) => ({
  user: one(users, { fields: [videos.userId], references: [users.id] }),
  mood: one(moods, { fields: [videos.moodId], references: [moods.id] }),
}));

export const tiersRelations = relations(tiers, ({ many }) => ({
  users: many(users),
}));

export const moodsRelations = relations(moods, ({ many }) => ({
  videos: many(videos),
}));

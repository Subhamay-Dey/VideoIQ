import { pgTable, serial, text, varchar, uuid, integer, smallint, timestamp, foreignKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  email: varchar("email", { length: 191 }).notNull().unique(),
  image: text("image"),
  oauth_id: text("oauth_id").notNull(),
  provider: varchar("provider", { length: 191 }).notNull(),
  coins: integer("coins").default(50).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Summary Table
export const summary = pgTable("summary", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // ✅ Cascade delete at DB level
  title: text("title").notNull(),
  url: text("url").notNull(),
  response: text("response"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Transactions Table
export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // ✅ Cascade delete at DB level
  amount: integer("amount").notNull(),
  status: smallint("status").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Coin Spend Table
export const coinSpend = pgTable("coin_spend", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // ✅ Cascade delete at DB level
  summary_id: uuid("summary_id")
    .notNull()
    .references(() => summary.id, { onDelete: "cascade" }), // ✅ Cascade delete at DB level
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Relationships (without `onDelete`)
export const usersRelations = relations(users, ({ many }) => ({
  summaries: many(summary),
  transactions: many(transactions),
  coinSpends: many(coinSpend),
}));

export const summaryRelations = relations(summary, ({ one, many }) => ({
  user: one(users, { fields: [summary.user_id], references: [users.id] }),
  coinSpends: many(coinSpend),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, { fields: [transactions.user_id], references: [users.id] }),
}));

export const coinSpendRelations = relations(coinSpend, ({ one }) => ({
  user: one(users, { fields: [coinSpend.user_id], references: [users.id] }),
  summary: one(summary, { fields: [coinSpend.summary_id], references: [summary.id] }),
}));

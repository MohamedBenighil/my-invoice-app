import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { AVAILABLE_STATUS } from "@/data/invoices";

export type Status = (typeof AVAILABLE_STATUS)[number]["id"];

const statuses = AVAILABLE_STATUS.map(({ id }) => id) as Array<Status>;

export const statusEnum = pgEnum(
  "status",
  statuses as [Status, ...Array<Status>]
);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").notNull().defaultNow(),
  value: integer("value").notNull(),
  description: text("description"),
  userId: text("userId"),
  customerId: integer("customerId")
    .notNull()
    .references(() => Custumers.id),
  status: statusEnum("status").notNull(),
});

export const Custumers = pgTable("custumers", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").notNull().defaultNow(),
  name: text("name"),
  email: text("email"),
  userId: text("userId"),
});

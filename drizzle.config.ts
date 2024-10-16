import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

if (typeof process.env.XATA_DATABASE_URL !== "string")
  throw new Error("Please set your XATA_DATABASE_URL env var ");

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.XATA_DATABASE_URL,
  },
});

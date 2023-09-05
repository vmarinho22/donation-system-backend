import 'dotenv/config';
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.PG_STRING_CONNECTION || 'postgres://postgres:postgres@localhost:5432/postgres',
  }
} satisfies Config;
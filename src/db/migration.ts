import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import env from '../config/env'

// for migrations
const migrationClient = postgres(env.DB_CONNECTION_STRING, { max: 1 });

async function migration() {
  await migrate(drizzle(migrationClient), {migrationsFolder: 'drizzle'});
  process.exit();
}

migration();
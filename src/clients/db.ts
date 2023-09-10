import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import env from '../config/env';

const queryClient = postgres(env.DB_CONNECTION_STRING, {
  ssl: "prefer",
});
const dbClient: PostgresJsDatabase = drizzle(queryClient);

export default dbClient;
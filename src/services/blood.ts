import { createSelectSchema } from "drizzle-zod";
import { bloods } from "../db/schema/bloods";
import { z } from "zod";
import dbClient from "../clients/db";
import { eq } from "drizzle-orm";

const bloodSchema = createSelectSchema(bloods);

export type Blood = z.infer<typeof bloodSchema>;

async function getUnique(id: string): Promise<Blood | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedBlood = await dbClient.select().from(bloods).where(eq(bloods.id, parsedId));

  if (returnedBlood.length === 0) return null;

  return returnedBlood[0];
}

async function getAll(): Promise<Blood[]> {
  const returnedBloods = await dbClient.select().from(bloods);

  return returnedBloods;
}

export default {
  getUnique,
  getAll
}
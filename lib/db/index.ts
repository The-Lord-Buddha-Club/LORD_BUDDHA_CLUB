import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { schema } from "./schema"; // Adjust the path as needed


const sql = neon<boolean, boolean>(process.env.DATABASE_URL!);
export const db = drizzle<typeof schema>(sql, { schema });
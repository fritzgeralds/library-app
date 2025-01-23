import config from "@/lib/config";
import { drizzle } from "drizzle-orm/node-postgres";

const {
  env: { databaseUrl },
} = config;

export const db = drizzle(databaseUrl);

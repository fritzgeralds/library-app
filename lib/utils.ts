import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { clsx, type ClassValue } from "clsx";
import { eq } from "drizzle-orm";
import { User } from "next-auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const updateLastActivityTime = async (user: User) => {
  if (!user.id) return;

  const today = new Date().toISOString().slice(0, 10);

  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (!result[0].lastActivityDate || result[0].lastActivityDate === today)
    return;

  return db
    .update(users)
    .set({
      lastActivityDate: today,
    })
    .where(eq(users.id, user.id));
};

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user[0]) {
    return new NextResponse(null, { status: 401 });
  }

  const passwordMatch = await compare(password, user[0].password);

  if (!passwordMatch) {
    return new NextResponse(null, { status: 401 });
  }

  return NextResponse.json({
    id: user[0].id,
    email: user[0].email,
    name: user[0].fullName,
  });
}

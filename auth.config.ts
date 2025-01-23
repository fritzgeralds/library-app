import config from "@/lib/config";
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const {
  env: { apiEndpoint },
} = config;

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(`${apiEndpoint}/api/auth/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          return await response.json();
        } catch (error) {
          return null;
        }

        // const user = await db
        //   .select()
        //   .from(users)
        //   .where(eq(users.email, credentials.email.toString()))
        //   .limit(1);
        //
        // if (user.length === 0) return null;
        //
        // const isPasswordValid = await compare(
        //   credentials.password.toString(),
        //   user[0].password,
        // );
        //
        // if (!isPasswordValid) return null;
        //
        // return {
        //   id: user[0].id.toString(),
        //   email: user[0].email,
        //   name: user[0].fullName,
        // } as User;
      },
    }),
  ],
} satisfies NextAuthConfig;

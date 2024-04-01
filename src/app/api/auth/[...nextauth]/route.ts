import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/prisma";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user)
          throw new Error(
            JSON.stringify({
              error: "user not found",
              status: 400,
              statusText: "user not found",
            })
          );

        const isPasswordValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isPasswordValid)
          throw new Error(
            JSON.stringify({
              error: "password not valid",
              status: 400,
              statusText: "password not valid",
            })
          );

        return {
          id: user.id,
          name: user.firstName + " " + user.lastName,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.id = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) return session;

      const userSession = await db.user.findUnique({
        where: {
          // @ts-ignore
          id: token.id,
        },
      });
      
      // @ts-ignore
      const { password: _, ...user } = userSession;
      session.user = user;
      return session;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

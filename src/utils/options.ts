import { AuthOptions } from "next-auth";
import db from "@/libs/prisma";
import bcrypt from "bcrypt";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          console.log('hola')
          const user = await db.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
  
          console.log(user)
  
          if (!user) {
            throw new Error("user not found");
          }
  
          const isPasswordValid = await bcrypt.compare(
            credentials!.password,
            user.password
          );
  
          if (isPasswordValid) {
            return {
              id: user.id,
              name: user.firstName + " " + user.lastName,
              email: user.email,
            }
          }
  
          return null
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
      },
    },
  };
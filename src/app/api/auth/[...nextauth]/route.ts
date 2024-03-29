import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/prisma";
import bcrypt from "bcrypt";

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
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
        console.log(user, credentials);

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
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };

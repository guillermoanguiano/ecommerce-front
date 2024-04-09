import { usersApi } from "@/api/admin/users";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const res = await usersApi.signIn(
                    credentials?.email as string,
                    credentials?.password as string
                );
                
                const user = await res.json();

                if (user.error || !res.ok || !user) {
                    return null;
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
};

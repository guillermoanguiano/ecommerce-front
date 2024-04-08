import NextAuth from "next-auth";


declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            firstName: string,
            lastName: string,
            email: string,
            admin?: boolean,
            sub: string,
            iat: number,
            exp: number,
            jti: string,
            accessToken: string            
        }
    }
}


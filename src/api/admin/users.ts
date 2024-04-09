import { User } from "@/types/User.interface";


export const usersApi = {
    getUsers: async () => {},
    signUp: async (values: User) => {
        const res = await fetch(process.env.API_URL + "/users" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        return res;
    },
    signIn: async (email: string, password: string) => {
        const res = await fetch(
            process.env.API_URL + "/users/auth",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );
        return res;
    }
}

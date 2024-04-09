import { Product } from "@/types/Product.interface";

export const productApi = {
    addProduct: async (values: Product) => {
        const res = await fetch(process.env.API_URL + "/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        return res;
    },
    getCategories: async () => {
        const res = await fetch(process.env.API_URL + "/categories");
        const data = await res.json();
        return data;
    }
};

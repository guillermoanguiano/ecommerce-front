import { IProductAPI } from "@/types/Product.interface";

export const productApi = {
    addProduct: async (values: IProductAPI) => {
        const res = await fetch("http://localhost:4000/api/products", {
            cache: "no-store",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        return res;
    },
    getProducts: async (page: string = "1", limit: string = "10") => {
        const res = await fetch(
            `http://localhost:4000/api/products?page=${page}&limit=${limit}`
        );
        const data = await res.json();
        return data;
    },
    getCategories: async () => {
        const res = await fetch("http://localhost:4000/api/categories");
        const data = await res.json();
        return data;
    },
    addCategory: async (name: string) => {
        const res = await fetch("http://localhost:4000/api/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        return res;
    },
};

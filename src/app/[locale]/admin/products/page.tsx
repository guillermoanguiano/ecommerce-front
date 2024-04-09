import Products from "@/modules/Admin/Products/Products";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const text = await getTranslations({
        locale,
        namespace: "Metadata.Products",
    });

    return {
        title: text("title"),
        description: text("description"),
    };
}

const getCategories = async () => {
    try {
        const response = await fetch("http://localhost:4000/api/categories");
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Something went wrong");
    }
};

export default async function ProductsPage() {
    const categories = await getCategories();

    return <Products categories={categories} />;
}

import { productApi } from "@/api/admin/products";
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
        const data = await productApi.getCategories();
        return data;
    } catch (error) {
        throw new Error("Something went wrong");
    }
};

// TODO: Consumir api para traer productos

export default async function ProductsPage() {
    const categories = await getCategories();

    return <Products categories={categories} />;
}

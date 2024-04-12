import { productApi } from "@/api/products";
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

export default async function ProductsPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}) {
    const categories = await getCategories();
    const { page, limit } = searchParams!;
    const products = await productApi.getProducts(page, limit);
    // console.log(products, categories);

    return <Products categories={categories} products={products} />;
}

import { productApi } from "@/api/products";
import Home from "@/modules/Home/Home";

export default async function HomePage() {
    const categories = await productApi.getCategories();
    return <Home categories={categories} />;
}

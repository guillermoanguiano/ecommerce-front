import { productApi } from "@/api/products";
import Categories from "@/modules/Admin/Categories/Categories";

export default async function CategoriesPage() {
    const categories = await productApi.getCategories();

    return <Categories categories={categories} />;
}

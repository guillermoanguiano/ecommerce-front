

interface Product {
    name: string;
    description: string;
    price: number | string;
    image: string;
    category: string; 
    stock: number;
}

interface ProductCategory {
    id: number;
    name: string;
}

export type { Product, ProductCategory };

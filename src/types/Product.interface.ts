

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'Electronics' | 'Computers' | 'Accessories'; 
    stock: number;
}

interface ProductCategory {
    id: number;
    name: string;
}

export type { Product, ProductCategory };

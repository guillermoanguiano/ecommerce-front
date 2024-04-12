

interface IProduct {
    id?: number;
    name: string;
    description: string;
    price: number | string;
    imageUrl: string;
    image?: string;
    category: string; 
    stock: number;
}

interface IProductAPI {
    id?: number;
    name: string;
    description: string;
    price: number | string;
    image: string;
    category: string; 
    stock: number;
}

interface IProductCategory {
    id: number;
    name: string;
    icon: string;
}

interface IProductResponse {
    total: number;
    list: IProduct[];
}

export type { IProduct, IProductCategory, IProductResponse, IProductAPI };

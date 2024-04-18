

interface IProduct {
    id?: number;
    name: string;
    description: string;
    price: number | string;
    imageUrls: string[];
    category: string; 
    stock: number;
}

interface IProductAPI {
    id?: number;
    name: string;
    description: string;
    price: number | string;
    images: string[];
    category: string; 
    stock: number;
}

interface IProductCategory {
    id?: number;
    name: string;
}

interface IProductResponse {
    total: number;
    list: IProduct[];
}

export type { IProduct, IProductCategory, IProductResponse, IProductAPI };

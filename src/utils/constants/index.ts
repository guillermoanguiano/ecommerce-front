import { IProduct } from "@/types/Product.interface";

export const drawerwidth = 240;

interface IProducts extends IProduct {
  id: number;
}

const products: IProducts[] = [
    {
      id: 1,
      name: "Smartphone",
      description: "A powerful smartphone with great features",
      price: 599.99,
      imageUrl: "smartphone.jpg",
      category: 'Electronics',
      stock: 100,
    },
    {
      id: 2,
      name: "Laptop",
      description: "A high-performance laptop for all your needs",
      price: 1299.99,
      imageUrl: "laptop.jpg",
      category: 'Computers',
      stock: 50,
    },
    {
      id: 3,
      name: "Headphones",
      description: "High-quality headphones for immersive audio experience",
      price: 149.99,
      imageUrl: "headphones.jpg",
      category: 'Accessories',
      stock: 75,
    },
    // Agrega más objetos de productos según sea necesario
  ];
  
  export default products;
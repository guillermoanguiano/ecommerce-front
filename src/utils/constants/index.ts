import { Product } from "@/types/Product.interface";

export const drawerwidth = 240;

interface Products extends Product {
  id: number;
}

const products: Products[] = [
    {
      id: 1,
      name: "Smartphone",
      description: "A powerful smartphone with great features",
      price: 599.99,
      image: "smartphone.jpg",
      category: 'Electronics',
      stock: 100,
    },
    {
      id: 2,
      name: "Laptop",
      description: "A high-performance laptop for all your needs",
      price: 1299.99,
      image: "laptop.jpg",
      category: 'Computers',
      stock: 50,
    },
    {
      id: 3,
      name: "Headphones",
      description: "High-quality headphones for immersive audio experience",
      price: 149.99,
      image: "headphones.jpg",
      category: 'Accessories',
      stock: 75,
    },
    // Agrega más objetos de productos según sea necesario
  ];
  
  export default products;
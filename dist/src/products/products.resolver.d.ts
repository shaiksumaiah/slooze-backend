import { ProductsService } from './products.service';
export declare class ProductType {
    id: string;
    name: string;
    description?: string;
    category: string;
    price: number;
    stock: number;
    sku: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ProductsResolver {
    private productsService;
    constructor(productsService: ProductsService);
    products(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        sku: string;
        description: string | null;
        category: string;
        price: number;
        stock: number;
    }[]>;
    createProduct(name: string, category: string, price: number, stock: number, sku: string, description?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        sku: string;
        description: string | null;
        category: string;
        price: number;
        stock: number;
    }>;
    updateProduct(id: string, name?: string, category?: string, price?: number, stock?: number, description?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        sku: string;
        description: string | null;
        category: string;
        price: number;
        stock: number;
    }>;
}

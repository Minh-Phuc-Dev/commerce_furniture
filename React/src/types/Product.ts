export type Product = {
    id: number;
    name: string;
    price: number;
    oldPrice: number;
    quantity: number;
    status: string;
    sku: string;
    categoryId: number;
    description: string;
    attributes: {
        image: string[];
    };
    meta: Record<string, unknown>;
    updatedAt: string;
    createdAt: string;
    rating: number;
}
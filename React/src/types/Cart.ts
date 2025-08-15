export type Cart<I = Record<string, any>> = {
    id: number;
    productId: number;
    quantity: number,
    userId: number;
    updatedAt: string;
    createdAt: string;
    product: I
}
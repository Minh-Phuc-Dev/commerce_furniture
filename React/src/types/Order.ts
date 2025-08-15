export type OrderItem<I = Record<string, any>> = {
    id: number
    orderId: number
    productId: number
    quantity: number
    price: string
    attributes: any
    meta: any
    createdAt: string
    updatedAt: string
    product: I
}


export type Order<I = Record<string, any>> = {
    id: number;
    userId: number;
    quantity: number,
    status: string
    totalAmount: number
    updatedAt: string;
    createdAt: string;
    attributes: {
        streetAddress: string
    }
    items: OrderItem<I>[]
    meta: Record<string, string>
}
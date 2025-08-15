export type Category  = {
    id: number;
    name: string;
    attributes: {
        image: string
    };
    meta: object;
    createdAt: string;
    updatedAt?: string;
}
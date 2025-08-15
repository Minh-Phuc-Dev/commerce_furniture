import {AUTHENTICATE_STATUS} from "contexts/Authenticate/Enum.ts";
import {Cart} from "types/Cart";
import {Product} from "types/Product";

export type Status = typeof AUTHENTICATE_STATUS [keyof typeof AUTHENTICATE_STATUS]

export type CartState = {
    status: Status
    cart: Cart<Product>[]
}
import {ORDER_STATUS} from "contexts/Order/Enum.ts";
import {Order} from "types/Order";
import {Product} from "types/Product";

export type Status = typeof ORDER_STATUS [keyof typeof ORDER_STATUS]

export type OrderState = {
    status: Status
    order: Order<Product>[]
}
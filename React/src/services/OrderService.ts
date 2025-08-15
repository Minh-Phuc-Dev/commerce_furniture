import interceptor from "apis/Interceptor";
import {requestApiHelper} from "helpers/Request";
import type {Order} from "types/Order";
import {Product} from "types/Product";


class OrderService {

    static async addOrder<T = Product>(
        payload: any
    ) {
        return await requestApiHelper<T, T>(
            interceptor.post(
                "orders",
                payload
            )
        )
    }

    static async get<T = Order[]>() {
        return await requestApiHelper<T, T>(
            interceptor.get("orders" )
        )
    }

    static async updateStatus<T = Product>(
        payload: {
            id: number
            status: string
        }
    ) {
        return await requestApiHelper<T, T>(
            interceptor.patch(
                "orders/status",
                payload
            )
        )
    }

}

export default OrderService
import interceptor from "apis/Interceptor";
import {requestApiHelper} from "helpers/Request";
import {Cart} from "types/Cart";
import {Product} from "types/Product";

class CartService {

    static async addProduct<T = Product>(
        payload: {
            productId: number,
            quantity: number
        }
    ) {
        return await requestApiHelper<T, T>(
            interceptor.post(
                "cart",
                payload
            )
        )
    }

    static async removeProduct<T = Product>(
        payload: {
            productId: number,
            quantity: number
        }
    ) {
        return await requestApiHelper<T, T>(
            interceptor.delete(
                "cart",
                {
                    data: payload
                }
            )
        )
    }

    static async get<T = Cart<Product>[]>() {
        return await requestApiHelper<T, T>(
            interceptor.get(
                "cart"
            )
        )
    }
}

export default CartService
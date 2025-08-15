import interceptor from "apis/Interceptor";
import {requestApiHelper} from "helpers/Request";
import type {Order} from "types/Order";
import {Product} from "types/Product";

class StatisticsService {

    static async getOrder<T = {total: number, pending: number, processing: number, cancelled: number, completed: number}>() {
        return await requestApiHelper<T, T>(
            interceptor.get(
                "statistics/order"
            )
        )
    }

    static async getOrderByDate<T>() {
        return await requestApiHelper<T, T>(
            interceptor.get(
                "statistics/order/date"
            )
        )
    }

    static async getProducts<T = Product[]>() {
        return await requestApiHelper<T, T>(
            interceptor.get(
                "statistics/products"
            )
        )
    }

    static async getOrders<T = Order[]>() {
        return await requestApiHelper<T, T>(
            interceptor.get("statistics/orders" )
        )
    }

}

export default StatisticsService
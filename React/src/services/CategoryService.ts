import interceptor from "apis/Interceptor";
import {requestApiHelper} from "helpers/Request";
import {Category} from "types/Category";

class CategoryService {

    static async create<T = Category>(
        payload: {
            name: string
        }
    ) {
        return await requestApiHelper<T, T>(
            interceptor.post(
                "categories",
                payload
            )
        )
    }

    static async update<T = Category>(
        payload: Category
    ) {
        return await requestApiHelper<T, T>(
            interceptor.put(
                "categories",
                payload
            )
        )
    }

    static async get<T = Category[]>() {
        return await requestApiHelper<T, T>(
            interceptor.get(
                "categories"
            )
        )
    }
}

export default CategoryService
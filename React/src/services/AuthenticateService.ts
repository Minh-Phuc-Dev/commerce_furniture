import interceptor from "apis/Interceptor";
import { requestApiHelper } from "helpers/Request";
import { User } from "types/Authenticate";


class AuthenticateService {

    static async login(payload: {
        email: string,
        password: string
    }) {
        return await requestApiHelper(
            interceptor.post(
                "login",
                payload,
                {
                    withCredentials: true
                }
            )
        )
    }


    static async forget(payload: {
        email: string,
    }) {
        return await requestApiHelper(
            interceptor.post(
                "forget",
                payload,
                {
                    withCredentials: false
                }
            )
        )
    }

    static async profile<T = User>(payload: Record<string, string>) {
        return await requestApiHelper<T>(
            interceptor.patch(
                "profile",
                payload
            )
        )
    }


    static async resetPassword(payload: {
        email: string,
        password: string,
        otp: string
    }) {
        return await requestApiHelper(
            interceptor.post(
                "reset",
                payload,
                {
                    withCredentials: true
                }
            )
        )
    }

    static async register(payload: { email: string, password: string, displayName: string }) {
        return await requestApiHelper(
            interceptor.post("register", payload)
        )
    }

    static getCredential() {
        return requestApiHelper<User>(
            interceptor.get(
                "credential"
            )
        )
    }

    static logout() {
        return requestApiHelper(
            interceptor.get(
                "logout"
            )
        )
    }
}

export default AuthenticateService
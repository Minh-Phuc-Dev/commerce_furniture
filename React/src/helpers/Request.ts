import {AxiosError, AxiosResponse} from "axios";

export interface ResponseBase<D , M > {
    error: boolean
    success: boolean
    errorDetail?: unknown
    code?: number
    httpStatus?: number
    payload?: D
    message?: M
}

export const requestApiHelper = async <D = never , M = never >(promise: Promise<AxiosResponse<ResponseBase<D, M>>>): Promise<ResponseBase<D, M>> => {
    try {
        const { data } = await promise
        return data
    } catch (error) {
        if(error instanceof AxiosError){
            return {
                error: true,
                success: false,
                errorDetail: error,
                code: error?.response?.data.code,
                httpStatus: error?.response?.status,
                payload: error?.response?.data.payload,
            }
        }
        return {
            error: true,
            success: false,
            errorDetail: error
        }
    }
}
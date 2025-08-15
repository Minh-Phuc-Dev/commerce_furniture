import {AxiosResponse} from "axios";

export type ResponseBase<D = never, M = never> = {
    error: false
    success: true
    code: number
    httpStatus: number
    message: string,
    payload: D
    meta: M
    original: AxiosResponse<D, M>
} | {
    error: true
    success: false
    code?: never
    httpStatus?: never
    message?: never
    payload?: never
    meta?: never
    original?: never
    errorDetail?: unknown | never
}
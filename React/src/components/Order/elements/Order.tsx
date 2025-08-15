import { joiResolver } from "@hookform/resolvers/joi";
import { DropdownInput, Form, TextAreaInput, TextInput } from "common/ReactHookForm";
import { TRIGGER_TOAST_TYPE, triggerToast } from "common/Sonner";
import { HTTP_CODE } from "constants/HTTP";
import { AUTHENTICATE_STATUS, AuthenticateState } from "contexts/Authenticate";
import { loadOrder } from "contexts/Order/Mindleware";
import { AppDispatch, AppState } from "contexts/root";
import useCallAPIState, { CALL_API_STATUS } from "hooks/UseCallAPIState";
import Joi from "joi";
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import CartService from "services/CartService";
import OrderService from "services/OrderService";
import { type Cart } from "types/Cart";
import { Product } from "types/Product";


const Order = () => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { user, status } = useSelector<AppState>(state => state.authenticate) as AuthenticateState



    const [cart, setCart] = useCallAPIState<Cart<Product>[]>(
        {
            status: CALL_API_STATUS.IDLE,
            data: []
        }
    )
    const loadCart = useCallback(async () => {
        setCart(CALL_API_STATUS.LOADING)
        const { success, payload } = await CartService.get()
        if (!success) {
            setCart(CALL_API_STATUS.ERROR, payload)
            return
        }

        setCart(
            CALL_API_STATUS.SUCCESS,
            payload?.filter(
                item => (params.getAll("productId") ?? []).includes(item.productId.toString())
            )
        )
    }, [setCart, params])

    const total = useMemo(
        () => {
            return cart.data.reduce(
                (current, item) => {
                    return current + (item.quantity * item.product.price)
                },
                0
            )
        }, [cart.data]
    )

    useEffect(() => {
        loadCart()
    }, [loadCart])


    return status === AUTHENTICATE_STATUS.AUTHENTICATED ? (

        <Form
            options={{
                defaultValues: {
                    firstName: user?.displayName.split(" ")?.at(0),
                    lastName: user?.displayName.split(" ")?.at(-1),
                    streetAddress: user?.attributes?.address ?? "",
                    phoneNumber: user?.attributes?.phone ?? "",
                    emailAddress: user?.email ?? "",
                    paymentMethod: "VNPAY",
                },
                resolver: joiResolver(
                    Joi.object({
                        firstName: Joi.string().required().messages({
                            'string.empty': 'First Name is required'
                        }),
                        lastName: Joi.string().required().messages({
                            'string.empty': 'Last Name is required'
                        }),
                        streetAddress: Joi.string().required().messages({
                            'string.empty': 'Street Address is required'
                        }),
                        phoneNumber: Joi.string().required().messages({
                            'string.empty': 'Phone Number is required'
                        }),
                        emailAddress: Joi.string().email({ tlds: false }).required().messages({
                            'string.empty': 'Email Address is required',
                            'string.email': 'Please enter a valid email address'
                        }),
                        paymentMethod: Joi.string().required().messages({
                            'string.empty': 'Payment Method is required'
                        }),
                    })
                ),

            }}
            onSubmit={
                async ({ paymentMethod, ...values }) => {
                    const { error, code, payload } = await OrderService.addOrder<{ url: string }>(
                        {
                            paymentMethod,
                            attributes: values,
                            products: cart.data.map(item => item.productId)
                        }
                    )

                    if (error) {
                        triggerToast(
                            {
                                type: TRIGGER_TOAST_TYPE.ERROR,
                                header: "Error",
                                body: "Something went wrong"
                            }
                        )
                        return
                    }

                    dispatch(loadOrder())

                    if (code === HTTP_CODE.CONTINUE) {
                        window.location.href = payload?.url ?? window.location.href
                        return
                    }

                    triggerToast(
                        {
                            type: TRIGGER_TOAST_TYPE.SUCCESS,
                            header: "Success",
                            body: "Order created successfully"
                        }
                    )
                    navigate("/orders")

                }
            }
        >
            <div className="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">

                <div className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">


                    <h3 className="text-lg font-medium capitalize mb-4">
                        Thanh toán
                    </h3>

                    <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-600 mb-2 block">
                                    Họ <span className="text-primary">*</span>
                                </label>
                                <TextInput controller={{ name: "firstName" }} type="text" className="input-box" />
                            </div>
                            <div>
                                <label className="text-gray-600 mb-2 block">
                                    Tên <span className="text-primary">*</span>
                                </label>
                                <TextInput controller={{ name: "lastName" }} type="text" className="input-box" />
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Phương thức thanh toán
                            </label>
                            <DropdownInput
                                items={
                                    [
                                        {
                                            name: "Thanh toán trực tuyến (VNPAY)",
                                            value: "VNPAY"
                                        },
                                        {
                                            name: "Thanh toán khi nhận hàng (COD)",
                                            value: "COD"
                                        },
                                        {
                                            name: "Thanh toán qua chuyển khoản (Pay at delivery)",
                                            value: "PAY_AT_DELIVERY"
                                        }
                                    ]
                                }
                                control={{ name: "paymentMethod" }}
                            />
                        </div>

                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Số điện thoại <span className="text-primary">*</span>
                            </label>
                            <TextInput controller={{ name: "phoneNumber" }} type="text" className="input-box" />
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Địa chỉ email <span className="text-primary">*</span>
                            </label>
                            <TextInput controller={{ name: "emailAddress" }} type="text" className="input-box" />
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Địa chỉ <span className="text-primary">*</span>
                            </label>
                            <TextAreaInput controller={{ name: "streetAddress" }} type="text" className="input-box" />
                        </div>
                    </div>

                </div>

                <div className="lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
                    <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">Thông tin đơn hàng</h4>
                    <div className="space-y-2">
                        {
                            cart.data.map(
                                item => (
                                    <div key={item.id} className="flex justify-between gap-5">
                                        <div>
                                            <h5 className="text-gray-800 font-medium">{item.product.name}</h5>
                                            <p className="text-sm text-gray-600">{Number(item.product.price).toLocaleString('vi-VN')}₫</p>
                                        </div>
                                        <p className="text-gray-600">x{item.quantity}</p>
                                        <p className="text-gray-800 font-medium">{Number(item.quantity * item.product.price).toLocaleString('vi-VN')}₫</p>
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div className="flex justify-between border-gray-200">
                        <h4 className="text-gray-800 font-medium my-3 uppercase">Phí vận chuyển</h4>
                        <h4 className="text-gray-800 font-medium my-3 uppercase">Free</h4>
                    </div>
                    <hr />

                    <div className="flex justify-between">
                        <h4 className="text-gray-800 font-semibold my-3 uppercase">	Tổng cộng</h4>
                        <h4 className="text-gray-800 font-semibold my-3 uppercase">{Number(total).toLocaleString('vi-VN')}₫</h4>
                    </div>

                    <button
                        type="submit"
                        className="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent hover:text-primary transition text-sm w-full block text-center"
                    >
                        Đặt hàng
                    </button>

                </div>
            </div>
        </Form>

    ) : null

};

export default Order;
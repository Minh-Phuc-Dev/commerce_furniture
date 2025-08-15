import useCallAPIState, {CALL_API_STATUS} from "hooks/UseCallAPIState";
import {useCallback, useEffect} from 'react';
import {Link} from "react-router-dom";
import CartService from "services/CartService";
import {type Cart} from "types/Cart";
import {Product} from "types/Product";
import {getImageURL} from "utils/Image";

const Cart = () => {
    const [cart, setCart] = useCallAPIState<Cart<Product>[]>(
        {
            status: CALL_API_STATUS.IDLE,
            data: []
        }
    )
    const loadCart = useCallback(async () => {
        setCart(CALL_API_STATUS.LOADING)
        const {success, payload} = await CartService.get()
        if (!success) {
            setCart(CALL_API_STATUS.ERROR, payload)
            return
        }
        setCart(CALL_API_STATUS.SUCCESS, payload)
    }, [setCart])

    const addProduct = useCallback(async (productId: number) => {

        const {success} = await CartService.addProduct(
            {
                productId,
                quantity: 1
            }
        )
        if (!success) {
            return
        }
        await loadCart()
    }, [loadCart])

    const removeProduct = useCallback(async (productId: number, quantity: number = 1) => {

        const {success} = await CartService.removeProduct(
            {
                productId,
                quantity
            }
        )
        if (!success) {
            return
        }
        await loadCart()
    }, [loadCart])

    useEffect(() => {
        loadCart()
    }, [loadCart])


    const getURLSearchParams = useCallback(
        () => {
            const search = new URLSearchParams()
            for (const item of cart.data){
                search.append("productId", item.productId.toString())
            }
            return search.toString()
        },
        [cart.data]
    )

    const total = cart.data.reduce(
        (current, item) => {
            return current + (item.quantity * item.product.price)
        },
        0
    )

    return (
        <div className="flex gap-5 mb-5">
            <div className="grow space-y-5">
                <div className="bg-gray-200 py-2 p-4 hidden md:flex">
                    <p className="text-gray-600 text-center">Sản phẩm</p>
                    <p className="text-gray-600 text-center ml-auto mr-16 xl:mr-24">Số lượng</p>
                    <p className="text-gray-600 text-center">Tổng tiền</p>
                </div>
                <ul className="space-y-4">
                    {
                        cart.data.map(
                            (item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap"
                                >
                                    <div className="w-32 flex-shrink-0">
                                        <img
                                            src={getImageURL(item.product.attributes.image.at(-1))}
                                            className="w-full"
                                            alt={item.product.name}
                                        />
                                    </div>

                                    <div className="md:w-1/3 w-full">
                                        <h2 className="text-gray-800 mb-3 xl:text-xl textl-lg font-medium uppercase">
                                            {item.product.name}
                                        </h2>
                                        <p className="text-primary font-semibold">{Number(item.product.price).toLocaleString('vi-VN')}₫</p>
                                        <p className="text-gray-500">{new Date(item.updatedAt).toLocaleString()}</p>
                                    </div>

                                    <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300">
                                        <div
                                            className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                                            onClick={() => removeProduct(item.productId)}
                                        >
                                            -
                                        </div>
                                        <div className="h-8 w-10 flex items-center justify-center">{item.quantity}</div>
                                        <div
                                            onClick={() => addProduct(item.productId)}
                                            className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                                        >
                                            +
                                        </div>
                                    </div>
                                    <div className="ml-auto md:ml-0">
                                        <p className="text-primary text-lg font-semibold">{Number(item.product.price * item.quantity).toLocaleString('vi-VN')}₫</p>
                                    </div>
                                    <div
                                        className="text-gray-600 hover:text-primary cursor-pointer"
                                        onClick={() => removeProduct(item.productId, item.quantity)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="size-6">
                                            <path fillRule="evenodd"
                                                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                  clipRule="evenodd"
                                            />
                                        </svg>

                                    </div>
                                </li>
                            )
                        )
                    }

                </ul>

            </div>
            <div className="xl:col-span-3 lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
                <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">TÓM TẮT ĐƠN HÀNG</h4>
                <div className="space-y-1 text-gray-600 pb-3 border-b border-gray-200">
                    <div className="flex justify-between font-medium">
                        <p>Tạm tính</p>
                        <p>{Number(total).toLocaleString('vi-VN')}₫</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Phí vận chuyển</p>
                        <p>Free</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Thuế</p>
                        <p>Free</p>
                    </div>
                </div>
                <div className="flex justify-between my-3 text-gray-800 font-semibold uppercase">
                    <h4>Tổng cộng</h4>
                    <h4>{Number(total).toLocaleString('vi-VN')}₫</h4>
                </div>

                <Link
                    to={
                    {
                        pathname: "/orders/create",
                        search: getURLSearchParams()
                    }

                    }
                    className="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent hover:text-primary transition text-sm w-full block text-center"
                >
                    Tiến hành thanh toán
                </Link>

            </div>
        </div>
    )

};

export default Cart;
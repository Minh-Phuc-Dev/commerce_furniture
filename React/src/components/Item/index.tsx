import {TRIGGER_TOAST_TYPE, triggerToast} from "common/Sonner";
import {AUTHENTICATE_STATUS} from "contexts/Authenticate";
import {loadCart} from "contexts/Cart/Mindleware";
import {AppDispatch, AppState} from "contexts/root";
import {FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import CartService from "services/CartService";
import {Product} from "types/Product";
import {getImageURL} from "utils/Image";

type ItemProps = {
    item: Product;
}

const Item: FC<ItemProps> = ({item}) => {
    const credential = useSelector<AppState>(state => state.authenticate.status)
    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    const addToCart = useCallback(
        async () => {
            if (credential !== AUTHENTICATE_STATUS.AUTHENTICATED) {
                navigate("/login")

                triggerToast(
                    {
                        type: TRIGGER_TOAST_TYPE.INFO,
                        header: "Cảnh báo",
                        body: "Bạn cần đăng nhập để mua hàng!"
                    }
                )
                return
            }

            const {success} = await CartService.addProduct(
                {
                    productId: item.id,
                    quantity: 1
                }
            )

            triggerToast(
                {
                    type: success ? TRIGGER_TOAST_TYPE.SUCCESS : TRIGGER_TOAST_TYPE.ERROR,
                    header: success ? "Thành công" : "Thất bại",
                    body: success ? "Đã thêm sản phẩm vào giỏ hàng" : "Thêm vào giỏ hàng thất bại"
                }
            )

            dispatch(loadCart())
        },
        [credential, item.id, dispatch, navigate]
    )
    return (
        <div className="group rounded bg-white shadow overflow-hidden hover:scale-105 transition-all duration-500">

            <div className="relative">
                <img
                    src={getImageURL(item.attributes?.image?.at(-1))}
                    className="w-full"
                    alt="product"
                />
                <div
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                >
                    <button
                        type="button"
                        className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                        </svg>

                    </button>
                    <button
                        type="button"
                        className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                        </svg>


                    </button>
                </div>
            </div>

            <div className="pt-4 pb-3 px-4">
                <Link to={`/product?slug=${item.id}`}>
                    <h4 className="uppercase font-medium text-xl truncate mb-2 text-gray-800 hover:text-primary transition">
                        {item.name}
                    </h4>
                </Link>
                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-roboto font-semibold">{Number(item.price).toLocaleString('vi-VN')}₫</p>
                    <p className="text-sm text-gray-400 font-roboto line-through">{Number(item.oldPrice).toLocaleString('vi-VN')}₫</p>
                </div>
                <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="size-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="size-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="size-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="size-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="size-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                            />
                        </svg>


                    </div>
                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
            </div>

            <button
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                onClick={addToCart}
            >
                Thêm vào giỏ hàng
            </button>

        </div>
    )
}

export default Item;
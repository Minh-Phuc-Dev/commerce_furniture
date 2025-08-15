import Button from "common/Button";
import Breadcrumb from "components/Breadcrumb";
import Gallery from "components/Gallery";
import Recommend from "components/Home/Recommend";
import { loadCart } from "contexts/Cart/Mindleware";
import { AppDispatch } from "contexts/root";
import useCallAPIState, { CALL_API_STATUS } from "hooks/UseCallAPIState";
import { isEmpty } from "lodash";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import CartService from "services/CartService";
import ProductService from "services/ProductService";
import { twMerge } from "tailwind-merge";
import { Category } from "types/Category";
import { Product } from "types/Product";

type ProductDetail = Product & {
    category: Category
}


const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);

    const [searchParams] = useSearchParams();
    const slug = searchParams.get("slug")
    const navigate = useNavigate()


    const [product, setProduct] = useCallAPIState<ProductDetail | undefined>(
        {
            status: CALL_API_STATUS.IDLE,
            data: undefined
        }
    )

    const fetchData = useCallback(
        async (slug: string) => {
            setProduct(CALL_API_STATUS.LOADING)
            const { payload, success } = await ProductService.getBySlug<ProductDetail>(slug)
            if (success) {
                setProduct(CALL_API_STATUS.SUCCESS, payload)
            }
        }, [setProduct]
    )

    useEffect(
        () => {
            fetchData(slug || "")
        },
        [fetchData, slug]
    )

    const dispatch = useDispatch<AppDispatch>()

    const addToCart = useCallback(
        async () => {
            await CartService.addProduct(
                {
                    productId: product.data?.id || 0,
                    quantity
                }
            )
            dispatch(loadCart())
        },
        [product.data?.id, dispatch, quantity]
    )

    const handleIncreaseQuantity = useCallback(
        (event: MouseEvent<HTMLElement>) => {
            const maxQuantity = parseInt(event.currentTarget.dataset.max || "1", 10)
            const quantity = parseInt(event.currentTarget.dataset.quantity || "1", 10)
            if (quantity < maxQuantity) {
                setQuantity(quantity + 1)
            }
        },
        []
    )

    const handleDecreaseQuantity = useCallback(
        (event: MouseEvent<HTMLElement>) => {
            const quantity = parseInt(event.currentTarget.dataset.quantity || "1", 10)
            if (quantity > 1) {
                setQuantity(quantity - 1)
            }
        },
        []
    )
    return (
        <div
            className="max-w-1200 mx-auto"
        >
            <Breadcrumb
                items={
                    [
                        {
                            label: "Product",
                            to: "/product"
                        }
                    ]
                }
            />
            {
                isEmpty(product.data) ? (
                    <div className="p-5 flex flex-col justify-center space-y-5">
                        <h1 className='text-center opacity-80'>No product found!</h1>
                        <Button onClick={() => navigate("/")} className="block w-fit mx-auto" intent="primary"
                            variantType="intent">Back to Home</Button>
                    </div>
                ) : (
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                            <Gallery
                                images={product.data?.attributes?.image ?? []}
                                key={product.data.id}
                            />
                            <div>
                                <h2 className="md:text-3xl text-2xl font-medium uppercase mb-2">
                                    {product.data?.name}
                                </h2>
                                <div className="flex items-center mb-4">
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
                                    <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-800 font-semibold space-x-2">
                                        <span>Availability: </span>
                                        <span
                                            className="text-green-600 capitalize">{product.data?.status.toLowerCase().split("_").join(" ")}</span>
                                    </p>
                                    <p className="space-x-2">
                                        <span className="text-gray-800 font-semibold">Brand: </span>
                                        <span className="text-gray-600">Apex</span>
                                    </p>
                                    <p className="space-x-2">
                                        <span className="text-gray-800 font-semibold">Category: </span>
                                        <span className="text-gray-600">{product.data?.category.name}</span>
                                    </p>
                                    <p className="space-x-2">
                                        <span className="text-gray-800 font-semibold">SKU: </span>
                                        <span className="text-gray-600">{product.data?.sku}</span>
                                    </p>
                                </div>
                                <div className="mt-4 flex items-baseline gap-3">
                                    <span className="text-primary font-semibold text-xl">{Number(product.data?.price).toLocaleString('vi-VN')}₫</span>
                                    <span
                                        className="text-gray-500 text-base line-through">{Number(product.data?.oldPrice).toLocaleString('vi-VN')}₫</span>
                                </div>
                                <p className="mt-4 text-gray-600 truncate">
                                    {product.data?.description}
                                </p>
                                <div className="hidden mt-4">
                                    <h3 className="text-base text-gray-800 mb-1">Size</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="size-selector">
                                            <input type="radio" name="size" className="hidden" id="size-xs" />
                                            <label
                                                htmlFor="size-xs"
                                                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                                            >
                                                XS
                                            </label>
                                        </div>
                                        <div className="size-selector">
                                            <input type="radio" name="size" className="hidden" id="size-s" />
                                            <label
                                                htmlFor="size-s"
                                                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                                            >
                                                S
                                            </label>
                                        </div>
                                        <div className="size-selector">
                                            <input
                                                type="radio"
                                                name="size"
                                                className="hidden"
                                                id="size-m"
                                                defaultChecked={false}
                                            />
                                            <label
                                                htmlFor="size-m"
                                                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                                            >
                                                M
                                            </label>
                                        </div>
                                        <div className="size-selector">
                                            <input type="radio" name="size" className="hidden" id="size-l" />
                                            <label
                                                htmlFor="size-l"
                                                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                                            >
                                                L
                                            </label>
                                        </div>
                                        <div className="size-selector">
                                            <input type="radio" name="size" className="hidden" id="size-xl" />
                                            <label
                                                htmlFor="size-xl"
                                                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                                            >
                                                XL
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden mt-4">
                                    <h3 className="text-base text-gray-800 mb-1">Color</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="color-selector">
                                            <input
                                                type="radio"
                                                name="color"
                                                className="hidden"
                                                id="color-red"
                                                defaultChecked={false}
                                            />
                                            <label
                                                htmlFor="color-red"
                                                style={{ backgroundColor: "#fc3d57" }}
                                                className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"
                                            ></label>
                                        </div>
                                        <div className="color-selector">
                                            <input type="radio" name="color" className="hidden" id="color-white" />
                                            <label
                                                htmlFor="color-white"
                                                style={{ backgroundColor: "#fff" }}
                                                className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"
                                            ></label>
                                        </div>
                                        <div className="color-selector">
                                            <input type="radio" name="color" className="hidden" id="color-black" />
                                            <label
                                                htmlFor="color-black"
                                                style={{ backgroundColor: "#000" }}
                                                className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"
                                            ></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-base text-gray-800 mb-1">Số lượng</h3>
                                    <div
                                        className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                                        <div
                                            onClick={handleDecreaseQuantity}
                                            data-quantity={quantity}
                                            data-max={product.data?.quantity}
                                            className={
                                                twMerge(
                                                    "h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none",
                                                    quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                                                )
                                            }
                                        >
                                            -
                                        </div>
                                        <div className="h-8 w-10 flex items-center justify-center">{quantity}</div>
                                        <div
                                            onClick={handleIncreaseQuantity}
                                            data-quantity={quantity}
                                            data-max={product.data?.quantity}
                                            className={
                                                twMerge(
                                                    "h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none",
                                                    quantity >= (product.data?.quantity || 1) ? "opacity-50 cursor-not-allowed" : ""
                                                )
                                            }
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 border-b border-gray-200 pb-5 mt-6">
                                    <button
                                        className="block w-fit px-5 py-1 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition"
                                        onClick={addToCart}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">

                            <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
                                Chi tiết sản phẩm
                            </h3>

                            <div>
                                <div className="space-y-3 text-gray-600">
                                    <p className="whitespace-pre-line">
                                        {product.data?.description}
                                    </p>

                                </div>

                                <table
                                    className="hidden table-auto border-collapse max-w-screen-sm text-left text-gray-600 text-sm mt-6"
                                >
                                    <tbody>
                                        <tr>
                                            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                                                Color
                                            </th>
                                            <td className="py-2 px-4 border border-gray-300">
                                                Black, Brown, Red
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                                                Material
                                            </th>
                                            <td className="py-2 px-4 border border-gray-300">
                                                Artificial Leather
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                                                Weight
                                            </th>
                                            <td className="py-2 px-4 border border-gray-300">55kg</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                        </div>

                        <Recommend productId={product.data?.id} categoryId={product.data?.categoryId} />
                    </div>
                )
            }
        </div>
    );
};

export default ProductPage;
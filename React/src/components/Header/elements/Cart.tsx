import * as Popover from '@radix-ui/react-popover';
import EmptyCart from "components/Header/elements/EmptyCart";
import { AppState } from "contexts/root";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { type Cart } from "types/Cart";
import { Product } from "types/Product";
import { getImageURL } from "utils/Image";

const Cart = () => {
    const cart = useSelector<AppState>(state => state.cart.cart) as Cart<Product>[]


    return (
        <div>
            <Popover.Root>
                <Popover.Trigger
                    className="relative hover:text-primary"
                >
                    {
                        isEmpty(cart) ? null : (
                            <span
                                className="absolute text-px-12 bg-red-500 text-white min-w-4 min-h-4 inline-flex items-center justify-center rounded-full bottom-full right-0 translate-y-1/2 translate-x-1/2">
                                {cart.length}
                            </span>
                        )
                    }

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className="size-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                    </svg>
                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Content className="w-80 bg-white rounded border shadow">
                        <Popover.Arrow className="fill-slate-500" />
                        <h2 className="px-5 py-2 text-gray-500 text-sm">Giỏ Hàng</h2>
                        <hr />
                        {
                            isEmpty(cart) ? <EmptyCart /> : (
                                <>
                                    <ul className="p-5 space-y-2">
                                        {
                                            cart.map(
                                                (item) => (
                                                    <li className="flex justify-between gap-x-1" key={item.id}>

                                                        <img
                                                            className="block w-12 h-12 flex-none object-cover "
                                                            src={
                                                                getImageURL(item.product.attributes.image.at(-1))
                                                            }
                                                            alt={item.product.name}
                                                        />
                                                        <div className="grow flex flex-col h-full space-y-2">
                                                            <p>{item.product.name}</p>
                                                            <p className="flex justify-between space-x-0.5">
                                                                <span
                                                                    className="text-xs font-medium text-primary">{Number(item.product.price).toLocaleString('vi-VN')}₫</span>
                                                                <span className="text-xs font-medium text-gray-500">Số lượng: ({item.quantity})</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                )
                                            )
                                        }

                                    </ul>
                                    <hr />
                                    <Link
                                        to="/cart"
                                        className="py-1 block w-full text-center textsm opacity-80 text-primary hover:opacity-100"
                                    >
                                        Xem giỏ hàng
                                    </Link>
                                </>
                            )
                        }
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </div>
    );
};

export default Cart;
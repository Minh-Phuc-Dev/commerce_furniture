import * as Popover from '@radix-ui/react-popover';
import Badge from "common/Badge";
import EmptyCart from "components/Header/elements/EmptyCart";
import { AppState } from "contexts/root";
import { isEmpty } from "lodash";
import { nanoid } from "nanoid/non-secure";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { type Order } from "types/Order";

import { Product } from "types/Product";


const Order = () => {
    const order = useSelector<AppState>(state => state.order.order) as Order<Product>[]

    return (
        <div>
            <Popover.Root>
                <Popover.Trigger
                    className="relative hover:text-primary"
                >
                    {
                        isEmpty(order) ? null : (
                            <span
                                className="absolute text-px-12 bg-indigo-500 text-white min-w-4 min-h-4 inline-flex items-center justify-center rounded-full bottom-full right-0 translate-y-1/2 translate-x-1/2">
                                {order.length}
                            </span>
                        )
                    }

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor" className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                        />
                    </svg>

                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Content className="w-80 bg-white rounded border shadow">
                        <Popover.Arrow className="fill-slate-500" />
                        <h2 className="px-5 py-2 text-gray-500 text-sm">Đơn hàng</h2>
                        <hr />
                        {
                            isEmpty(order) ? <EmptyCart /> : (
                                <>
                                    <ul className="p-5 space-y-5 max-h-80 overflow-scroll">
                                        {
                                            order.map(
                                                (item) => (
                                                    <li key={item.id}>
                                                        <div className="flex flex-col h-full space-y-2">
                                                            <div className="text-sm text-gray-500">
                                                                {
                                                                    item.items.map(
                                                                        item => (
                                                                            <p key={nanoid()}>{`${item.product.name} x ${item.quantity}`}</p>
                                                                        )
                                                                    )
                                                                }
                                                            </div>

                                                            <div className="flex justify-between">
                                                                {
                                                                    item.status === "COMPLETED" ? (
                                                                        <Badge className="text-px-10 text-white capitalize"
                                                                            type="intent" intent="primary">
                                                                            Đã hoàn thành
                                                                        </Badge>
                                                                    ) : item.status === "CANCELED"  ? (
                                                                        <Badge className="text-px-10 text-white capitalize"
                                                                            type="intent" intent="error">
                                                                            Đã hủy
                                                                        </Badge>
                                                                    ): (
                                                                        <Badge className="text-px-10 text-white capitalize"
                                                                            type="intent" intent="secondary">
                                                                            Đang chờ
                                                                        </Badge>
                                                                    )
                                                                }

                                                                <span
                                                                    className="text-primary font-medium">{Number(item.totalAmount).toLocaleString('vi-VN')}₫</span>
                                                            </div>

                                                        </div>
                                                    </li>
                                                )
                                            )
                                        }

                                    </ul>
                                    <hr />
                                    <Link
                                        to="/orders"
                                        className="py-1 block w-full text-center textsm opacity-80 text-primary hover:opacity-100"
                                    >
                                        Xem tất cả đơn hàng
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

export default Order;
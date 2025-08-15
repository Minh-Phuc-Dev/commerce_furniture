import EmptyCart from "components/Header/elements/EmptyCart"
import { AppState } from "contexts/root"
import { isEmpty } from "lodash"
import { useSelector } from "react-redux"
import { Order } from "types/Order"
import { Product } from "types/Product"
import { getImageURL } from "utils/Image"
import generateKey from "utils/Key"

const MyOrders = () => {
    const orders = useSelector<AppState>(state => state.order.order) as Order<Product>[]

    return (
        <div className="bg-gray-100 rounded border">
            {
                isEmpty(orders) ? <EmptyCart /> : (
                    <ul className="space-y-5">
                        <li className="flex px-5 py-2 space-x-1 border-b">
                            <p className="grow">Đơn hàng</p>
                            <p className="flex-none w-24">Trạng thái</p>
                            <p className="flex-none w-24">Hình thức</p>
                            <p className="flex-none w-36">Số tiền</p>

                        </li>
                        {
                            orders.map(
                                (item) => (
                                    <li
                                        key={item.id}
                                        className="px-5 py-2 space-x-1 border-b last:border-b- flex"
                                    >
                                        <div className="grow overflow-x-hidden">
                                            {
                                                item.items.map(
                                                    item => (
                                                        <div className="flex gap-x-2">

                                                            <img
                                                                className="flex-none block w-20 h-20 rounded overflow-auto"

                                                                src={getImageURL(item.product.attributes.image.at(0))}
                                                            />
                                                            <p key={generateKey()}>{`${item.product.name} x ${item.quantity}`}</p>
                                                        </div>
                                                    )
                                                )
                                            }

                                        </div>
                                        <p className="flex-none w-24">{item.status}</p>
                                        <p className="flex-none w-24">{item.meta.paymentMethod}</p>
                                        <p className="flex-none w-36 text-primary">{Number(item.totalAmount).toLocaleString('vi-VN')}</p>
                                    </li>
                                )
                            )
                        }

                    </ul>
                )
            }
        </div>
    )
}

export default MyOrders
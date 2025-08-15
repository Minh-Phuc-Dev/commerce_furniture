import Badge from "common/Badge";
import useCallAPIState, {CALL_API_STATUS} from "hooks/UseCallAPIState";
import  {useCallback, useEffect} from 'react';
import orderService from "services/OrderService";
import OrderService from "services/OrderService";
import {type Order} from "types/Order";
import {Product} from "types/Product";


const OrderHistory = () => {
    //TODO: Dispatch order
    const [order, setOrder] = useCallAPIState<Order<Product>[]>(
        {
            status: CALL_API_STATUS.IDLE,
            data: []
        }
    )
    const loadOrder = useCallback(async () => {
        setOrder(CALL_API_STATUS.LOADING)
        const {success, payload} = await OrderService.get<Order<Product>[]>()
        if (!success) {
            setOrder(CALL_API_STATUS.ERROR, payload)
            return
        }
        setOrder(CALL_API_STATUS.SUCCESS, payload)
    }, [setOrder])


    useEffect(() => {
        loadOrder()
    }, [loadOrder])

    return (
        <div className="flex gap-5">
            <div className="grow space-y-5 pb-10">
                <div className="bg-gray-200 py-2 p-4 hidden md:flex">
                    <p className="text-gray-600 w-20">ID</p>
                    <p className="text-gray-600 w-40">Trạng thái</p>
                    <p className="text-gray-600 w-40">Tổng tiền</p>
                    <p className="text-gray-600 grow">Địa chỉ</p>
                    <p className="text-gray-600 w-40">Cập nhật lúc</p>
                    <p className="text-gray-600 w-20">Hành động</p>
                </div>
                <ul className="space-y-2">
                    {
                        order.data.map(
                            (item) => (
                                <li
                                    key={item.id}
                                    className="border py-2 p-4 hidden md:flex"
                                >

                                    <p className="text-gray-600 w-10">{item.id}</p>
                                    <p className="text-gray-600 w-40">
                                        {
                                            item.status === "PENDING" ? (
                                                <Badge type="outline" intent="primary">Đang Chờ</Badge>
                                            ) : item.status === "CANCELED" ? (
                                                <Badge type="outline" intent="error">Đã Hủy</Badge>
                                                ) : item.status === "COMPLETED" ? (
                                                <Badge type="outline" intent="success">Đã Hoàn Thành</Badge>
                                            ) : null
                                        }
                                    </p>
                                    <p className="text-gray-600 w-40 font-medium">{Number(item.totalAmount).toLocaleString('vi-VN')}₫</p>
                                    <p className="text-gray-600 grow">{item.attributes.streetAddress}</p>
                                    <p className="text-gray-600 w-40">{new Date(item.createdAt).toLocaleTimeString()}</p>
                                    <div className="text-gray-600 w-20">
                                        {
                                            item.status === "PENDING" ? (
                                                <Badge
                                                    type="intent"
                                                    intent="error"
                                                    onClick={
                                                        async () => {
                                                            await orderService.updateStatus(
                                                                {
                                                                    id: item.id,
                                                                    status: "CANCELED"
                                                                }
                                                            )
                                                            await loadOrder()

                                                        }
                                                    }
                                                >
                                                    Hủy
                                                </Badge>
                                            ) : null
                                        }

                                    </div>
                                </li>
                            )
                        )
                    }

                </ul>

            </div>
        </div>
    )

};

export default OrderHistory;
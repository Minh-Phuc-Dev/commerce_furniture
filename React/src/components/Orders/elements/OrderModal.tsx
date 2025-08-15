import Button from "common/Button";
import Modal from "common/Modal";
import {TRIGGER_TOAST_TYPE, triggerToast} from "common/Sonner";
import {RowModel} from "common/TanStackTable";
import {FC, MouseEvent} from "react";
import OrderService from "services/OrderService";
import {Order} from "types/Order";
import {Product} from "types/Product";


const OrderModal: FC<RowModel<Order<Product>>> = ({row, table, index}) => {

    const updateStatus = async (event: MouseEvent<HTMLButtonElement>) => {
        const status = event.currentTarget.dataset.status

        const {success} = await OrderService.updateStatus(
            {
                id: row.id,
                status: status!
            }
        )

        if (success){
            table.options.meta?.updateData(
                index,
                {
                    ...row,
                    status: status!
                }
            )
            triggerToast(
                {
                    type: TRIGGER_TOAST_TYPE.SUCCESS,
                    header: "Success",
                    body: "Order update successfully"
                }
            )
            return
        }

        triggerToast(
            {
                type: TRIGGER_TOAST_TYPE.ERROR,
                header: "Failed",
                body: "Something went wrong"
            }
        )
    }


    return (
        <>
            <Modal.Overlay/>
            <Modal.Content className="overflow-hidden">
                <div className="flex flex-col w-full h-full max-w-screen-lg rounded bg-white">
                    <div className="px-5 py-2 border-b flex space-x-5 justify-between">
                        <h2 className="font-medium">Order {row.id}</h2>
                        <Modal.Trigger
                            mode="close"
                            className="text-gray-400 hover:text-red-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>
                        </Modal.Trigger>
                    </div>
                    <div className="grow">
                        <div className="p-5 grid grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Order Id</p>
                                <p className="py-2 px-4 border text-gray-500 rounded">
                                    {row.id}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Amount</p>
                                <p className="py-2 px-4 border text-gray-500 rounded">
                                    {Number(row.totalAmount).toLocaleString("vi-VN")}₫
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Status</p>
                                <p className="py-2 px-4 border text-gray-500 rounded">
                                    {row.status}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Amount</p>
                                <p className="py-2 px-4 border text-gray-500 rounded">
                                    {new Date(row.createdAt).toLocaleString("vi-VN")}
                                </p>
                            </div>
                            <div className="space-y-1 col-span-2">
                                <p className="text-sm font-medium text-gray-500">Products</p>
                                <div className="py-2 px-4 border text-gray-500 rounded">
                                    {
                                        row.items.map(
                                            (item) => (
                                                <div key={item.id}>
                                                    <p>
                                                        {item.quantity} x {item.product.name}
                                                    </p>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="px-5 py-2 border-t flex space-x-5 justify-end">
                        {
                            row.status === "PENDING" ? (
                                <Button
                                    intent="primary"
                                    variantType="intent"
                                    type="submit"
                                    data-status="PROCESSING"
                                    onClick={updateStatus}
                                >
                                    Đang xử lý đơn hàng
                                </Button>
                            ) : null
                        }

                        {
                            row.status === "PROCESSING" ? (
                                <Button
                                    intent="secondary"
                                    variantType="intent"
                                    type="submit"
                                    data-status="COMPLETED"
                                    onClick={updateStatus}
                                >
                                    Hoàn tất đơn hàng
                                </Button>
                            ) : null
                        }

                        {
                            ["PROCESSING", "PENDING"].includes(row.status)  ? (
                                <Button
                                    intent="error"
                                    variantType="intent"
                                    data-status="CANCELED"
                                    onClick={updateStatus}
                                >
                                    Hủy đơn hàng
                                </Button>
                            ) : null
                        }

                        <Modal.Trigger
                            mode="close"
                        >
                            <Button
                                intent="error"
                                variantType="outline"
                                type="submit"
                            >
                                Đóng
                            </Button>
                        </Modal.Trigger>
                    </div>
                </div>

            </Modal.Content>
        </>
    );
};

export default OrderModal;
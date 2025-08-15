import Breadcrumb from "components/Breadcrumb";
import OrderHistory from "components/Order/elements/OrderHistory";

const OrderPage = () => {
    return (
        <div
            className="max-w-1200 mx-auto"
        >
            <Breadcrumb
                items={
                    [
                        {
                            label: "Đơn Hàng",
                            to: "/orders"
                        }
                    ]
                }
            />
            <OrderHistory/>
        </div>
    );
};

export default OrderPage;
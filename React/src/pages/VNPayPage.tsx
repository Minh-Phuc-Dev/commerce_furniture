import Breadcrumb from "components/Breadcrumb";
import VNPay from "components/VNPay";

const VNPayPage = () => {


    return (
        <div
            className="max-w-1200 mx-auto"
        >
            <Breadcrumb
                items={
                    [
                        {
                            label: "Orders",
                            to: "/orders"
                        },
                        {
                            label: "VN Pay",
                            to: "/orders/vn-pay"
                        }
                    ]
                }
            />

            <VNPay/>
        </div>
    );
};

export default VNPayPage;
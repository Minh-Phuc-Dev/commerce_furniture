import Breadcrumb from "components/Breadcrumb";
import Order from "components/Order/elements/Order";

const CreateOrderPage = () => {
    return (
        <div
            className="max-w-1200 mx-auto"
        >
            <Breadcrumb
                items={
                    [
                        {
                            label: "Order",
                            to: "/order"
                        }
                    ]
                }
            />
            <Order/>
        </div>
    );
};

export default CreateOrderPage;
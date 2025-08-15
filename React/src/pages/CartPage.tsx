import Breadcrumb from "components/Breadcrumb";
import Cart from "components/Cart/elements/Cart";

const HomePage = () => {


    return (
        <div
            className="max-w-1200 mx-auto"
        >
            <Breadcrumb
                items={
                    [
                        {
                            label: "Cart",
                            to: "/cart"
                        }
                    ]
                }
            />
            <Cart/>
        </div>
    );
};

export default HomePage;
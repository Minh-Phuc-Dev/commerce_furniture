import Breadcrumb from "components/Breadcrumb";
import Products from "components/Products";
import ProductFilter from "components/Products/elements/ProductFilter";

const SearchPage = () => {
    return (
        <div
            className="max-w-1200 mx-auto"
        >
            <Breadcrumb
                items={
                    [
                        {
                            label: "Cửa Hàng",
                            to: "/search"
                        }
                    ]
                }
            />
            <div className="flex gap-x-5 pb-10 relative">
                <div className="flex-none hidden md:block">
                    <ProductFilter className="rounded" />
                </div>
                <Products className="grow" />
            </div>
        </div>
    );
};

export default SearchPage;
import OrderBar from "components/Dashboard/elements/OrderBar";
import OrderStatistics from "components/Dashboard/elements/OrderStatistics";
import TopProducts from "components/Dashboard/elements/TopProducts";


const Dashboard = () => {
    return (
        <div className="space-y-5">
            <div className="grow">
                <TopProducts/>
            </div>

            <div className="flex gap-5">
                <div className="grow">
                    <OrderBar/>
                </div>
                <OrderStatistics/>
            </div>

        </div>
    );
};

export default Dashboard;
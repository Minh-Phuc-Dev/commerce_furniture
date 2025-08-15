import Advertisement from "components/Home/Advertisement";
import Banner from "components/Home/Banner";
import Categories from "components/Home/Categories";
import Features from "components/Home/Features";
import Recommend from "components/Home/Recommend";
import TopNew from "components/Home/TopNew";

const HomePage = () => {
    return (
        <>
            <Banner/>
            <Features/>
            <Categories/>
            <TopNew/>
            <Advertisement/>
            <Recommend/>
        </>
    );
};

export default HomePage;
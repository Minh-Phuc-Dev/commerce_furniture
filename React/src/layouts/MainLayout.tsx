import ChatBot from "components/ChatBot";
import Copyright from "components/Copyright";
import Footer from "components/Footer";
import Header from "components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="grow flex-1 xl:px-0 px-5">
                <Outlet />
            </div>
            <Footer />
            <Copyright />
            <ChatBot />
        </>
    );
};

export default MainLayout;

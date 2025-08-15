import Navigation from "components/Navigation";
import Sidebar from "components/Sidebar";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex h-screen overflow-x-hidden overflow-y-scroll">
            <Sidebar/>
            <div className="flex flex-col h-full grow overflow-y-hidden">
                <Navigation/>
                <div className="p-2 grow overflow-y-scroll">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;

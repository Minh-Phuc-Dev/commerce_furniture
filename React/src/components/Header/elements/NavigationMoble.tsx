import { TRIGGER_TOAST_TYPE, triggerToast } from "common/Sonner";
import { AUTHENTICATE_STATUS, AuthenticateState, clearCredential } from "contexts/Authenticate";
import { loadCart } from "contexts/Cart/Mindleware";
import { loadOrder } from "contexts/Order/Mindleware";
import { AppDispatch, AppState } from "contexts/root";
import useBoolean from "hooks/useBoolean";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import AuthenticateService from "services/AuthenticateService";
import { twMerge } from "tailwind-merge";

const NavigationMoble = () => {
    const [flag, setFlag] = useBoolean(false);
    const { status } = useSelector((state: AppState) => state.authenticate) as AuthenticateState
    const dispatch = useDispatch<AppDispatch>()
    const { pathname } = useLocation()


    const handleLogout = async () => {
        const { success } = await AuthenticateService.logout()

        if (success) {
            triggerToast(
                {
                    type: TRIGGER_TOAST_TYPE.SUCCESS,
                    header: "Success",
                    body: "Logout successfully"
                }
            )
            dispatch(clearCredential())
            dispatch(loadOrder())
            dispatch(loadCart())
            return
        }

        triggerToast(
            {
                type: TRIGGER_TOAST_TYPE.ERROR,
                header: "Error",
                body: "Logout failed"
            }
        )

    }


    return (
        <nav className="lg:hidden bg-secondary sticky top-0 z-10 xl:pr-0">
            <div
                className="max-w-1200 mx-auto flex items-center justify-between"
            >
                <button
                    className="px-8 py-3 flex space-x-1 text-white font-medium bg-primary"
                    onClick={setFlag.toggle}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>

                {
                    (status === AUTHENTICATE_STATUS.AUTHENTICATED) ? (
                        <button
                            className="px-5 text-white hover:opacity-100 cursor-pointer transition-all duration-300"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </button>
                    ) : (
                        <div className="px-5">
                            <Link
                                to="/login"
                                className="text-white hover:opacity-100 cursor-pointer transition-all duration-300"
                            >
                                Đăng Nhập
                            </Link>
                            <span className="px-0.5 text-white">/</span>
                            <Link
                                to="/register"
                                className="text-white hover:opacity-100 cursor-pointer transition-all duration-300"
                            >
                                Đăng Ký
                            </Link>
                        </div>
                    )
                }
            </div>

            {
                flag ? (
                    <div className="fixed top-0 left-0 w-screen h-screen bg-secondary/80">
                        <div className="flex flex-col bg-white h-full w-80">
                            <div className="flex-none flex justify-between items-center p-2">

                                <Link to="/">
                                    <img
                                        className="h-12 bg-white"
                                        src="/images/logo.png"
                                        alt="logo"
                                    />
                                </Link>

                                <button
                                    className="size-6 rounded-full p-0.5 hover:bg-primary hover:text-white transition-all duration-300"
                                    onClick={setFlag.toggle}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>



                            </div>

                            <div className="flex-grow py-2 bg-secondary">
                                <ul className="list-none">
                                    <li
                                        className={
                                            twMerge(
                                                "text-white hover:opacity-100 cursor-pointer transition-all duration-300 bg-transparent",
                                                pathname === "/" ? "bg-primary" : "opacity-80"
                                            )
                                        }

                                    >
                                        <Link
                                            className="block p-2"
                                            onClick={setFlag.toggle}
                                            to="/"
                                        >
                                            Trang Chủ
                                        </Link>
                                    </li>
                                    <li
                                        className={
                                            twMerge(
                                                "text-white hover:opacity-100 cursor-pointer transition-all duration-300 bg-transparent",
                                                pathname === "/products" ? "bg-primary" : "opacity-80"
                                            )
                                        }

                                    >
                                        <Link
                                            to="/products"
                                            className="block p-2"
                                            onClick={setFlag.toggle}
                                        >
                                            Cửa Hàng
                                        </Link>
                                    </li>
                                    <li
                                        className={
                                            twMerge(
                                                "text-white hover:opacity-100 cursor-pointer transition-all duration-300 bg-transparent",
                                                pathname === "/about-us" ? "bg-primary" : "opacity-80"
                                            )
                                        }

                                    >

                                        <Link
                                            to="/about-us"
                                            className="block p-2"
                                            onClick={setFlag.toggle}
                                        >
                                            Chúng Tôi
                                        </Link>
                                    </li>
                                    <li
                                        className={
                                            twMerge(
                                                "text-white hover:opacity-100 cursor-pointer transition-all duration-300 bg-transparent",
                                                pathname === "/contact" ? "bg-primary" : "opacity-80"
                                            )
                                        }

                                    >
                                        <Link
                                            to="/contact"
                                            className="block p-2"
                                            onClick={setFlag.toggle}
                                        >
                                            Liên Hệ
                                        </Link>
                                    </li>
                                </ul>
                            </div>



                        </div>

                    </div>
                ) : null
            }



        </nav>
    );
};

export default NavigationMoble;
import { TRIGGER_TOAST_TYPE, triggerToast } from "common/Sonner";
import { AUTHENTICATE_STATUS, AuthenticateState, clearCredential } from "contexts/Authenticate";
import { loadCart } from "contexts/Cart/Mindleware";
import { loadOrder } from "contexts/Order/Mindleware";
import { AppDispatch, AppState } from "contexts/root";
import useCallAPIState, { CALL_API_STATUS } from "hooks/UseCallAPIState";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import AuthenticateService from "services/AuthenticateService";
import CategoryService from "services/CategoryService";
import { twMerge } from "tailwind-merge";
import { Category } from "types/Category";


const Categories = () => {
    const [categories, setCategories] = useCallAPIState<Category[]>(
        {
            status: CALL_API_STATUS.IDLE,
            data: []
        }
    )

    const fetchData = useCallback(
        async () => {
            setCategories(CALL_API_STATUS.LOADING)
            const { payload, success } = await CategoryService.get()
            if (success) {
                setCategories(CALL_API_STATUS.SUCCESS, payload)
            }
        }, [setCategories]
    )

    useEffect(
        () => {
            fetchData()
        },
        [fetchData]
    )
    return (
        <div className="group self-stretch relative">

            <button
                className="peer h-full px-8 py-3 flex space-x-1  text-white font-medium bg-primary"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                    stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <span>
                    Danh Mục
                </span>
            </button>

            <div className="hidden top-full bg-white border rounded-b shadow w-full group-hover:block absolute">
                {
                    categories.success ? (
                        <ul className="py-2 space-y-2">
                            {
                                categories.data.map(
                                    (category) => (
                                        <li key={category.id}>
                                            <Link
                                                to={`/products?category=${category.id}`}
                                                className="block capitalize px-3 py-1 hover:opacity-100 text-gray-600 hover:text-white hover:bg-primary cursor-pointer transition-all duration-300"
                                            >
                                                {category.name.toLowerCase()}
                                            </Link>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    ) : null
                }
            </div>
        </div>
    );
};


const Navigation = () => {
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
        <nav className="hidden lg:block bg-secondary sticky top-0 z-10 xl:pr-0 pr-5">
            <div
                className="max-w-1200 mx-auto flex items-center"
            >



                <div
                    className="grow flex justify-between"
                >
                    <ul className="flex space-x-5">
                        <Categories />
                        <li className="text-white hover:opacity-100 cursor-pointer transition-all duration-300">
                            <Link
                                to="/"
                                className={
                                    twMerge(
                                        "py-4 block text-white hover:opacity-100 cursor-pointer transition-all duration-300",
                                        pathname === "/" ? "text-primary" : "opacity-80"
                                    )
                                }

                            >
                                Trang Chủ
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products"
                                className={
                                    twMerge(
                                        "peer py-4 block items-center text-white hover:opacity-100 cursor-pointer transition-all duration-300",
                                        pathname === "/products" ? "text-primary" : "opacity-80"
                                    )
                                }
                            >
                                Cửa Hàng

                            </Link>
                        </li>
                        <Link
                            to="/about-us"
                            className={
                                twMerge(
                                    "py-4 text-white hover:opacity-100 cursor-pointer transition-all duration-300",
                                    pathname === "/about-us" ? "text-primary" : "opacity-80"
                                )
                            }
                        >
                            Chúng Tôi
                        </Link>
                        <Link
                            to="/contact"
                            className={
                                twMerge(
                                    "py-4 text-white hover:opacity-100 cursor-pointer transition-all duration-300",
                                    pathname === "/contact" ? "text-primary" : "opacity-80"
                                )
                            }
                        >
                            Liên Hệ
                        </Link>
                    </ul>
                    {
                        (status === AUTHENTICATE_STATUS.AUTHENTICATED) ? (
                            <button
                                className="inline-block py-4 text-white hover:opacity-100 cursor-pointer transition-all duration-300"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </button>
                        ) : (
                            <div>
                                <Link
                                    to="/login"
                                    className="inline-block py-4 text-white hover:opacity-100 cursor-pointer transition-all duration-300"
                                >
                                    Đăng Nhập
                                </Link>
                                <span className="px-0.5 text-white">/</span>
                                <Link
                                    to="/register"
                                    className="inline-block py-4 text-white hover:opacity-100 cursor-pointer transition-all duration-300"
                                >
                                    Đăng Ký
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>

        </nav>
    );
};

export default Navigation;
import { TRIGGER_TOAST_TYPE, triggerToast } from "common/Sonner";
import Breadcrumb from "components/Breadcrumb";
import { AuthenticateState, clearCredential } from "contexts/Authenticate";
import { loadCart } from "contexts/Cart/Mindleware";
import { loadOrder } from "contexts/Order/Mindleware";
import { AppDispatch, AppState } from "contexts/root";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import AuthenticateService from "services/AuthenticateService";
import { twMerge } from "tailwind-merge";

const MyAccountPage = () => {
    const { user } = useSelector<AppState>(state => state.authenticate) as AuthenticateState
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()
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
        <div
            className="max-w-1200 mx-auto py-10 "
        >
            <Breadcrumb
                items={
                    [
                        {
                            label: "My Account",
                            to: "/profile"
                        }
                    ]
                }
            />
            <div className="flex gap-5">
                <div className="w-72 flex-none space-y-5">
                    <div className="shadow-gray-300 shadow-sm rounded px-4 py-3 flex items-center gap-4">
                        <div className="flex-shrink-0">
                            <img
                                src="/images/user.png"
                                className="rounded-full w-14 h-14 p-1 border border-gray-200 object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-gray-600">Xin chào,</p>
                            <h4 className="text-gray-800 capitalize font-medium">{user?.displayName}</h4>
                        </div>
                    </div>

                    <div className="shadow-gray-400 shadow-sm rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">

                        <div className="space-y-1 pl-8">

                            <Link
                                to="/profile"
                                className={
                                    twMerge(
                                        "hover:text-primary transition capitalize block",
                                        location.pathname === "/profile" ? "text-primary" : ""
                                    )
                                }
                            >
                                Thông tin tài khoản
                            </Link>

                        </div>

                        <div className="space-y-1 pl-8 pt-4">
                            <Link
                                to="/profile/orders"
                                className={
                                    twMerge(
                                        "hover:text-primary transition capitalize block",
                                        location.pathname === "/profile/orders" ? "text-primary" : ""
                                    )
                                }
                            >
                                Đơn hàng
                            </Link>
                        </div>

                        <div className="pl-8 pt-4">
                            <button
                                onClick={handleLogout}
                                className="relative medium capitalize text-gray-800 font-medium hover:text-primary transition block"
                            >
                                Đăng xuất
                                <span className="absolute -left-8 top-0 text-base">
                                    <i className="fas fa-sign-out-alt" />
                                </span>
                            </button>
                        </div>
                    </div>

                </div>

                <div className="grow">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MyAccountPage;
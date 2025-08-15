import ManageCategory from "components/Categories/elements/ManageCategory";
import Dashboard from "components/Dashboard";
import OrderManage from "components/Orders";
import ManageProduct from "components/Products/elements/ManageProduct";
import { AUTHENTICATE_STATUS, AuthenticateState } from "contexts/Authenticate";
import { loadCredential } from "contexts/Authenticate/Mindleware";
import { loadCart } from "contexts/Cart/Mindleware";
import { loadOrder } from "contexts/Order/Mindleware";
import { AppDispatch, AppState } from "contexts/root";
import DashboardLayout from "layouts/DashboardLayout";
import MainLayout from "layouts/MainLayout";
import AboutUsPage from "pages/AboutUsPage";
import CartPage from "pages/CartPage";
import ContactPage from "pages/ContactPage";
import CreateOrderPage from "pages/CreateOrderPage.tsx";
import ForgetPage from "pages/ForgetPage";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import MyAccountPage from "pages/MyAccountPage";
import OrderPage from "pages/OrderPage";
import ProductPage from "pages/ProductPage";
import RegisterPage from "pages/RegisterPage";
import ResetPasswordPage from "pages/ResetPaswordPage";
import SearchPage from "pages/SearchPage";
import VNPayPage from "pages/VNPayPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MyInformation from "widget/MyInformation";
import MyOrders from "widget/MyOrders";



const AppRouters = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { status, user } = useSelector<AppState>(state => state.authenticate) as AuthenticateState

    useEffect(
        () => {
            if (status !== AUTHENTICATE_STATUS.AUTHENTICATED) {
                return
            }

            dispatch(loadCart())
            dispatch(loadOrder())
        }, [dispatch, status]
    )

    useEffect(
        () => {
            if (localStorage.getItem("login") !== "success") {
                return
            }

            dispatch(loadCredential())
        }, [dispatch]
    )

    return (
        <BrowserRouter>
            <Routes>
                {
                    user?.role === "ADMIN" ? (
                        <>
                            <Route path="dashboard" element={<DashboardLayout />}>
                                <Route path="orders" element={<OrderManage />} />
                                <Route path="categories" element={<ManageCategory />} />
                                <Route path="products" element={<ManageProduct />} />
                                <Route index={true} element={<Dashboard />} />
                            </Route>
                            <Route path="*" element={<Navigate to="/dashboard" />} />
                        </>

                    ) : (
                        <Route path="*" element={<MainLayout />}>
                            <Route path="*" element={<HomePage />} />
                            <Route path="login" element={<LoginPage />} />
                            <Route path="forget" element={<ForgetPage />} />
                            <Route path="reset" element={<ResetPasswordPage />} />
                            <Route path="about-us" element={<AboutUsPage />} />
                            <Route path="contact" element={<ContactPage />} />
                            <Route path="cart" element={<CartPage />} />
                            <Route path="orders/create" element={<CreateOrderPage />} />
                            <Route path="orders" element={<OrderPage />} />
                            <Route path="orders/vn-pay" element={<VNPayPage />} />
                            <Route path="products" element={<SearchPage />} />
                            <Route path="product" element={<ProductPage />} />
                            <Route path="register" element={<RegisterPage />} />
                            <Route path="profile" element={<MyAccountPage />}>
                                <Route path="*" element={<MyInformation />} />
                                <Route path="orders" element={<MyOrders />} />


                            </Route>
                        </Route>
                    )
                }


            </Routes>
        </BrowserRouter>
    );
};

export default AppRouters;
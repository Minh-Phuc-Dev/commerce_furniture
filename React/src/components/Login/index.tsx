import { joiResolver } from "@hookform/resolvers/joi";
import { ErrorMessage, Form, TextInput } from "common/ReactHookForm";
import { TRIGGER_TOAST_TYPE, triggerToast } from "common/Sonner";
import { HTTP_CODE } from "constants/HTTP";
import { loadCredential } from "contexts/Authenticate/Mindleware";
import { AppDispatch } from "contexts/root";
import Joi from "joi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthenticateService from "services/AuthenticateService";


const Login = () => {
    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()
    return (
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-1">
                ĐĂNG NHẬP
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
                Đăng nhập nếu bạn là khách hàng quay lại
            </p>
            <Form
                options={
                    {
                        defaultValues: {
                            email: "",
                            password: "",
                        },
                        resolver: joiResolver(
                            Joi.object(
                                {
                                    email: Joi.string().email({ tlds: false }).required(),
                                    password: Joi.string().required()
                                }
                            )
                        )
                    }
                }
                onSubmit={
                    async (data) => {
                        const { code } = await AuthenticateService.login(data)
                        if (code === HTTP_CODE.OK) {
                            triggerToast(
                                {
                                    header: "Đăng nhập thành công",
                                    body: "Bạn đã đăng nhập thành công",
                                    type: TRIGGER_TOAST_TYPE.SUCCESS
                                }
                            )
                            localStorage.setItem("login", "success")
                            navigate("/")
                            dispatch(loadCredential())
                            return
                        }

                        triggerToast(
                            {
                                header: "Đăng nhập lỗi",
                                body: "Email hoặc mật khẩu không đúng",
                                type: TRIGGER_TOAST_TYPE.ERROR
                            }
                        )
                    }
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="text-gray-600 mb-2 block">
                            Địa chỉ Email <span className="text-primary">*</span>
                        </label>
                        <div className="space-y-2">
                            <TextInput
                                controller={{ name: "email" }}
                            />
                            <ErrorMessage
                                name="email"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block">Mật khẩu <span
                            className="text-primary">*</span></label>
                        <div className="space-y-2">
                            <TextInput controller={{ name: "password" }} type="password" />
                            <ErrorMessage
                                name="password"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                        <input type="checkbox" id="agreement"
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                        <label htmlFor="agreement" className="text-gray-600 ml-3 cursor-pointer">
                            Nhớ tôi
                        </label>
                    </div>
                    <Link to="/forget" className="text-primary">Quên mật khẩu?</Link>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                    >
                        Đăng nhập
                    </button>
                </div>

            </Form>

            <div className="mt-6 flex justify-center relative">
                <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                <div className="text-gray-600 uppercase px-3 bg-white relative z-10">
                    HOẶC ĐĂNG NHẬP BẰNG
                </div>
            </div>
            <div className="mt-4 flex gap-4">
                <button
                    type="button"
                    className="block w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm"
                >
                    Facebook
                </button>
                <button
                    type="button"
                    className="block w-1/2 py-2 text-center text-white bg-yellow-600 rounded uppercase font-roboto font-medium text-sm"
                >
                    Google
                </button>
            </div>

            <p className="mt-4 space-x-1 text-gray-600 text-center">
                <span>Bạn chưa có tài khoản?</span>
                <Link
                    className="text-primary"
                    to="/register"
                >
                    Đăng ký ngay
                </Link>
            </p>
            <p>


            </p>
        </div>
    );
};

export default Login;
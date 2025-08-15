import { joiResolver } from "@hookform/resolvers/joi";
import { ErrorMessage, Form, TextInput } from "common/ReactHookForm";
import { TRIGGER_TOAST_TYPE, triggerToast } from "common/Sonner";
import { HTTP_CODE } from "constants/HTTP";
import { loadCredential } from "contexts/Authenticate/Mindleware";
import { AppDispatch } from "contexts/root";
import Joi from "joi";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthenticateService from "services/AuthenticateService";


const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch<AppDispatch>()


    const navigate = useNavigate()
    return (
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-1">
                ĐẶT LẠI MẬT KHẨU
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
                Đặt lại mật khẩu nếu bạn quên mật khẩu
            </p>
            <Form
                options={
                    {
                        defaultValues: {
                            email: searchParams.get("email") || "",
                            password: "",
                            otp: ""
                        },
                        resolver: joiResolver(
                            Joi.object(
                                {
                                    email: Joi.string().email({ tlds: false }).required(),
                                    password: Joi.string().required(),
                                    otp: Joi.string().required()
                                }
                            )
                        )
                    }
                }
                onSubmit={
                    async (data) => {
                        const { code } = await AuthenticateService.resetPassword(data)
                        if (code === HTTP_CODE.OK) {
                            triggerToast(
                                {
                                    header: "Thành công",
                                    body: "Bạn đã đặt lại mật khẩu thành công",
                                    type: TRIGGER_TOAST_TYPE.SUCCESS
                                }
                            )

                            localStorage.setItem("login", "success")
                            navigate("/")
                            dispatch(loadCredential())
                            return
                        }

                        if (code === HTTP_CODE.GONE) {
                            triggerToast(
                                {
                                    header: "Thất bại",
                                    body: "Yêu cầu đặt lại mật khẩu đã hết hạn! Vui lòng gửi lại yêu cầu",
                                    type: TRIGGER_TOAST_TYPE.ERROR
                                }
                            )
                            navigate("/reset")
                            return
                        }

                        triggerToast(
                            {
                                header: "Hành động thất bại",
                                body: "Yêu cầu đặt lại mật khẩu thất bại",
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

                    <div>
                        <label className="text-gray-600 mb-2 block">
                            OTP <span className="text-primary">*</span>
                        </label>
                        <div className="space-y-2">
                            <TextInput
                                controller={{ name: "otp" }}
                            />
                            <ErrorMessage
                                name="otp"
                            />
                        </div>
                    </div>
                </div>


                <div className="mt-4">
                    <button
                        type="submit"
                        className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                    >
                        Đặt lại mật khẩu
                    </button>
                </div>

            </Form>


            <p className="mt-4 space-x-1 text-gray-600 text-center">
                <span>Quay về đăng nhập?</span>
                <Link
                    className="text-primary"
                    to="/register"
                >
                    Đăng nhập
                </Link>
            </p>
            <p>


            </p>
        </div>
    );
};

export default ResetPassword;
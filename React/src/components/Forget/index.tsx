import { joiResolver } from "@hookform/resolvers/joi";
import { ErrorMessage, Form, TextInput } from "common/ReactHookForm";
import { TRIGGER_TOAST_TYPE, triggerToast } from "common/Sonner";
import { HTTP_CODE } from "constants/HTTP";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import AuthenticateService from "services/AuthenticateService";


const Forget = () => {

    const navigate = useNavigate()

    return (
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-1">
                Quên mật khẩu
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
                Nhập địa chỉ email của bạn để nhận hướng dẫn đặt lại mật khẩu
            </p>
            <Form
                options={
                    {
                        defaultValues: {
                            email: "",
                        },
                        resolver: joiResolver(
                            Joi.object(
                                {
                                    email: Joi.string().email({ tlds: false }).required().messages(
                                        {
                                            "string.email": "Email không hợp lệ",
                                            "string.empty": "Email không được để trống",
                                            "any.required": "Email là bắt buộc"
                                        }
                                    )
                                }
                            )
                        )
                    }
                }
                onSubmit={
                    async (data) => {
                        const { code } = await AuthenticateService.forget(data)
                        if (code === HTTP_CODE.OK) {
                            triggerToast(
                                {
                                    header: "Yêu cầu đặt lại mật khẩu thành công",
                                    body: "Bạn đã gửi yêu cầu đặt lại mật khẩu thành công",
                                    type: TRIGGER_TOAST_TYPE.SUCCESS
                                }
                            )
                            navigate(`/reset?email=${data.email}`)
                            return
                        }

                        triggerToast(
                            {
                                header: "Thất bại",
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

            <div className="mt-6 flex justify-center relative">
                <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                <div className="text-gray-600 uppercase px-3 bg-white relative z-10">
                    HOẶC
                </div>
            </div>
            <div className="mt-4 flex gap-4">
                <Link
                    to="/login"
                    type="button"
                    className="block w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm"
                >
                    Đăng nhập
                </Link>
                <Link
                    to="/register"
                    type="button"
                    className="block w-1/2 py-2 text-center text-white bg-yellow-600 rounded uppercase font-roboto font-medium text-sm"
                >
                    Đăng ký
                </Link>
            </div>
        </div>
    );
};

export default Forget;
import {joiResolver} from "@hookform/resolvers/joi";
import {ErrorMessage, Form, TextInput} from "common/ReactHookForm";
import {TRIGGER_TOAST_TYPE} from "common/Sonner";
import {triggerToast} from "common/Sonner/util";
import {HTTP_CODE} from "constants/HTTP";
import Joi from "joi";
import {Link} from "react-router-dom";
import AuthenticateService from "services/AuthenticateService";


const Register = () => {


    return (
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-1">
                TẠO TÀI KHOẢN
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
                Đăng ký tại đây nếu bạn chưa có tài khoản
            </p>
            <Form
                options={
                    {
                        defaultValues: {
                            displayName: "",
                            email: "",
                            password: "",
                            confirmPassword: ""
                        },
                        resolver: joiResolver(
                            Joi.object(
                                {
                                    displayName: Joi.string().required(),
                                    email: Joi.string().email({tlds: false}).required(),
                                    password: Joi.string().required(),
                                    confirmPassword: Joi.string().valid(Joi.ref("password")).required()
                                }
                            )
                        )
                    }
                }
                onSubmit={
                    async (data) => {
                        const {code} = await AuthenticateService.register(data)
                        if (code == HTTP_CODE.CREATED) {
                            triggerToast(
                                {
                                    type: TRIGGER_TOAST_TYPE.SUCCESS,
                                    header: "Success",
                                    body: "Register successfully"
                                }
                            )
                            return
                        }

                        triggerToast(
                            {
                                type: TRIGGER_TOAST_TYPE.ERROR,
                                header: "Failed",
                                body: "Register failed"
                            }
                        )

                    }
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="text-gray-600 mb-2 block space-x-1">
                            <span>Họ và tên</span>
                            <span className="text-primary">*</span>
                        </label>
                        <div className="space-y-2">
                            <TextInput
                                controller={{name: "displayName"}}
                            />
                            <ErrorMessage
                                name="displayName"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block space-x-1">
                            <span>Email</span>
                            <span className="text-primary">*</span>
                        </label>
                        <div className="space-y-2">
                            <TextInput
                                controller={{name: "email"}}
                            />
                            <ErrorMessage
                                name="email"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block space-x-1">
                            <span>Mật khẩu</span>
                            <span className="text-primary">*</span>
                        </label>
                        <div className="space-y-2">
                            <TextInput controller={{name: "password"}} type="password"/>
                            <ErrorMessage
                                name="password"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block space-x-1">
                            <span>Xác nhận mật khẩu</span>
                            <span className="text-primary">*</span>
                        </label>
                        <div className="space-y-2">
                            <TextInput controller={{name: "confirmPassword"}} type="password"/>
                            <ErrorMessage
                                name="confirmPassword"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center mt-6">

                    <input type="checkbox" id="agreement"
                           className="text-primary focus:ring-0 rounded-sm cursor-pointer"/>
                    <label htmlFor="agreement" className="text-gray-600 ml-3 space-x-1 cursor-pointer">
                        <span>Tôi đã đọc và đồng ý với </span>
                        <span className="text-primary"> Điều khoản Dịch vụ</span>
                    </label>

                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                    >
                        Đăng ký
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
                <span>Đã có tài khoản?</span>
                <Link
                    className="text-primary"
                    to="/login"
                >
                    Đăng nhập ngay
                </Link>
            </p>
        </div>
    )
        ;
};

export default Register;
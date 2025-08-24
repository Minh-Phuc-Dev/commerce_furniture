import { joiResolver } from "@hookform/resolvers/joi";
import { DropdownInput, ErrorMessage, Form, TextInput } from "common/ReactHookForm";
import { TRIGGER_TOAST_TYPE, triggerToast } from "common/Sonner";
import { AUTHENTICATE_STATUS, AuthenticateState } from "contexts/Authenticate";
import { updateCredential } from "contexts/Authenticate/Slice";
import { AppState } from "contexts/root";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";
import AuthenticateService from "services/AuthenticateService";

const MyInformation = () => {
    const { user, status } = useSelector<AppState>(state => state.authenticate) as AuthenticateState
    const dispatch = useDispatch()

    return (
        <div className="p-5 shadow-gray-300 shadow-sm border rounded">

            {
                status === AUTHENTICATE_STATUS.AUTHENTICATED ? (
                    <Form
                        options={
                            {
                                defaultValues: {
                                    email: user?.email ?? "",
                                    displayName: user?.displayName ?? "",
                                    phone: user?.attributes?.phone ?? "",
                                    gender: user?.attributes?.gender ?? "",
                                    address: user?.attributes?.address ?? ""
                                },
                                resolver: joiResolver(
                                    Joi.object({
                                        gender: Joi.string().required().messages({
                                            'string.empty': 'Hãy điền thông tin này'
                                        }),
                                        displayName: Joi.string().required().messages({
                                            'string.empty': 'Hãy điền thông tin này'
                                        }),
                                        phone: Joi.string().required().pattern(/^[0-9]{10}$/).messages(
                                            {
                                                'string.empty': 'Hãy điền thông tin này',
                                                'string.pattern.base': 'Số điện thoại phải là 10 chữ số'
                                            }
                                        ),
                                        email: Joi.string().email({ tlds: false }).required().messages(
                                            {
                                                'string.empty': 'Hãy điền thông tin này',
                                                'string.email': 'Email không hợp lệ'
                                            }
                                        ),
                                        address: Joi.string().required().messages({
                                            'string.empty': 'Hãy điền thông tin này'
                                        }),
                                    })
                                ),
                            }
                        }


                        onSubmit={
                            async (values) => {
                                const { success, payload } = await AuthenticateService.profile(values)

                                if (success) {
                                    dispatch(updateCredential({ user: payload }))
                                    triggerToast(
                                        {
                                            type: TRIGGER_TOAST_TYPE.SUCCESS,
                                            header: "Thành công",
                                            body: "Cập nhật thông tin thành công!"
                                        }
                                    )
                                    return
                                }
                                triggerToast(
                                    {
                                        type: TRIGGER_TOAST_TYPE.ERROR,
                                        header: "Thất bại",
                                        body: "Cập nhật thông tin thất bại!"
                                    }
                                )

                            }
                        }
                        className="space-y-5"
                    >
                        <h3 className="text-lg font-medium capitalize">Thông tin tài khoản</h3>

                        <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                            <div className="pointer-events-none space-y-2 opacity-50">
                                <label className="text-gray-600 block">Email</label>
                                <div className="space-y-1">
                                    <TextInput readOnly={true} controller={{ name: "email" }} />
                                    <ErrorMessage name="email" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-600 block">Tên hiển thị</label>
                                <div className="space-y-1">

                                    <TextInput controller={{ name: "displayName" }} />
                                    <ErrorMessage name="displayName" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-600 block">Điện thoại</label>
                                <div className="space-y-1">

                                    <TextInput controller={{ name: "phone" }} />
                                    <ErrorMessage name="phone" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-gray-600 block">Giới tính</label>
                                <div className="space-y-1">

                                    <DropdownInput
                                        className="bg-white border-2"
                                        control={{ name: "gender" }}
                                        items={
                                            [
                                                {
                                                    name: "Nam",
                                                    value: "Nam"
                                                },
                                                {
                                                    name: "Nữ",
                                                    value: "Nữ"
                                                },
                                                {
                                                    name: "Khác",
                                                    value: "Khác"
                                                }
                                            ]
                                        }
                                    />
                                    <ErrorMessage name="gender" />
                                </div>
                            </div>

                            <div className="space-y-2 col-span-2">
                                <label className="text-gray-600 block">Địa chỉ giao hàng</label>
                                <div className="space-y-1">

                                    <TextInput controller={{ name: "address" }} />
                                    <ErrorMessage name="address" />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="px-6 py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                        >
                            Cập nhật
                        </button>
                    </Form>
                ) : null
            }
        </div>

    );
};

export default MyInformation;
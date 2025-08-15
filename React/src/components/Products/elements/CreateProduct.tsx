import {joiResolver} from "@hookform/resolvers/joi";
import {Table} from "@tanstack/react-table";
import Button from "common/Button";
import Modal from "common/Modal";
import useModal from "common/Modal/hooks/UseModal";
import {DropdownInput, ErrorMessage, FileInput, Form, TextAreaInput, TextInput} from "common/ReactHookForm";
import {TRIGGER_TOAST_TYPE, triggerToast} from "common/Sonner";
import useCallAPIState, {CALL_API_STATUS} from "hooks/UseCallAPIState";
import Joi from "joi";
import {FC, useCallback, useEffect, useId} from "react";
import CategoryService from "services/CategoryService";
import ProductService from "services/ProductService";
import {Category} from "types/Category";
import {Product} from "types/Product";


type CreateProductProps = {
    table: Table<Product>
}
const CreateProduct: FC<CreateProductProps> = ({table}) => {
    const id = useId()
    const {setOpen} = useModal()
    const [categories, setCategories] = useCallAPIState<Category[]>(
        {
            status: CALL_API_STATUS.IDLE,
            data: []
        }
    )

    const fetchData = useCallback(
        async () => {
            setCategories(CALL_API_STATUS.LOADING)
            const {payload, success} = await CategoryService.get()
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
        <>
            <Modal.Trigger mode={"open"}>
                <Button className="flex-none" variantType="intent" intent="primary">Thêm sản phẩm</Button>
            </Modal.Trigger>
            <Modal.Overlay/>
            <Modal.Content className="overflow-hidden">
                <div className="flex flex-col w-full h-full max-w-screen-lg rounded bg-white">
                    <div className="px-5 py-2 border-b flex space-x-5 justify-between">
                        <h2 className="font-medium">Create product</h2>
                        <Modal.Trigger
                            mode="close"
                            className="text-gray-400 hover:text-red-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>
                        </Modal.Trigger>
                    </div>
                    <Form<Omit<Product, "id" | "createdAt" | "updatedAt" | "meta" | "rating">>
                        id={id}
                        options={
                            {
                                defaultValues: {
                                    name: "",
                                    price: 0,
                                    oldPrice: 0,
                                    quantity: 0,
                                    status: "",
                                    sku: "",
                                    description: "",
                                    attributes: {
                                        image: []
                                    }
                                },
                                resolver: joiResolver(
                                    Joi.object(
                                        {
                                            name: Joi.string().required(),
                                            price: Joi.number().min(0).less(Joi.ref("oldPrice")).required().messages(
                                                {
                                                    'number.less': 'Discount price must be less than the price'
                                                }
                                            ),
                                            oldPrice: Joi.number().min(0).required(),
                                            quantity: Joi.number().integer().min(0).required(),
                                            status: Joi.string().required(),
                                            sku: Joi.string().max(50),
                                            categoryId: Joi.number().required(),
                                            description: Joi.string(),
                                            attributes: Joi.object(
                                                {
                                                    image: Joi.array().items(
                                                        Joi.string()
                                                    ).min(1)
                                                }
                                            ).required()
                                        }
                                    ).messages(
                                        {
                                            "string.empty": "Property is required",
                                            "array.min": "Property is required",
                                            "any.invalid": "Invalid value"
                                        }
                                    )
                                )
                            }
                        }
                        onSubmit={
                            async (values) => {
                                const {error, payload} = await ProductService.create(values)

                                if (error) {
                                    triggerToast(
                                        {
                                            type: TRIGGER_TOAST_TYPE.ERROR,
                                            header: "Failed",
                                            body: "Something went wrong"
                                        }
                                    )
                                    return
                                }
                                table?.options?.meta?.addData(payload!)
                                triggerToast(
                                    {
                                        type: TRIGGER_TOAST_TYPE.SUCCESS,
                                        header: "Success",
                                        body: "Product created successfully"
                                    }
                                )
                                setOpen(false)
                            }
                        }
                        className="grow overflow-y-scroll p-5 grid grid-cols-2 gap-5"
                    >
                        <div>
                            <h2 className="font-medium">Hình ảnh</h2>
                            <p className="text-sm opacity-50">Thêm hình ảnh sản phẩm của bạn tại đây</p>
                        </div>
                        <div className="space-y-1">
                            <FileInput multiple={true} controller={{name: "attributes.image"}}/>
                            <ErrorMessage name="attributes.image"/>
                        </div>
                        <hr className="col-span-2"/>
                        <div className="col-span-2">
                            <h2 className="font-medium">Giá sản phẩm</h2>
                            <p className="text-sm opacity-50">Thêm thông tin giá cho sản phẩm của bạn</p>
                        </div>
                        <div className="space-y-2">
                            <label>Giá bán</label>
                            <div className="space-y-1">
                                <TextInput placeholder="Enter original price ..." controller={{name: "oldPrice"}}/>
                                <ErrorMessage name="oldPrice"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label>Giá khuyến mãi</label>
                            <div className="space-y-1">
                                <TextInput placeholder="Enter discounted price ..." controller={{name: "price"}}/>
                                <ErrorMessage name="price"/>
                            </div>
                        </div>
                        <hr className="col-span-2"/>
                        <div className="col-span-2">
                            <h2 className="font-medium">Tình trạng hàng</h2>
                            <p className="text-sm opacity-50">Thêm thông tin tồn kho sản phẩm</p>
                        </div>
                        <div className="space-y-2">
                            <label>Số lượng</label>
                            <div className="space-y-1">
                                <TextInput placeholder="Category name ..." controller={{name: "quantity"}}/>
                                <ErrorMessage name="quantity"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label>Trạng thái</label>
                            <div className="space-y-1">
                                <DropdownInput
                                    items={
                                        [
                                            {
                                                name: "Còn hàng",
                                                value: "IN_STOCK"
                                            },
                                            {
                                                name: "Hết hàng",
                                                value: "OUT_OF_STOCK"
                                            }
                                        ]
                                    }
                                    control={
                                        {
                                            name: "status"
                                        }
                                    }
                                />
                                <ErrorMessage name="status"/>
                            </div>
                        </div>

                        <hr className="col-span-2"/>
                        <div className="col-span-2">
                            <h2 className="font-medium">Tóm tắt</h2>
                            <p className="text-sm opacity-50">Chỉnh sửa mô tả sản phẩm và các thông tin cần thiết tại đây</p>
                        </div>

                        <div className="space-y-2">
                            <label>Tên sản phẩm</label>
                            <div className="space-y-1">
                                <TextInput placeholder="Nhập tên sản phẩm" controller={{name: "name"}}/>
                                <ErrorMessage name="name"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label>Mã sản phẩm</label>
                            <div className="space-y-1">
                                <TextInput placeholder="Nhập mã sản phẩm" controller={{name: "sku"}}/>
                                <ErrorMessage name="sku"/>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label>Danh mục</label>
                            <div className="space-y-1">
                                <DropdownInput
                                    items={
                                        categories.data.map(
                                            category => (
                                                {
                                                    name: category.name,
                                                    value: category.id
                                                }
                                            )
                                        )
                                    }
                                    control={{name: "categoryId"}}
                                />
                                <ErrorMessage name="categoryId"/>
                            </div>
                        </div>

                        <div className="space-y-2 col-span-2">
                            <label>Mô tả sản phẩm</label>
                            <div className="space-y-1">
                                <TextAreaInput placeholder="Nhập mô tả sản phẩm..." controller={{name: "description"}}/>
                                <ErrorMessage name="description"/>
                            </div>
                        </div>

                    </Form>
                    <div className="px-5 py-2 border-t flex space-x-5 justify-end">
                        <Button
                            form={id}
                            intent="primary"
                            variantType="intent"
                            type="submit"
                        >
                            Create
                        </Button>
                        <Modal.Trigger
                            mode="close"
                        >
                            <Button
                                intent="error"
                                variantType="intent"
                                type="submit"
                            >
                                Close
                            </Button>
                        </Modal.Trigger>
                    </div>
                </div>

            </Modal.Content>
        </>
    );
};

export default CreateProduct;
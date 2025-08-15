import {joiResolver} from "@hookform/resolvers/joi";
import {Table} from "@tanstack/react-table";
import Button from "common/Button";
import Modal from "common/Modal";
import useModal from "common/Modal/hooks/UseModal";
import {ErrorMessage, FileInput, Form, TextInput} from "common/ReactHookForm";
import {TRIGGER_TOAST_TYPE, triggerToast} from "common/Sonner";
import Joi from "joi";
import {FC, useId} from "react";
import CategoryService from "services/CategoryService";
import {Category} from "types/Category";

type CreateCategoryProps = {
    table: Table<Category>
}
const CreateCategory:FC<CreateCategoryProps> = ({table}) => {
    const id = useId()
    const { setOpen} = useModal()



    return (
        <>
            <Modal.Trigger mode={"open"}>
                <Button className="flex-none" variantType="intent" intent="primary">Thêm danh mục</Button>
            </Modal.Trigger>
            <Modal.Overlay/>
            <Modal.Content>
                <div className="w-96 rounded bg-white">
                    <div className="px-5 py-2 border-b flex space-x-5 justify-between">
                        <h2 className="font-medium">Create category</h2>
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
                    <Form
                        id={id}
                        options={
                            {
                                defaultValues: {
                                    name: "",
                                    attributes: {
                                        image: null
                                    }
                                },
                                resolver: joiResolver(
                                    Joi.object(
                                        {
                                            name: Joi.string().required(),
                                            attributes: Joi.object(
                                                {
                                                    image: Joi.string().allow(null).required()
                                                }
                                            ).optional()
                                        }
                                    )
                                )
                            }
                        }
                        onSubmit={
                            async (values) => {
                                const {error, payload} = await CategoryService.create(values)
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
                                        body: "Category created successfully"
                                    }
                                )
                                setOpen(false)
                            }
                        }
                        className="p-5 space-y-5"
                    >
                        <div className="space-y-2">
                            <label>Name</label>
                            <div className="space-y-1">
                                <TextInput placeholder="Category name ..." controller={{name: "name"}}/>
                                <ErrorMessage name="name"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label>Image</label>
                            <div className="space-y-1">
                                <FileInput  controller={{name: "attributes.image"}}/>
                                <ErrorMessage name="attributes.image"/>
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

export default CreateCategory;
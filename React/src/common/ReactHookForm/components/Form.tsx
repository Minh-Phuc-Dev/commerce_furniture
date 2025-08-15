import {FormHTMLAttributes, PropsWithChildren} from "react";
import {FieldValues, FormProvider, useForm, UseFormProps} from "react-hook-form";

type FormProps<T extends FieldValues = FieldValues> = PropsWithChildren & Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
    options?: UseFormProps<T>,
    onSubmit?: (data: T) => void
}

function Form<T extends FieldValues = FieldValues>({ options, onSubmit, children, ...props }: FormProps<T>) {
    const methods = useForm<T>(options)
    const { handleSubmit } = methods

    return (
        <FormProvider {...methods}>
            <form
                {...props}
                onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
            >
                {children}
            </form>
        </FormProvider>
    )
}

export default Form
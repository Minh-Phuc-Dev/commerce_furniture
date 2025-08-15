import { Content, Item, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu';
import { FC, HTMLAttributes, ReactNode, useCallback } from "react";
import { useController, UseControllerProps, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type ListCheckboxProps = {
    items: {
        name: ReactNode,
        value: string | number
    }[]
    control: UseControllerProps
    placeholder?: string
} & HTMLAttributes<HTMLButtonElement>

const ListCheckbox: FC<ListCheckboxProps> = ({ items, control, placeholder, className, ...props }) => {

    const { setValue } = useFormContext()
    const { field, fieldState } = useController(control)
    const value = field.value as string

    const onSelect = useCallback((name: string, value: number | string) => {
        return () => {
            setValue(name, value, { shouldTouch: true, shouldValidate: true })
        }
    }, [setValue])

    return (
        <Root>
            <Trigger asChild>
                <button
                    aria-invalid={fieldState.invalid}
                    className={twMerge("outline-none min-w-full py-1 px-2 flex items-center rounded border-2 focus:border-sky-700 aria-invalid:focus:border-gemini-error aria-invalid:border-gemini-error transition-colors duration-200", className)}
                    {...props}
                >
                    <div className="grow text-left">
                        {
                            items.find(item => item.value === value)?.name ?? (
                                <span className="text-black">{placeholder ?? "Chọn"}</span>
                            )
                        }
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-none text-gray-500">
                        <path
                            fillRule="evenodd"
                            d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
                            clipRule="evenodd"
                        />
                    </svg>

                </button>
            </Trigger>
            <Portal>
                <Content
                    className="z-30 border bg-white rounded"
                    sideOffset={5}
                    style={
                        {
                            minWidth: "var(--radix-popper-anchor-width)"
                        }
                    }
                >

                    {
                        items.map(
                            (item, index) => (
                                <Item
                                    key={index}
                                    onClick={onSelect(field.name, item.value)}
                                    className="outline-none px-2 py-0.5 cursor-pointer hover:bg-gemini-navy-50"
                                >
                                    {item.name}
                                </Item>
                            )
                        )
                    }
                </Content>
            </Portal>
        </Root>
    )
}

export default ListCheckbox
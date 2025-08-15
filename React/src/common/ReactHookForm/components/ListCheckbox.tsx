import * as Checkbox from '@radix-ui/react-checkbox';
import {CheckIcon} from '@radix-ui/react-icons';
import {FC} from 'react';
import {useController, UseControllerProps, useFormContext} from "react-hook-form";

type ListCheckboxProps = {
    items: {
        name: string
        value: any
        description?: string
    }[]
    control: UseControllerProps
    className?: string
}

const ListCheckbox: FC<ListCheckboxProps> = ({items, control, className}) => {

    const {setValue} = useFormContext()
    const {field} = useController(control)
    const fields = field.value as string[] ?? []

    const handleOnChange = (value: string) => {
        return (checked: boolean | string) => {
            if (checked === true && !fields.includes(value)) {
                setValue(field.name, [...fields, value])
                return
            }

            if (fields.includes(value)) {
                setValue(field.name, [...fields].filter(item => item !== value))
            }
        }
    }

    return (
        <div
            className={className}
        >
            {
                items.map(
                    ({name, value}) => (
                        <label
                            key={value}
                            className="flex space-x-2 items-center cursor-pointer"
                        >
                            <Checkbox.Root
                                className="border rounded focus:shadow h-4 w-4 aria-checked:bg-blue-500"
                                defaultChecked={fields.some(item => item === value)}
                                onCheckedChange={handleOnChange(value)}
                            >
                                <Checkbox.Indicator>
                                    <CheckIcon className="text-white"/>
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <span>{name}</span>
                        </label>
                    )
                )
            }
        </div>
    )
}

export default ListCheckbox
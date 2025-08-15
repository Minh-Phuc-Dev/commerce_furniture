import {FC, InputHTMLAttributes} from "react";
import {useController, UseControllerProps} from "react-hook-form";
import {twMerge} from "tailwind-merge";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    controller: UseControllerProps
    wrapperClassName?: string
    iconError?: boolean
}

const TextInput: FC<TextInputProps> = ({controller, className, wrapperClassName, iconError = true, ...props}) => {
    const {field, fieldState} = useController(controller)

    return (
        <div
            aria-invalid={fieldState.invalid}
            className={twMerge("flex items-center rounded border-2 focus-within:border-primary aria-invalid:focus-within:border-gemini-error aria-invalid:border-gemini-error transition-colors duration-200", wrapperClassName)}
        >
            <input
                {...props}
                className={twMerge("w-full outline-none border border-transparent rounded-sm px-2 py-1 transition-colors duration-200", className)}
                ref={field.ref}
                name={field.name}
                value={field.value ?? ""}
                onBlur={field.onBlur}
                onChange={field.onChange}
                disabled={field.disabled}
                data-error-message={fieldState.error?.message}
                aria-invalid={fieldState.invalid}
            />

            {
                (iconError && fieldState.error) ? (
                    <span
                        className="px-2 aria-invalid:text-gemini-error"
                        aria-invalid={fieldState.invalid}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            className="w-4 h-4">
                            <path fillRule="evenodd"
                                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                clipRule="evenodd"/>
                        </svg>
                    </span>
                ) : null
            }
        </div>
    )
}

export default TextInput
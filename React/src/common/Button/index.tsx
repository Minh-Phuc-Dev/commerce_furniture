import {cva, cx} from "class-variance-authority";
import variants from "common/Button/components";
import {ButtonHTMLAttributes, forwardRef, PropsWithChildren} from "react";

const button = cva(
    "disabled:opacity-60 disabled:pointer-events-none inline-flex justify-center items-center py-2 px-4 text-sm tracking-wide font-medium rounded-md transition-all duration-300",
    {
        variants
    }
)

export type ButtonProps = {
    variantType: keyof typeof variants
    intent: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error"
    disabled?: boolean
} &  ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, type = "button", intent, variantType, children, ...props}, ref) => (
        <button
            className={
                cx(
                    button({[variantType]: intent}),
                    className
                )
            }
            ref={ref}
            type={type}
            {...props}
        >
            {children}
        </button>
    )
)

export default Button
import {cva} from "class-variance-authority";
import variants from "common/Badge/components";
import {forwardRef, HTMLAttributes, PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";

const badge = cva(
    "inline-flex items-center px-1.5 py-1 text-xs leading-none tracking-wide rounded-sm cursor-default transition-all duration-300",
    {
        variants
    }
)

type BadgeProps = {
    type: keyof typeof variants
    intent: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error"
    disabled?: boolean
} & HTMLAttributes<HTMLSpanElement> & PropsWithChildren

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, intent, type, children, ...props }, ref) => (
        <span
            className={
                twMerge(
                    badge({ [type]: intent }),
                    className
                )
            }
            ref={ref}
            {...props}
        >
            {children}
        </span>
    )
)

export default Badge
import ModalContext from "common/Modal/context/ModalContext.ts";
import {FC, HTMLAttributes, PropsWithChildren, useContext, useMemo} from 'react';
import {twMerge} from "tailwind-merge";

type TriggerProps = PropsWithChildren & HTMLAttributes<HTMLDivElement> & {
    mode: "open" | "close" | "toggle"
}
const Trigger: FC<TriggerProps> = ({children, mode, className,  ...props}) => {
    const { open, setOpen, toggle} = useContext(ModalContext)

    const trigger = useMemo(
        () => {
            if(mode === "open") {
                return () => setOpen(true)
            }
            if (mode === "close") {
                return () => setOpen(false)
            }
            return toggle
        },
        [mode, setOpen, toggle]
    )
    return (
        <div
            data-state={open ? "open" : "closed"}
            className={twMerge("inline-flex transition duration-300 cursor-pointer", className)}
            onClick={trigger}
            {...props}
        >
            {children}
        </div>
    )
}

export default Trigger;
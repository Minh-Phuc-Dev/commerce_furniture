import ModalContext from "common/Modal/context/ModalContext.ts";
import {FC, HTMLAttributes, PropsWithChildren, useContext} from 'react';
import {createPortal} from "react-dom";
import {twMerge} from "tailwind-merge";

type ContentProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren
const Content: FC<ContentProps> = ({className, children, ...props}) => {
    const {closeOutside, setOpen, open} = useContext(ModalContext)

    if (!open) {
        return null
    }

    return createPortal(
        (
            <div
                {...props}
                className={twMerge("fixed inset-0 p-5 z-20 flex justify-center items-center", className)}
                onClick={closeOutside ? () => setOpen(false) : undefined}
            >
                {children}
            </div>
        ),
        document.body
    )
};

export default Content;
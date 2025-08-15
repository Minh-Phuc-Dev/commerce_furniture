import ModalContext from "common/Modal/context/ModalContext.ts";
import {FC, HTMLAttributes, useContext} from 'react';
import {createPortal} from "react-dom";
import {twMerge} from "tailwind-merge";

type OverlayProps = HTMLAttributes<HTMLDivElement>
const Overlay:FC<OverlayProps> = ({className, ...props}) => {
    const {closeOutside, setOpen, open} = useContext(ModalContext)
    return open ? (
        createPortal(
            <div
                {...props}
                className={twMerge("bg-black/40 z-10 backdrop-blur-sm fixed inset-0", className)}
                onClick={closeOutside ? () => setOpen(false) : undefined}
            >
            </div>,
            document.body
        )
    ) : null
};

export default Overlay;
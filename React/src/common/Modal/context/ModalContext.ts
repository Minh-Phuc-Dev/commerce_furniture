import {createContext} from "react";

type ModalContextType = {
    open: boolean
    closeOutside: boolean
    setOpen: (open: boolean) => void
    toggle: () => void
}

const ModalContext = createContext<ModalContextType>(
    {
        open: false,
        closeOutside: false,
        setOpen: () => {},
        toggle: () => {}
    }
)

export default ModalContext;
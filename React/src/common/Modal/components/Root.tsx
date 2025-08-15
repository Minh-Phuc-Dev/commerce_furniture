import ModalContext from "common/Modal/context/ModalContext.ts";
import {FC, PropsWithChildren, useCallback, useState} from 'react';

type RootProps = PropsWithChildren & {
    closeOutside?: boolean
    defaultOpen?: boolean
}
const Root: FC<RootProps> = ({children, closeOutside = false, defaultOpen = false}) => {
    const [open, setOpen] = useState(defaultOpen)
    const toggle = useCallback(() => setOpen(open => !open), [])

    return (
        <ModalContext.Provider
            value={
                {
                    open,
                    closeOutside,
                    setOpen,
                    toggle
                }
            }
        >
            {children}
        </ModalContext.Provider>
    )
}

export default Root;
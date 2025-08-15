import ModalContext from "common/Modal/context/ModalContext.ts";
import {useContext} from "react";

const useModal = () => {
    return useContext(ModalContext)
}

export default useModal;
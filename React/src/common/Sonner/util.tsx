import TRIGGER_TOAST_TYPE from "common/Sonner/enum.ts";
import Toast from "common/Sonner/Toast.tsx";
import {ReactNode} from "react";
import {ExternalToast, toast} from 'sonner';

type Type = typeof TRIGGER_TOAST_TYPE[keyof typeof TRIGGER_TOAST_TYPE]

type Options = {
    header: ReactNode,
    body: ReactNode,
    type: Type
    data?: ExternalToast
    jsx?: (props: {id: string | number, type: Type, header: ReactNode, body: ReactNode} ) => React.ReactElement
}

export const triggerToast = (options: Options) => {
    const {jsx, header, type, body, data = {}} = options
    toast.custom(
        jsx ? (id: string | number) => jsx({id, body, header, type}) : (id: string | number) => <Toast header={header} body={body} id={id} type={type}/>,
        {
            unstyled: false,
            ...data
        }
    )
}
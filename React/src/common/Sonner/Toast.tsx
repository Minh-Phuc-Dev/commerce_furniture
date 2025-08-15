import TRIGGER_TOAST_TYPE from "common/Sonner/enum.ts";
import {isString} from "lodash";
import {FC, ReactNode} from "react";
import {toast} from "sonner";
import {twMerge} from "tailwind-merge";

type ToastProps = {
    header: ReactNode,
    body: ReactNode,
    id: string | number
    type: typeof TRIGGER_TOAST_TYPE[keyof typeof TRIGGER_TOAST_TYPE]
}

const ICONS = {
    [TRIGGER_TOAST_TYPE.SUCCESS]: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
            <path fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clipRule="evenodd"/>
        </svg>
    ),
    [TRIGGER_TOAST_TYPE.INFO]: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
            <path fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                clipRule="evenodd"/>
        </svg>
    ),
    [TRIGGER_TOAST_TYPE.WARNING]: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
            <path fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"/>
        </svg>
    ),
    [TRIGGER_TOAST_TYPE.ERROR]: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
            <path fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"/>
        </svg>
    )
}

const variants = {
    [TRIGGER_TOAST_TYPE.INFO]: "text-gemini-info",
    [TRIGGER_TOAST_TYPE.SUCCESS]: "text-gemini-success",
    [TRIGGER_TOAST_TYPE.WARNING]: "text-gemini-warning",
    [TRIGGER_TOAST_TYPE.ERROR]: "text-gemini-error",
}

const Toast: FC<ToastProps> = ({id, type, body, header}) => {
    return (
        <div
            data-toast-type={type}
            data-toast-id={id}
            style={{width: "var(--width"}}
            className={"border bg-white overflow-hidden rounded p-2"}
        >
            <div className="flex items-center space-x-1">
                <div className={twMerge("flex-none h-4 w-4", variants[type])}>
                    {ICONS[type]}
                </div>
                <div className="grow flex items-center">
                    {
                        isString(header) ? (
                            <h2 className={twMerge("grow text-sm font-medium", variants[type])}>{header}</h2>
                        ) : (
                            <div className="grow">{header}</div>
                        )
                    }
                    <button
                        type="button"
                        className="flex-none text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => toast.dismiss(id)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            className="w-5 h-5">
                            <path
                                d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="pl-5 text-xs">
                {body}
            </div>
        </div>
    )
}

export default Toast;
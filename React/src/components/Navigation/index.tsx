import {LetterAvatar} from "common/Avatar";
import {TRIGGER_TOAST_TYPE, triggerToast} from "common/Sonner";
import {AuthenticateState, clearCredential} from "contexts/Authenticate";
import {loadCart} from "contexts/Cart/Mindleware";
import {loadOrder} from "contexts/Order/Mindleware";
import {AppDispatch, AppState} from "contexts/root";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import AuthenticateService from "services/AuthenticateService";

const Navigation = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: AppState) => state.authenticate) as AuthenticateState



    const handleLogout = async () => {
        const {success} = await AuthenticateService.logout()

        if (success) {
            triggerToast(
                {
                    type: TRIGGER_TOAST_TYPE.SUCCESS,
                    header: "Success",
                    body: "Logout successfully"
                }
            )
            dispatch(clearCredential())
            dispatch(loadOrder())
            dispatch(loadCart())
            return
        }

        triggerToast(
            {
                type: TRIGGER_TOAST_TYPE.ERROR,
                header: "Error",
                body: "Logout failed"
            }
        )

    }

    const header = useRef<HTMLHeadingElement>(null)
    useEffect(() => {
        if (header.current === null) {
            return
        }
        document.body.style.setProperty(
            "--layout-header-height",
            `${header.current.getBoundingClientRect().height}px`
        )
    }, [])

    return (
        <header
            ref={header}
            className="p-2 flex justify-end border-b gap-x-5"
        >
            <LetterAvatar
                size={32}
                label={user?.displayName || "Admin"}
            />
            <button
                onClick={handleLogout}
                className="px-5 rounded py-1 flex space-x-1 text-white font-medium bg-primary"
            >
                Đăng xuất
            </button>
        </header>
    );
};

export default Navigation
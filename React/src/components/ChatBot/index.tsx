import InputMessage from "components/ChatBot/elements/InputMessage"
import Messages from "components/ChatBot/elements/Messages"
import { toggleChat } from "contexts/Chat"
import { useSharedDispatch, useSharedSelector } from "hooks/UseSharedContext"
import { useCallback } from "react"
import { useLocation } from "react-router-dom"


const ChatBot = () => {
    const { pathname } = useLocation()

    const { isOpen } = useSharedSelector(state => state.chat)
    const dispatch = useSharedDispatch()
    const toggleOpen = useCallback(
        () => {
            dispatch(toggleChat())
        }, [dispatch]
    )

    return ["about-us", "contact", "login", "register", "forget", "cart", "profile", "orders", "reset"].some(route => pathname.includes(route)) ? null : (
        <div className="fixed bottom-5 right-5">
            {
                isOpen ? (
                    <div className='w-96 border border-primary bg-zinc-50 rounded overflow-hidden'>
                        <Messages />
                        <InputMessage />
                    </div >
                ) : (
                    <img
                        className="w-72 cursor-pointer"
                        alt="chatbot"
                        src="/gif/chatbot.gif"
                        onClick={toggleOpen}
                    />
                )
            }


        </div >
    )
}

export default ChatBot
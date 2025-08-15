import Message from "components/ChatBot/elements/Message";
import MessageSkeleton from "components/ChatBot/elements/MessageSkeleton";
import { CHAT_STATUS, toggleChat } from "contexts/Chat";
import { useSharedDispatch, useSharedSelector } from "hooks/UseSharedContext";
import { useCallback } from "react";
import generateKey from "utils/Key";

const Messages = () => {
    const { messages, status } = useSharedSelector(state => state.chat)
    const dispatch = useSharedDispatch()
    const toggleOpen = useCallback(
        () => {
            dispatch(toggleChat())
        }, [dispatch]
    )


    return (
        <>
            <div className="flex justify-between items-center px-5 py-2 border-b">
                <div className="flex gap-x-2">

                    <img
                        className="flex-none w-10 h-10 rounded-full border"
                        src="/images/chatbot.gif"
                        alt="logo"
                    />

                    <div>
                        <h1 className="font-bold text-neutral-700">Trợ lý ảo House Luxury</h1>
                        <div className="flex items-center justify-start space-x-1">
                            <div className="size-2 rounded-full bg-green-500" />
                            <p className="text-xs font-normal text-neutral-600">Đang hoạt động</p>
                        </div>
                    </div>
                </div>
                <button
                    className="hover:opacity-90 cursor-pointer"
                    onClick={toggleOpen}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                    </svg>
                </button>


            </div>
            <div

                className="w-96 h-96 overflow-y-auto p-5 space-y-5"
            >

                {
                    messages.map(
                        (message, index) => (
                            <Message
                                key={generateKey()}
                                message={message}
                                last={status === CHAT_STATUS.FETCHING ? false : index === messages.length - 1}
                            />
                        )
                    )
                }

                {
                    status === CHAT_STATUS.FETCHING ? (
                        <MessageSkeleton />

                    ) : null
                }


            </div>
        </>
    );
}

export default Messages;
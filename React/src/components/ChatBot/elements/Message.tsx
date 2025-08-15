import { MessageContent } from 'contexts/Chat/Type'
import { FC, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'

const Message: FC<{ message: MessageContent, last?: boolean }> = ({ message, last }) => {
    const messagesRef = useRef<HTMLDivElement | null>(null)
    const timeoutId = useRef<NodeJS.Timeout | null>(null)

    useEffect(
        () => {
            if (last) {
                timeoutId.current = setTimeout(
                    () => {
                        const container = messagesRef.current?.parentElement;
                        container?.scrollBy(
                            {

                                top: container.scrollHeight,
                                behavior: 'smooth'
                            }
                        );
                    }, 300
                )

            }

            return () => {
                if (timeoutId.current) {
                    clearTimeout(timeoutId.current)
                }
            }


        }, [last]
    )


    return message.role === "user" ? (
        <div
            ref={messagesRef}
            className="w-fit  shadow-lg relative ml-auto rounded-lg bg-primary p-3 text-white/80"
        >
            <div className="space-y-2">
                <p
                    className="whitespace-pre-line text-sm font-medium"
                    style={{ wordBreak: "break-word" }}
                >
                    {message.content}
                </p>
            </div>
            <p className="mt-2 text-xs font-normal opacity-80">{message.createdAt}</p>
        </div>
    ) : (
        <div
            ref={messagesRef}
            className="w-fit max-w-[min(100%,300px)] shadow-lg rounded-lg bg-neutral-200/50 p-3 text-[#2c2e33]"
        >
            <div className="space-y-2">
                <ReactMarkdown className="text-sm font-medium">
                    {message.content}
                </ReactMarkdown>
            </div>
            <p className="mt-2 text-xs font-normal opacity-80">{message.createdAt}</p>
        </div>
    )
}

export default Message
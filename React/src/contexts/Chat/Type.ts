import { CHAT_STATUS } from "contexts/Chat/Enum";

export type MessageContent = {
    role: 'user' | 'assistant'
    content: string,
    createdAt: string
}

export type ChatState = {
    isOpen: boolean
    status: typeof CHAT_STATUS[keyof typeof CHAT_STATUS]
    error?: unknown
    messages: MessageContent[]
}
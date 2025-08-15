import { createSlice } from "@reduxjs/toolkit";
import { CHAT_STATUS } from "contexts/Chat/Enum";
import { sendMessage } from "contexts/Chat/Mindleware";
import { ChatState, MessageContent } from "contexts/Chat/Type";

const initialState: ChatState = {
    isOpen: false,
    status: CHAT_STATUS.IDLE,
    messages: [
        {
            role: "assistant",
            content: "Xin chào bạn! Mình là trợ lý ảo của House Luxury, mình có thể giúp bạn tư vấn đồ nội thất, sẵn sàng giúp bạn chọn những món đồ phù hợp để làm đẹp không gian sống. Hãy cho mình biết bạn đang tìm gì hoặc cần gợi ý gì nhé!",
            createdAt: new Date().toLocaleTimeString()
        }
    ],
}


const chatSlice = createSlice(
    {
        name: "chat",
        initialState,
        reducers: {
            toggleChat: (state) => {
                state.isOpen = !state.isOpen
            },
            addMessage: (state, action: { payload: MessageContent }) => {
                const { role, content } = action.payload as MessageContent
                state.messages.push(
                    {
                        role,
                        content,
                        createdAt: new Date().toLocaleTimeString()
                    }
                );

                return state;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(
                sendMessage.pending,
                (state) => {

                    state.status = CHAT_STATUS.FETCHING
                }
            ).addCase(
                sendMessage.rejected,
                (state) => {
                    state.status = CHAT_STATUS.ERROR
                    state.error = "Failed to send message"
                }
            ).addCase(
                sendMessage.fulfilled,
                (state, { payload: data }) => {
                    const { success, payload } = data
                    if (success) {
                        state.status = CHAT_STATUS.SUCCESS
                        state.messages.push(
                            {
                                role: 'assistant',
                                content: payload ?? "",
                                createdAt: new Date().toLocaleTimeString()
                            }
                        )
                        return
                    }

                    state.status = CHAT_STATUS.ERROR
                }
            )
        }
    }
)

const {
    actions: {
        toggleChat,
        addMessage
    },
    reducer
} = chatSlice

export { addMessage, reducer, toggleChat };


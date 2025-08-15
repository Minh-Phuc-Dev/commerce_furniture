import interceptor from "apis/Interceptor";
import { requestApiHelper } from "helpers/Request";


class ChatService {

    static async chat(payload: {
        question: string
    }) {
        return await requestApiHelper<string>(
            interceptor.post(
                "chatbot",
                payload,
            )
        )
    }


}

export default ChatService
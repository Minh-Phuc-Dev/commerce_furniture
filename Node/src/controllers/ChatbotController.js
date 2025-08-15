const { JoiValidator } = require("@src/validations/JoiValidator");
const { QuestionSchema } = require("@src/validations/Chatbot/Question");
const ChatBotService = require("@services/ChatBotService");


class ChatbotController {

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */

    static async chat(request, response) {
        const { question } = JoiValidator.validate(request.body, QuestionSchema);
        (await ChatBotService.chat(question)).send(response)
    }


}

module.exports = {
    ChatbotController
}
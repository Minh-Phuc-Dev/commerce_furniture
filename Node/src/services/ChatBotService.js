const { HTTP_CODE } = require('@helpers/HttpStatus');
const { JsonResult } = require('@helpers/JsonResult');
const { getVectorStore } = require('@databases/Chroma');
const { PromptTemplate } = require('@langchain/core/prompts')
const { ChatOpenAI } = require('@langchain/openai');
const { createRetrievalChain } = require("langchain/chains/retrieval")
const { createStuffDocumentsChain } = require("langchain/chains/combine_documents")
const fs = require('fs');
const path = require('path');

class ChatBotService {

    /**
     * @param {string} question
     * @returns {Promise<JsonResult>}
     */

    static async chat(question) {

        const retriever = (await getVectorStore()).asRetriever(
            {
                k: 2
            }
        )

        const llm = new ChatOpenAI(
            {
                "model": "gpt-4.1-mini"
            }
        );


        const template = fs.readFileSync(path.join(process.cwd(), "templates", "Chat.txt"), 'utf8');

        const prompt = PromptTemplate.fromTemplate(template);

        const combineDocsChain = await createStuffDocumentsChain({
            llm,
            prompt,
        });


        const retrievalChain = await createRetrievalChain({
            combineDocsChain,
            retriever,
        });


        const result = await retrievalChain.invoke({ input: question })

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            result.answer,
            "Chat successfully.",
            result
        )

    }
}

module.exports = ChatBotService;

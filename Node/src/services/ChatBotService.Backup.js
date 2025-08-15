const { PromptTemplate } = require('@langchain/core/prompts')
const { ChatOpenAI, OpenAIEmbeddings } = require('@langchain/openai');
const { RetrievalQAChain } = require('langchain/chains');
const { Document } = require('langchain/document')
const { MemoryVectorStore } = require('langchain/vectorstores/memory')


class ChatBotService {


    static async chatBot() {
        // 1. Dữ liệu sản phẩm và metadata
        const documents = [
            "Áo NIKE, màu xanh, chất liệu: vải cotton, trạng thái: còn hàng, giá: 100000đ",
            "Áo thun ADIDAS, chất liệu: da tổng hợp, trạng thái: còn hàng, giá: 200000đ",
            "Áo kẻ NIKE, chất liệu: vải cotton, trạng thái: còn hàng, giá: 300000đ",
            "Áo kẻ ADIDAS, chất liệu: vải cotton, trạng thái: còn hàng, giá: 400000đ",
            "Áo kẻ NIKE, chất liệu: vải cotton, trạng thái: còn hàng, giá: 500000đ"
        ];

        const metadatas = [
            { name: "Áo NIKE", price: 100000 },
            { name: "Áo thun ADIDAS", price: 200000 },
            { name: "Áo kẻ NIKE", price: 300000 },
            { name: "Áo kẻ ADIDAS", price: 400000 },
            { name: "Áo kẻ NIKE", price: 500000 },
        ];

        const docs = documents.map((text, index) =>
            new Document({ pageContent: text, metadata: metadatas[index] })
        );

        // 2. Khởi tạo embedding
        const embeddings = new OpenAIEmbeddings();

        // 3. Tạo MemoryVectorStore
        const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

        // 4. Tạo retriever
        const retriever = vectorStore.asRetriever();

        // 5. Khởi tạo mô hình ChatOpenAI
        const llm = new ChatOpenAI({ modelName: 'gpt-4o', temperature: 0 });

        // 6. Prompt template
        const template = `
Bạn là một trợ lý tư vấn sản phẩm thông minh. Dựa trên thông tin sản phẩm sau: {context}
Hãy trả lời câu hỏi: {question}
- Nếu câu hỏi liên quan đến giá, chỉ liệt kê các sản phẩm có giá phù hợp với yêu cầu (ví dụ: dưới 200000đ).
- Trả lời ngắn gọn, chính xác, thân thiện và chỉ dùng thông tin từ dữ liệu.
- Nếu không có sản phẩm phù hợp, trả lời: "Không có sản phẩm nào phù hợp với yêu cầu."
`;

        const prompt = PromptTemplate.fromTemplate(template);

        // 7. Tạo QA chain
        const qaChain = RetrievalQAChain.fromLLM(llm, retriever, {
            returnSourceDocuments: true,
            prompt
        });

        // 8. Gửi truy vấn
        const query = "Xin chao";
        const result = await qaChain.invoke({ query });

        console.log("Câu trả lời:", result.text);
        console.log("Tài liệu tham chiếu:", result.sourceDocuments.map((doc) => doc.pageContent));
    }
}

module.exports = ChatBotService 
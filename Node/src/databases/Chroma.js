const { Category } = require("@models/Category/CategoryModel");
const { Product } = require("@models/Product/ProductModel");
const { Document } = require('langchain/document');
const { ChatOpenAI, OpenAIEmbeddings } = require('@langchain/openai');
const { Chroma } = require('@langchain/community/vectorstores/chroma');
const { Op } = require("sequelize");
const { isEmpty } = require("lodash");


let vectorStore = null

/**
 * Retrieves the vector store instance for the 'products' collection.
 * Initializes the vector store with embeddings if it has not been created yet.
 * @returns {Promise<Chroma>} A promise that resolves to the vector store instance.
 */

async function getVectorStore() {
    if (vectorStore === null) {
        const embeddings = new OpenAIEmbeddings(
            {
                model: "text-embedding-3-small",
            }
        );

        vectorStore = await Chroma.fromExistingCollection(
            embeddings,
            {
                collectionName: 'products',
                clientParams: {
                    host: "localhost",
                    port: 8000,
                    ssl: false
                }
            }
        );
        const originalMethod = vectorStore.similaritySearchVectorWithScore;

        vectorStore.similaritySearchVectorWithScore = async function (vector, k, filter) {
            const wrappedVector = [vector];
            return originalMethod.call(this, wrappedVector, k, filter);
        };
    }
    return vectorStore
}


async function startChroma(overwrite = false) {
    const vectorStore = await getVectorStore();


    const ids = (await vectorStore.collection.get()).metadatas.map(
        (item) => item.id
    )

    const products = await Product.findAll(
        {
            attributes: ["id", "name", "price", "oldPrice", "description"],
            where: overwrite ? undefined : {
                id: {
                    [Op.notIn]: ids
                }
            },
            include: {
                model: Category,
                as: "category",
                attributes: ["name"]
            }
        }
    ).then(
        (products) => {
            return products.map(
                (item) => {
                    const { category, ...product } = item.toJSON()
                    return {
                        ...product,
                        category: category.name
                    }
                }
            )
        }
    )

    const meta = products.map(
        (item) => (
            {
                id: item.id,
                name: item.name,
                category: item.category,
                price: item.price,
                oldPrice: item.oldPrice,
            }
        )

    )

    const docs = products.map(
        (product, index) => new Document(
            {
                pageContent: `Danh mục: ${product.category} Tên: ${product.name}, Giá: ${product.price}, Mô tả: ${product.description}`,
                metadata: meta[index],
                id: product.id
            }
        )
    );

    if (isEmpty(docs)) {
        console.log("Setup Chroma successfully!");
        return
    }

    await vectorStore.addDocuments(docs);
    console.log("Insert documents successfully!");
}


module.exports = {
    startChroma,
    getVectorStore
}


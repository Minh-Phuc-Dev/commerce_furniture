const { JsonResult } = require("@helpers/JsonResult");
const { HTTP_CODE } = require("@helpers/HttpStatus");
const { Product } = require("@models/Product/ProductModel");
const { isNull, isEmpty, capitalize } = require("lodash");
const { Op } = require("sequelize");
const { Category } = require("@models/Category/CategoryModel");

class ProductService {

    /**
     * Create category
     * @param {ProductDTO} dto
     * @returns {Promise<JsonResult>}
     */
    static async create(dto) {
        return JsonResult.builder(
            HTTP_CODE.CREATED,
            HTTP_CODE.CREATED,
            await Product.create(dto),
            "Product created successfully."
        )
    }

    /**
     * Create category
     * @param {ProductDTO} dto
     * @returns {Promise<JsonResult>}
     */
    static async update(dto) {
        const product = await Product.findByPk(dto.id)

        if (isNull(product)) {
            return JsonResult.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.NOT_FOUND,
                null,
                "Product not found."
            )
        }

        product.set(dto)
        await product.save()

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            product.toJSON(),
            "Product update successfully."
        )
    }

    /**
     * Get all categories
     * @param {Object} [query]
     * @param {string[] | string} [query.categories]
     * @param {string} [query.price]
     * @param {string} [query.minPrice]
     * @param {string} [query.maxPrice]
     * @param {string} [query.search]
     * @returns {Promise<JsonResult>}
     */
    static async findAll(query) {

        const conditions = []
        
        if (!isEmpty(query.search)) {
            conditions.push(
                {
                    name: {
                        [Op.like]: `%${query.search}%`
                    }
                }
            )
        }

        if (!isEmpty(query.categories)) {
            conditions.push(
                {
                    categoryId: {
                        [Op.in]: Array.isArray(query.categories) ? query.categories.map(
                            category => Number(category)
                        ) : [Number(query.categories)]
                    }
                }
            )
        }


        if (!isEmpty(query.minPrice)) {
            conditions.push(
                {
                    price: {
                        [Op.gte]: Number(query.minPrice)
                    }
                }
            )

        }

        if (!isEmpty(query.maxPrice)) {
            conditions.push(
                {
                    price: {
                        [Op.lte]: Number(query.maxPrice)
                    }
                }
            )
        }

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            await Product.findAll(
                {

                    where: isEmpty(conditions) ? undefined : {
                        [Op.and]: conditions
                    },
                    order: isEmpty(query.price) ? undefined : [
                        ["price", query.price.toUpperCase()]
                    ]
                }
            ),
            "Product fetched successfully."
        )
    }

    /**
     * Get product by id
     * @param {number} id
     * @returns {Promise<JsonResult>}
     */
    static async findById(id) {
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            await Product.findOne(
                {
                    where: {
                        id
                    },
                    include: {
                        model: Category,
                        as: "category",
                    }
                }
            ),
            "Product fetched successfully."
        )
    }
}

module.exports = {
    ProductService
}
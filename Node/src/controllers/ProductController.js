const { JoiValidator } = require("@src/validations/JoiValidator");
const { ProductService } = require("@services/ProductService");
const { ProductSchema } = require("@src/validations/Product/Product");
const { SlugSchema } = require("@src/validations/Slug/Slug");
const { isArray } = require("lodash");

class ProductController {
    /*
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async getAll(request, response) {
        const categories = request.query.category;
        const price = request.query.price;
        const minPrice = request.query.minPrice;
        const maxPrice = request.query.maxPrice;
        const search = request.query.search
        const params = {
            categories: categories,
            price,
            minPrice,
            maxPrice,
            search
        };

        (await ProductService.findAll(params)).send(response)
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */

    static async create(request, response) {
        (await ProductService.create(JoiValidator.validate(request.body, ProductSchema))).send(response)
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */

    static async update(request, response) {
        (await ProductService.update(JoiValidator.validate(request.body, ProductSchema))).send(response)
    }

    /*
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async getBySlug(request, response) {
        const { slug } = JoiValidator.validate(request.query, SlugSchema);
        (await ProductService.findById(parseInt(slug))).send(response)
    }
}

module.exports = {
    ProductController
}
const {JoiValidator} = require("@src/validations/JoiValidator");
const {CategoryService} = require("@services/CategoryService");
const {CategorySchema} = require("@src/validations/Category/Category");

class CategoryController {
    /*
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async getCategories(request, response) {
        (await CategoryService.findAll()).send(response)
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */

    static async create(request, response) {
        (await CategoryService.create(JoiValidator.validate(request.body, CategorySchema))).send(response)
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */

    static async update(request, response) {
        (await CategoryService.update(JoiValidator.validate(request.body, CategorySchema))).send(response)
    }
}

module.exports = {
    CategoryController
}
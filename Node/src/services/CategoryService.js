const {JsonResult} = require("@helpers/JsonResult");
const {HTTP_CODE} = require("@helpers/HttpStatus");
const {findOne, Category} = require("@models/Category/CategoryModel");
const {isNull} = require("lodash");


class CategoryService {


    /**
     * Create category
     * @param {CategoryDTO} dto
     * @returns {Promise<JsonResult>}
     */
    static async create(dto){
        return JsonResult.builder(
            HTTP_CODE.CREATED,
            HTTP_CODE.CREATED,
            await Category.create(dto),
            "Category created successfully."
        )
    }

    /**
     * Update category
     * @param {CategoryDTO} dto
     * @returns {Promise<JsonResult>}
     */
    static async update(dto){
        const category = await Category.findByPk(dto.id)

        if (isNull(category)) {
            return JsonResult.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.NOT_FOUND,
                null,
                "Category not found."
            )
        }

        category.set(dto)
        await category.save()

        return JsonResult.builder(
            HTTP_CODE.CREATED,
            HTTP_CODE.CREATED,
            category.toJSON(),
            "Category update successfully."
        )
    }

    /**
     * Get all categories
     * @returns {Promise<JsonResult>}
     */
    static async findAll(){
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            await Category.findAll(),
            "Categories fetched successfully."
        )
    }
}

module.exports = {
    CategoryService
}
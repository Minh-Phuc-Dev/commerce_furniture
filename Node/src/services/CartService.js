const User = require("@models/User/UserModel");
const {JsonResult} = require("@helpers/JsonResult");
const {HTTP_CODE, HTTP_REASON} = require("@helpers/HttpStatus");
const {ProductCart} = require("@models/ProductCart/ProductCartModel");
const {isNull} = require("lodash");
const {Product} = require("@models/Product/ProductModel");


class CartService {
    /**
     * Add product to cart
     * @async
     * @static
     * @param {number} id - User id
     * @param {ProductCartDTO} dto
     * @returns {Promise<JsonResult>}
     */
    static async addProduct(id, dto) {
        const item = await ProductCart.findOne(
            {
                where: {
                    userId: id,
                    productId: dto.productId
                }
            }
        )

        if (isNull(item)) {
            await ProductCart.create(
                {
                    userId: id,
                    productId: dto.productId,
                    quantity: dto.quantity
                }
            )
        } else {
            item.set(
                "quantity",
                item.getDataValue("quantity") + dto.quantity
            )
            await item.save()
        }
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            item,
            "Add item successfully."
        )
    }

    /**
     * Get cart
     * @async
     * @static
     * @param {number} id - User id
     * @returns {Promise<JsonResult>}
     */
    static async get(id) {
        const items = await ProductCart.findAll(
            {
                where: {
                    userId: id,
                },
                include: [
                    {
                        model: Product,
                        as: "product"
                    }
                ]
            }
        )

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            items,
            "Add item successfully."
        )
    }

    /**
     * Add product to cart
     * @async
     * @static
     * @param {number} id - User id
     * @param {ProductCartDTO} dto
     * @returns {Promise<JsonResult>}
     */
    static async removeProduct(id, dto) {
        const item = await ProductCart.findOne(
            {
                where: {
                    userId: id,
                    productId: dto.productId
                }
            }
        )

        if (isNull(item)) {
            return JsonResult.builder(
                HTTP_CODE.OK,
                HTTP_CODE.OK,
                item,
                "Remove item successfully."
            )
        }
        const quantity = Math.max(item.getDataValue("quantity") - dto.quantity, 0)

        if (quantity < 1) {
            await item.destroy()
        } else {
            item.set(
                "quantity",
                quantity
            )
            await item.save()
        }

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            item,
            "Remove item successfully."
        )
    }
}

module.exports = {
    CartService
}
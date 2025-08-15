const {CartService} = require("@services/CartService");
const {JoiValidator} = require("@src/validations/JoiValidator");
const {AuthenticateContext} = require("@middleware/Authenticate");
const {ProductCartSchema} = require("@src/validations/Cart/ProductCart");

class CartController {
    /*
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async addProduct(request, response) {
        (
            await CartService.addProduct(
                AuthenticateContext.getStore().id,
                JoiValidator.validate(request.body, ProductCartSchema)
            )
        ).send(response)
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */

    static async removeProduct(request, response) {
        (
            await CartService.removeProduct(
                AuthenticateContext.getStore().id,
                JoiValidator.validate(request.body, ProductCartSchema)
            )
        ).send(response)
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */

    static async get(request, response) {
        (await CartService.get(AuthenticateContext.getStore().id)).send(response)
    }
}

module.exports = {
    ProductCartController: CartController
}
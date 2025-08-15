const {JoiValidator} = require("@src/validations/JoiValidator");
const {AuthenticateContext} = require("@middleware/Authenticate");
const {OrderService} = require("@services/OrderService");
const {OrderSchema} = require("@src/validations/Order/Order");
const {UpdateOrderSchema} = require("@src/validations/Order/UpdateOrderStatus");

class OrderController {
    /*
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async addOrder(request, response) {
        (
            await OrderService.createOrder(
                AuthenticateContext.getStore().id,
                JoiValidator.validate(request.body, OrderSchema)
            )
        ).send(response)
    }

    /*
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async updateOrderStatus(request, response) {
        (
            await OrderService.updateOrder(
                JoiValidator.validate(request.body, UpdateOrderSchema)
            )
        ).send(response)
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */

    static async get(request, response) {
        (await OrderService.get(AuthenticateContext.getStore().id)).send(response)
    }
}

module.exports = {
    OrderController
}
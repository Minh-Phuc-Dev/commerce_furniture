const {JsonResult} = require("@helpers/JsonResult");
const {HTTP_CODE} = require("@helpers/HttpStatus");
const {ProductCart} = require("@models/ProductCart/ProductCartModel");
const {isNull, isEmpty} = require("lodash");
const {Op} = require("sequelize");
const {Order} = require("@models/Order/OrderModel");
const {Product} = require("@models/Product/ProductModel");
const {OrderItem} = require("@models/OrderItem/OrderItemModel");
const {VNPayService} = require("@services/VNPayService");



class OrderService {
    /**
     * Create order
     * @async
     * @static
     * @param {number} id - User id
     * @param {OrderDTO} dto
     * @returns {Promise<JsonResult>}
     */
    static async createOrder(id, dto) {
        const items = await ProductCart.findAll(
            {
                where: {
                    userId: id,
                    productId: {
                        [Op.in]: dto.products
                    }
                },
                include: {
                    model: Product,
                    as: "product",
                    attributes: ["id", "name", "price"]
                }
            }
        )

        if (isEmpty(items)) {
            return JsonResult.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.BAD_REQUEST,
                null,
                "No items found in cart."
            )
        }

        const totalAmount = items.reduce(
            (total, item) => total + (item.quantity * item.product.price),
            0
        )

        const order = await Order.create(
            {
                userId: id,
                status: "PENDING",
                attributes: dto.attributes,
                totalAmount,
                meta: {
                    paymentMethod: dto.paymentMethod,
                    paymentStatus: "PENDING"
                }
            }
        )

        for (const item of items) {
            await OrderItem.create(
                {
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price
                }
            )
            await item.destroy()
        }

        if (dto.paymentMethod === "VNPAY") {
            return  JsonResult.builder(
                HTTP_CODE.OK,
                HTTP_CODE.CONTINUE,
                await VNPayService.generateUrl(totalAmount),
                "Add item successfully."
            )
        }

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            order.getDataValue(),
            "Add item successfully."
        )
    }

    /**
     * Get order
     * @async
     * @static
     * @param {number} id - User id
     * @returns {Promise<JsonResult>}
     */
    static async get(id) {
        const items = await Order.findAll(
            {
                where: {
                    userId: id,
                },
                include: [
                    {
                        model: OrderItem,
                        as: "items",
                        include: {
                            model: Product,
                            as: "product",
                            attributes: ["id", "name", "price", "attributes"]
                        }
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
     * Update order status
     * @async
     * @static
     * @param {UpdateOrderSttausDTO} dto
     * @returns {Promise<JsonResult>}
     */
    static async updateOrder(dto) {
        const {id, status} = dto
        const item = await Order.findOne(
            {
                where: {
                     id
                }
            }
        )

        if (isNull(item)) {
            return JsonResult.builder(
                HTTP_CODE.OK,
                HTTP_CODE.NO_CONTENT,
                item,
                "No change"
            )
        }

        item.set("status", status)
        await item.save()

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            item,
            "Request successfully."
        )
    }
}

module.exports = {
    OrderService
}
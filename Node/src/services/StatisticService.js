const {JsonResult} = require("@helpers/JsonResult");
const {HTTP_CODE} = require("@helpers/HttpStatus");
const {Order} = require("@models/Order/OrderModel");
const {isArray, isUndefined} = require("lodash");
const {Op} = require("sequelize");
const {OrderItem} = require("@models/OrderItem/OrderItemModel");
const {Product} = require("@models/Product/ProductModel");
const {Category} = require("@models/Category/CategoryModel");

class StatisticService {

    static async orderStatistic() {
        const orders = await Order.findAll()

        const statistic = orders.reduce(
            (statistic, order) => {
                statistic.total += 1
                if (order.status === "PENDING") {
                    statistic.pending += 1
                    return statistic
                }

                if (order.status === "COMPLETED") {
                    statistic.completed += 1
                    return statistic
                }

                if (order.status === "CANCELED") {
                    statistic.cancelled += 1
                    return statistic
                }

                statistic.processing += 1
                return statistic
            },
            {
                total: 0,
                pending: 0,
                completed: 0,
                cancelled: 0,
                processing: 0
            }
        )


        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            statistic,
            "Order statistic successfully fetched."
        )
    }

    static async orderStatisticGroupByDate() {
        const orders = await Order.findAll().then(
            (orders) => orders.reduce(
                (statistic, order) => {
                    const month = new Date(order.getDataValue("createdAt")).toLocaleString('default', {month: 'short'})
                    if (isArray(statistic[month])) {
                        statistic[month].push(order.toJSON())
                        return statistic
                    }
                    statistic[month] = [order.toJSON()]
                    return statistic
                },
                {}
            )
        )

        const data = Object.keys(orders).reduce(
            (statistic, month) => {
                statistic[month] = orders[month].reduce(
                    (statistic, order) => {
                        statistic.total += 1
                        if (order.status === "PENDING") {
                            statistic.pending += 1
                            return statistic
                        }

                        if (order.status === "COMPLETED") {
                            statistic.completed += 1
                            return statistic
                        }

                        if (order.status === "CANCELED") {
                            statistic.cancelled += 1
                            return statistic
                        }

                        statistic.processing += 1
                        return statistic
                    },
                    {
                        label: month,
                        total: 0,
                        pending: 0,
                        completed: 0,
                        cancelled: 0,
                        processing: 0
                    }
                )
                return statistic
            },
            {}
        )


        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            Object.values(data),
            "Order statistic successfully fetched."
        )
    }

    static async topSellingProducts() {
        const orders = await Order.findAll(
            {
                where: {
                    status: "COMPLETED"
                }
            }
        ).then(
            (orders) => orders.map(
                (order) => order.toJSON().id
            )
        )

        const items = (
            await OrderItem.findAll(
                {
                    where: {
                        orderId: {
                            [Op.in]: orders
                        }
                    },
                    attributes: ["productId", 'quantity']
                }
            )
        ).reduce(
            (items, item) => {
                const {productId, quantity} = item.toJSON()
                if (isUndefined(items[productId])) {
                    items[productId] = quantity
                    return items
                }
                items[productId] = items[productId] + quantity
                return items
            },
            {}
        )

        const products = await Product.findAll(
            {
                where: {
                    id: {
                        [Op.in]: Object.keys(items)
                    }
                }
            }
        ).then(
            (products) => products.map(
                (product) => (
                    {
                        ...product.toJSON(),
                        quantity: items[product.toJSON().id],
                    }
                )
            )
        )

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            products,
            "Top selling products successfully fetched."
        )
    }

    static async orders() {
        const orders = await Order.findAll(
            {
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
            orders,
            "Order statistic successfully fetched."
        )
    }

}

module.exports = {
    StatisticService
}
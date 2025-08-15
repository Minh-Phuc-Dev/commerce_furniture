const {OrderItem} = require("@models/OrderItem/OrderItemModel");
const {Order} = require("@models/Order/OrderModel");
const {Product} = require("@models/Product/ProductModel");

OrderItem.belongsTo(
    Order,
    {
        as: "order",
        foreignKey: "orderId"
    }
)

OrderItem.belongsTo(
    Product,
    {
        as: "product",
        foreignKey: "productId"
    }
)
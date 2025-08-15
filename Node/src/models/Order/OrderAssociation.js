const User = require("@models/User/UserModel");
const {Order} = require("@models/Order/OrderModel");
const {Product} = require("@models/Product/ProductModel");
const {OrderItem} = require("@models/OrderItem/OrderItemModel");


Order.belongsTo(
    User,
    {
        as: "user",
        foreignKey: "userId"
    }
)

Order.hasMany(
    OrderItem,
    {
        as: "items",
        foreignKey: "orderId"
    }
)
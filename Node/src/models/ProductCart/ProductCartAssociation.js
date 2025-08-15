const {ProductCart} = require("@models/ProductCart/ProductCartModel");
const {Product} = require("@models/Product/ProductModel");
const User = require("@models/User/UserModel");
ProductCart.belongsTo(
    Product,
    {
        as: "product",
        foreignKey: "productId"
    }
)

ProductCart.belongsTo(
    User,
    {
        as: "user",
        foreignKey: "userId"
    }
)
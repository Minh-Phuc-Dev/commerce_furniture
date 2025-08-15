const { Product } = require("@models/Product/ProductModel");

const { Category } = require("@models/Category/CategoryModel");
Product.belongsTo(
    Category,
    {
        as: "category",
        foreignKey: "categoryId"
    }
)


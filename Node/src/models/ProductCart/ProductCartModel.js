const { DataTypes, Model } = require("sequelize");
const { Postgres } = require("@databases/SequelizePostgres");

const MODEL = "ProductCart";
const TABLE = "product_carts";

/**
 * @typedef {Object} ProductCartModel
 * @property {number} [id] - The unique identifier for the product cart entry.
 * @property {number} categoryId - The ID of the category.
 * @property {number} productId - The ID of the product.
 * @property {number} quantity - The quantity of the product in the cart.
 * @property {Object} [attributes] - Additional attributes of the product in the cart stored as JSON.
 * @property {Object} [meta] - Metadata about the product in the cart stored as JSON.
 * @property {Date} createdAt - The timestamp when the product cart entry was created.
 * @property {Date} [updatedAt] - The timestamp when the product cart entry was last updated.
 */

/**
 * Represents a product cart entry in the database.
 * @class ProductCart
 * @extends Model
 * @property {number} id - The unique identifier for the product cart entry.
 * @property {number} categoryId - The ID of the category.
 * @property {number} productId - The ID of the product.
 * @property {number} quantity - The quantity of the product in the cart.
 * @property {Object} [attributes] - Additional attributes of the product in the cart stored as JSON.
 * @property {Object} [meta] - Metadata about the product in the cart stored as JSON.
 * @property {Date} createdAt - The timestamp when the product cart entry was created.
 * @property {Date} [updatedAt] - The timestamp when the product cart entry was last updated.
 */
class ProductCart extends Model {}

ProductCart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        attributes: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        meta: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updated_at',
        }
    },
    {
        tableName: TABLE,
        modelName: MODEL,
        timestamps: true,
        underscored: true,
        sequelize: Postgres
    }
);

module.exports = {ProductCart};
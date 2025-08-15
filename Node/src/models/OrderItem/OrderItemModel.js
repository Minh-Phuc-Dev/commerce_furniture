const { INTEGER, DECIMAL, JSON, DATE, Model } = require("sequelize");
const { Postgres } = require("@databases/SequelizePostgres");

const MODEL = "OrderItems"
const TABLE = "order_items"

/**
 * @typedef {Object} OrderItemModel
 * @property {number} [id] - Order item id
 * @property {number} orderId - Order id
 * @property {number} productId - Product id
 * @property {number} quantity - Quantity of the product
 * @property {number} price - Price of the product
 * @property {Object} [attributes] - Order item attributes
 * @property {Object} [meta] - Order item meta
 * @property {Date} createdAt - Order item created at
 * @property {Date} [updatedAt] - Order item updated at
 */

/**
 * Represents an order item in the database.
 * @class OrderItem
 * @extends Model
 * @property {number} id - The unique identifier for the order item.
 * @property {number} orderId - The ID of the order this item belongs to.
 * @property {number} productId - The ID of the product in this order item.
 * @property {number} quantity - The quantity of the product ordered.
 * @property {number} price - The price of the product at the time of order.
 * @property {Object} [attributes] - Additional attributes of the order item stored as JSON.
 * @property {Object} [meta] - Metadata about the order item stored as JSON.
 * @property {Date} createdAt - The timestamp when the order item was created.
 * @property {Date} [updatedAt] - The timestamp when the order item was last updated.
 */

class OrderItem extends Model {}

OrderItem.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderId: {
            type: INTEGER,
            allowNull: false,
        },
        productId: {
            type: INTEGER,
            allowNull: false,
        },
        quantity: {
            type: INTEGER,
            allowNull: false,
        },
        price: {
            type: DECIMAL(10, 2),
            allowNull: false,
        },
        attributes: {
            type: JSON,
            allowNull: true,
        },
        meta: {
            type: JSON,
            allowNull: true,
        },
        createdAt: {
            type: DATE,
            allowNull: false
        },
        updatedAt: {
            type: DATE,
            allowNull: true,
        },
    },
    {
        tableName: TABLE,
        modelName: MODEL,
        underscored: true,
        sequelize: Postgres,
    }
);

module.exports = { OrderItem };
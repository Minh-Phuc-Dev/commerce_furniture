const { STRING, INTEGER, DECIMAL, JSON, DATE, Model } = require("sequelize");
const { Postgres } = require("@databases/SequelizePostgres");

const MODEL = "Orders"
const TABLE = "orders"

/**
 * @typedef {Object} OrderModel
 * @property {number} [id] - Order id
 * @property {number} userId - User id
 * @property {string} status - Order status
 * @property {number} totalAmount - Total order amount
 * @property {Object} [attributes] - Order attributes
 * @property {Object} [meta] - Order meta
 * @property {Date} createdAt - Order created at
 * @property {Date} [updatedAt] - Order updated at
 */

/**
 * Represents an order in the database.
 * @class Order
 * @extends Model
 * @property {number} id - The unique identifier for the order.
 * @property {number} userId - The ID of the user who placed the order.
 * @property {string} status - The current status of the order.
 * @property {number} totalAmount - The total amount of the order.
 * @property {Object} [attributes] - Additional attributes of the order stored as JSON.
 * @property {Object} [meta] - Metadata about the order stored as JSON.
 * @property {Date} createdAt - The timestamp when the order was created.
 * @property {Date} [updatedAt] - The timestamp when the order was last updated.
 */

class Order extends Model {}

Order.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: INTEGER,
            allowNull: false,
        },
        status: {
            type: STRING(255),
            allowNull: false,
        },
        totalAmount: {
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
            allowNull: false,
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

module.exports = { Order };
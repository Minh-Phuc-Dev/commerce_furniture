const { STRING, INTEGER, DECIMAL, TEXT, FLOAT, JSON, DATE, Model } = require("sequelize");
const { Postgres } = require("@databases/SequelizePostgres");

const MODEL = "Product";
const TABLE = "products";

/**
 * @typedef {Object} ProductModel
 * @property {number} [id] - Product id
 * @property {number} categoryId - Category id
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {number} [oldPrice] - Product old price
 * @property {string} [status] - Product status
 * @property {string} [sku] - Product SKU
 * @property {string} [description] - Product description
 * @property {number} quantity - Product quantity
 * @property {number} [rating] - Product rating
 * @property {Object} [attributes] - Product attributes
 * @property {Object} [meta] - Product meta
 * @property {Date} createdAt - Product created at
 * @property {Date} [updatedAt] - Product updated at
 */

/**
 * Represents a product in the database.
 * @class Product
 * @extends Model
 * @property {number} id - The unique identifier for the product.
 * @property {number} categoryId - The ID of the category this product belongs to.
 * @property {string} name - The name of the product.
 * @property {number} price - The current price of the product.
 * @property {number} [oldPrice] - The previous price of the product, if applicable.
 * @property {string} [status] - The current status of the product (e.g., 'in stock', 'out of stock').
 * @property {string} [sku] - The Stock Keeping Unit (SKU) for the product.
 * @property {string} [description] - A detailed description of the product.
 * @property {number} quantity - The current quantity of the product in stock.
 * @property {number} [rating] - The average rating of the product, if applicable.
 * @property {Object} [attributes] - Additional attributes of the product stored as JSON.
 * @property {Object} [meta] - Metadata about the product stored as JSON.
 * @property {Date} createdAt - The timestamp when the product was created.
 * @property {Date} [updatedAt] - The timestamp when the product was last updated.
 */

class Product extends Model {}

Product.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        categoryId: {
            type: INTEGER,
            allowNull: true,
        },
        name: {
            type: STRING(255),
            allowNull: false,
        },
        price: {
            type: DECIMAL(10, 2),
            allowNull: false,
        },
        oldPrice: {
            type: DECIMAL(10, 2),
            allowNull: true,
        },
        status: {
            type: STRING(255),
            allowNull: true,
        },
        sku: {
            type: STRING(255),
            allowNull: true,
        },
        description: {
            type: TEXT,
            allowNull: true,
        },
        quantity: {
            type: INTEGER,
            defaultValue: 0,
        },
        rating: {
            type: FLOAT,
            allowNull: true,
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
            field: 'created_at',
        },
        updatedAt: {
            type: DATE,
            allowNull: true,
            field: 'updated_at',
        },
    },
    {
        tableName: TABLE,
        modelName: MODEL,
        underscored: true,
        sequelize: Postgres,
    }
);

module.exports = { Product };
const { STRING, INTEGER, JSON, Model, DATE } = require("sequelize");
const { Postgres } = require("@databases/SequelizePostgres");

const MODEL = "Category";
const TABLE = "categories";

/**
 * @typedef {Object} CategoryModel
 * @property {number} [id] - Category id
 * @property {string} name - Category name
 * @property {Object} attributes - Category attributes
 * @property {Object} meta - Category meta
 * @property {string} createdAt - Category created at
 * @property {string} [updatedAt] - Category updated at
 */

/**
 * @class Category
 * @property {number} [id] - Category id
 * @property {string} name - Category name
 * @property {Object} attributes - Category attributes
 * @property {Object} meta - Category meta
 * @property {string} createdAt - Category created at
 * @property {string} [updatedAt] - Category updated at
 */
class Category extends Model {}

Category.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: STRING(255),
            allowNull: false,
        },
        attributes: {
            type: JSON,
            allowNull: true,
            defaultValue: {},
        },
        meta: {
            type: JSON,
            allowNull: true,
            defaultValue: {},
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

module.exports = {Category};
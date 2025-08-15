const { STRING, INTEGER, JSON, Model } = require("sequelize");
const { Postgres } = require("@databases/SequelizePostgres");

const MODEL = "User";
const TABLE = "users";

/**
 * @typedef {Object} UserModel
 * @property {number} [id] - User id
 * @property {string} password - User password
 * @property {string} email - User email
 * @property {string} role - User role
 * @property {string} displayName - User display name
 * @property {Object} attributes - User attributes
 * @property {Object} meta - User meta
 * @property {string} [createdAt] - User created at
 * @property {string} [updatedAt] - User updated at
 */

/**
 * @class User
 * @extends Model<UserModel,UserModel>
 * @property {number} [id] - User id
 * @property {string} password - User password
 * @property {string} email - User email
 * @property {string} role - User role
 * @property {string} displayName - User display name
 * @property {Object} attributes - User attributes
 * @property {Object} meta - User meta
 * @property {string} [createdAt] - User created at
 * @property {string} [updatedAt] - User updated at
 */
class User extends Model { }

User.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: STRING,
            allowNull: false,
        },
        role: {
            type: STRING,
            allowNull: false,
        },
        displayName: {
            type: STRING,
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
    },
    {
        tableName: TABLE,
        modelName: MODEL,
        underscored: true,
        sequelize: Postgres,
    }
);

module.exports = User;
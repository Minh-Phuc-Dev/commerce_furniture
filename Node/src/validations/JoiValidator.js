const {builder} = require("@exceptions/ExceptionBuilder");
const {HTTP_CODE} = require("@helpers/HttpStatus");

class JoiValidator {
    /**
     * Validates input values against a Joi validation schema.
     * @template T - The type of the values, based on the Joi schema.
     * @param {any} values - The input values to validate.
     * @param {import('joi').Schema<T>} schema - The Joi validation schema.
     * @param {import('joi').ValidationOptions} [options] - Joi validation options.
     * @returns {T} The validated values matching the schema.
     */
    static validate(values, schema, options = {stripUnknown: true}) {
        const { error, value } = schema.validate(values, options)
        if (error) {
            throw builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.BAD_REQUEST,
                "Validation error.",
                error,
                error.details,
                error.stack
            )
        }
        return value
    }
}

module.exports = { JoiValidator }
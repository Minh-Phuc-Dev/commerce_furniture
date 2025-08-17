const ExceptionBuilder = require('@exceptions/ExceptionBuilder');
const { AsyncLocalStorage } = require('node:async_hooks');

/**
 * @param {Error} error
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */

const errorHandle = (error, request, response, next) => {

    if (error instanceof ExceptionBuilder) {
        return response.status(typeof error.code === "number" ? error.code : 500).send(
            error
        )
    }

    response.status(500).send(
        {
            message: "Internal Server Error",
            error: error
        }
    )
}

module.exports = {
    errorHandle
}


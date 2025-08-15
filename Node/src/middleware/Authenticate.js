const { AsyncLocalStorage } = require('node:async_hooks');
const {verify, decode} = require("jsonwebtoken");
const {HTTP_CODE} = require("@helpers/HttpStatus");

const JWT_SECRET = process.env.JWT_SECRET

const AuthenticateContext = new AsyncLocalStorage();

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */

const authenticate = (request, response, next) => {
    const session = request.cookies?.session
    try {
        verify(
            session,
            JWT_SECRET
        )
        const {sub} = decode(session);

        AuthenticateContext.run(
            {id: sub},
            next
        )
    }catch {
        response.status(HTTP_CODE.UNAUTHORIZED).send()
    }

}

module.exports = {
    authenticate,
    AuthenticateContext
}


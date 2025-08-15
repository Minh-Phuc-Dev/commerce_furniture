const { JoiValidator } = require("@src/validations/JoiValidator");
const { RegisterSchema } = require("@src/validations/Authenticate/Register");
const { AuthenticationService } = require("@services/AuthenticationService");
const { LoginSchema } = require("@src/validations/Authenticate/Login");
const { isEmpty, omit } = require("lodash");
const { JsonResult } = require("@helpers/JsonResult");
const { HTTP_CODE, HTTP_REASON } = require("@helpers/HttpStatus");
const { sign, verify, decode } = require("jsonwebtoken");
const { AuthenticateContext } = require("@middleware/Authenticate");
const { ForgetSchema, ResetPasswordSchema } = require("@src/validations/Authenticate/Forget");

const JWT_SECRET = process.env.JWT_SECRET

class AuthenticateController {
    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async login(request, response) {

        const user = await AuthenticationService.login(
            JoiValidator.validate(request.body, LoginSchema)
        )

        if (isEmpty(user)) {
            JsonResult.builder(
                HTTP_CODE.UNAUTHORIZED,
                HTTP_CODE.UNAUTHORIZED,
                null,
                HTTP_REASON.UNAUTHORIZED
            ).send(response)
            return
        }

        const session = sign(
            {
                sub: user.id,
                role: user.role
            },
            JWT_SECRET,
            {
                expiresIn: "15d"
            }
        )
        response.cookie(
            "session",
            session,
            {
                httpOnly: true,
                path: "/"
            }
        )

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            user,
            HTTP_REASON.OK
        ).send(response)
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async credential(request, response) {
        (await AuthenticationService.credential(AuthenticateContext.getStore().id)).send(response)
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async forget(request, response) {
        const dto = JoiValidator.validate(request.body, ForgetSchema);
        (await AuthenticationService.forget(dto)).send(response);
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async resetPassword(request, response) {
        const dto = JoiValidator.validate(request.body, ResetPasswordSchema);
        const jsonResult = await AuthenticationService.resetPassword(dto)

        if (jsonResult.code === HTTP_CODE.OK) {
            const session = sign(
                {
                    sub: jsonResult.payload.id,
                    role: jsonResult.payload.role
                },
                JWT_SECRET,
                {
                    expiresIn: "15d"
                }
            )
            response.cookie(
                "session",
                session,
                {
                    httpOnly: true,
                    path: "/"
                }
            )
        }

        jsonResult.send(response);
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */

    static async register(request, response) {
        (await AuthenticationService.register(JoiValidator.validate(request.body, RegisterSchema))).send(response)
    }

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */

    static async logout(request, response) {
        response.clearCookie("session")
        response.send(
            JsonResult.builder(
                HTTP_CODE.OK,
                HTTP_CODE.OK,
                null,
                HTTP_REASON.OK
            )
        )
    }
}

module.exports = {
    AuthenticateController
}
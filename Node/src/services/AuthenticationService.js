const User = require("@models/User/UserModel");
const { JsonResult } = require("@helpers/JsonResult");
const { HTTP_CODE, HTTP_REASON } = require("@helpers/HttpStatus");
const { isNull } = require("lodash");
const ExceptionBuilder = require("@exceptions/ExceptionBuilder");
const { UserOTP } = require("@models/UserOTP/UserOTPModel");
const nodemailer = require("nodemailer");
const { use } = require("@routers/Authenicate");

const transporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    }
);
class AuthenticationService {
    /**
     * Register a new user
     * @async
     * @static
     * @param {RegisterDTO} dto
     * @returns {Promise<JsonResult>}
     */
    static async register(dto) {
        const user = await User.create(
            {
                role: "USER",
                email: dto.email,
                password: dto.password,
                displayName: dto.displayName
            }
        )
        return JsonResult.builder(
            HTTP_CODE.CREATED,
            HTTP_CODE.CREATED,
            user,
            "User created successfully."
        )
    }

    /**
     * @async
     * @static
     * @param {ForgetDTO} dto
     * @returns {Promise<JsonResult>}
     */
    static async forget(dto) {
        const { email } = dto;
        const user = await User.findOne(
            { where: { email } }
        );

        if (isNull(user)) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.NOT_FOUND,
                "User not found."
            )
        }


        const existOtp = await UserOTP.findOne(
            { where: { userId: user.getDataValue("id") } }
        )


        if (!isNull(existOtp)) {
            await existOtp.destroy();
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        await UserOTP.create(
            {
                userId: user.getDataValue("id"),
                email: user.getDataValue("email"),
                otp: otpCode,
                expiredAt: new Date(Date.now() + 15 * 60 * 1000)
            }
        );

        await transporter.sendMail(
            {
                from: process.env.MAIL_USERNAME,
                to: email,
                subject: "🔐 Xác nhận mã OTP của bạn",
                text: `Mã OTP của bạn là: ${otpCode}. Mã này sẽ hết hạn sau 15 phút.`
            }
        );

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            { email },
            "Forget password request received."
        )
    }


    /**
 * @async
 * @static
 * @param {ResetPasswordDTO} dto
 * @returns {Promise<JsonResult>}
 */
    static async resetPassword(dto) {
        const { email, otp, password } = dto;
        const userOTP = await UserOTP.findOne(
            { where: { email } }
        );

        if (isNull(userOTP)) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.NOT_FOUND,
                "User not found."
            )
        }


        if (userOTP.getDataValue("otp") !== otp) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.UNAUTHORIZED,
                "Invalid OTP."
            )
        }


        if (new Date(userOTP.getDataValue("expiredAt")).getTime() < new Date().getTime()) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.GONE,
                "OTP expired."
            )
        }

        const user = await User.findByPk(userOTP.getDataValue("userId"));
        user?.setDataValue("password", password);
        await user?.save();
        await userOTP.destroy();
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            { id: user.getDataValue("id"), role: user.getDataValue("role"), email: user.getDataValue("email") },
            "Password reset successfully."
        )
    }


    static async login(dto) {
        return await User.findOne(
            {
                where: { email: dto.email, password: dto.password },
                attributes: {
                    exclude: "password"
                }
            }
        ).then(
            user => user?.toJSON()
        )
    }

    static async credential(id) {
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            await User.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: "password"
                }
            }
            ).then(
                user => user ? user.toJSON() : null
            ),
            HTTP_REASON.OK
        )
    }
}

module.exports = {
    AuthenticationService
}
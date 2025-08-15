const User = require("@models/User/UserModel");
const { JsonResult } = require("@helpers/JsonResult");
const { HTTP_CODE } = require("@helpers/HttpStatus");


class ProfileService {
    /**
     * Register a new user
     * @async
     * @static
     * @param {ProfileDTO} dto
     * @returns {Promise<JsonResult>}
     */
    static async profile(dto) {
        const user = await User.findOne(
            {
                where: {
                    email: dto.email
                }
            }
        );


        user?.set(
            {
                displayName: dto.displayName,
                attributes: {
                    gender: dto.gender,
                    address: dto.address,
                    phone: dto.phone
                }
            }

        )
        await user?.save()
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            user,
            "User update successfully."
        )
    }


}

module.exports = {
    ProfileService
}
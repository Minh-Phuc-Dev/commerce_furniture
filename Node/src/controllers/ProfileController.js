const { JoiValidator } = require("@src/validations/JoiValidator");
const { AuthenticateContext } = require("@middleware/Authenticate");
const { ProfileSchema } = require("@src/validations/Profile/Profile");
const { ProfileService } = require("@services/ProfileService");


class ProfileController {

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async profile(request, response) {
        const payload = JoiValidator.validate(request.body, ProfileSchema);
        (await ProfileService.profile(payload)).send(response)
    }


}

module.exports = {
    ProfileController
}
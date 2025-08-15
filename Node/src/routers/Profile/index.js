const { ProfileController } = require("@controllers/ProfileController");
const { wrapperAsyncHandler } = require("@helpers/ErrorWrapper");
const router = require("express").Router()

router.patch(
    "/profile",
    wrapperAsyncHandler(ProfileController.profile)
)

module.exports = router
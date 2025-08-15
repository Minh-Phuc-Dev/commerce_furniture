const {wrapperAsyncHandler} = require("@helpers/ErrorWrapper");
const {VNPayController} = require("@controllers/VNPayController");
const router = require("express").Router()

router.get(
    "/vn-pay/generate-url",
    wrapperAsyncHandler(VNPayController.generateUrl)
)

router.get(
    "/vn-pay/callback",
    wrapperAsyncHandler(VNPayController.callback)
)


module.exports = router
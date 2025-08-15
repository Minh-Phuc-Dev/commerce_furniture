const {wrapperAsyncHandler} = require("@helpers/ErrorWrapper");
const {OrderController} = require("@controllers/OrderController");
const {authenticate} = require("@middleware/Authenticate");
const router = require("express").Router()

router.post(
    "/orders",
    authenticate,
    wrapperAsyncHandler(OrderController.addOrder)
)

router.get(
    "/orders",
    authenticate,
    wrapperAsyncHandler(OrderController.get)
)

router.patch(
    "/orders/status",
    authenticate,
    wrapperAsyncHandler(OrderController.updateOrderStatus)
)

module.exports = router
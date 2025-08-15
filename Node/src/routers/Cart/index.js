const {wrapperAsyncHandler} = require("@helpers/ErrorWrapper");
const {ProductCartController} = require("@controllers/CartController");
const {authenticate} = require("@middleware/Authenticate");
const router = require("express").Router()

router.post(
    "/cart",
    authenticate,
    wrapperAsyncHandler(ProductCartController.addProduct)
)

router.delete(
    "/cart",
    authenticate,
    wrapperAsyncHandler(ProductCartController.removeProduct)
)

router.get(
    "/cart",
    authenticate,
    wrapperAsyncHandler(ProductCartController.get)
)

module.exports = router
const {wrapperAsyncHandler} = require("@helpers/ErrorWrapper");
const {ProductController} = require("@controllers/ProductController");
const router = require("express").Router()

router.post(
    "/products",
    wrapperAsyncHandler(ProductController.create)
)

router.put(
    "/products",
    wrapperAsyncHandler(ProductController.update)
)

router.get(
    "/products",
    wrapperAsyncHandler(ProductController.getAll)
)

router.get(
    "/product",
    wrapperAsyncHandler(ProductController.getBySlug)
)

module.exports = router
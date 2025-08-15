const {wrapperAsyncHandler} = require("@helpers/ErrorWrapper");
const {CategoryController} = require("@controllers/CategoryController");
const router = require("express").Router()

router.post(
    "/categories",
    wrapperAsyncHandler(CategoryController.create)
)

router.put(
    "/categories",
    wrapperAsyncHandler(CategoryController.update)
)


router.get(
    "/categories",
    wrapperAsyncHandler(CategoryController.getCategories)
)

module.exports = router
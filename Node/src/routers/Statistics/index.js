const {wrapperAsyncHandler} = require("@helpers/ErrorWrapper");
const {authenticate} = require("@middleware/Authenticate");
const {StatisticsController} = require("@controllers/StatisticsController");
const router = require("express").Router()

router.get(
    "/statistics/order",
    authenticate,
    wrapperAsyncHandler(StatisticsController.getOrderStatistics)
)

router.get(
    "/statistics/order/date",
    authenticate,
    wrapperAsyncHandler(StatisticsController.getOrderStatisticGetByDate)
)

router.get(
    "/statistics/products",
    authenticate,
    wrapperAsyncHandler(StatisticsController.getTopSellingProducts)
)

router.get(
    "/statistics/orders",
    authenticate,
    wrapperAsyncHandler(StatisticsController.orders)
)

module.exports = router
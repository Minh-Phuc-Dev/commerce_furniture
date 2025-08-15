const {StatisticService} = require("@services/StatisticService");

class StatisticsController {
    /*
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async getOrderStatistics(request, response) {
        (await StatisticService.orderStatistic()).send(response)
    }

    /*
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async getOrderStatisticGetByDate(request, response) {
        (await StatisticService.orderStatisticGroupByDate()).send(response)
    }

    /*
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async getTopSellingProducts(request, response) {
        (await StatisticService.topSellingProducts()).send(response)
    }

    /*
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async orders(request, response) {
        (await StatisticService.orders()).send(response)
    }
}

module.exports = {
    StatisticsController
}
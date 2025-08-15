const {VNPayService} = require("@services/VNPayService");


class VNPayController {
    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async generateUrl(request, response) {
        (await VNPayService.generateUrl()).send(response)
    }

    static async callback(request, response) {
        console.log(response.query);
        response.status(200).json(
            {
                RspCode: '00',
                Message: 'success'
            }
        )
    }

}

module.exports = {
    VNPayController
}
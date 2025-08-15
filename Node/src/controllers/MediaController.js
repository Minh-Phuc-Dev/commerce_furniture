const multer = require("multer")
const { isEmpty } = require("lodash/lang");
const { JsonResult } = require("@helpers/JsonResult");
const { HTTP_CODE } = require("@helpers/HttpStatus");
const { randomUUID } = require("crypto")
const { JoiValidator } = require("@src/validations/JoiValidator");
const { SlugSchema } = require("@src/validations/Slug/Slug");
const path = require("path")
const fs = require("fs");
const ExceptionBuilder = require("@exceptions/ExceptionBuilder");

class MediaController {
    static #multer = multer(
        {
            storage: multer.diskStorage(
                {
                    destination: path.join(
                        process.cwd(),
                        "/dist/images",
                    ),
                    filename: (request, file, callback) => {
                        const fileName = randomUUID().toString().concat(file.originalname.substring(file.originalname.lastIndexOf(".")))
                        callback(null, fileName)
                    }
                }
            )
        }
    )

    /**
     *
     * @returns {multer.Multer}
     */
    static getMulter() {
        return this.#multer
    }

    /**
     * Multer file upload
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     * @param {import("express").NextFunction} next
     */
    static handleUpload(request, response, next) {
        if (isEmpty(request.files)) {
            next(
                JsonResult(
                    HTTP_CODE.NO_CONTENT,
                    HTTP_CODE.NO_CONTENT,
                    null,
                    "No files were uploaded"
                )
            )
        }
        const { files } = request

        JsonResult.builder(
            HTTP_CODE.CREATED,
            HTTP_CODE.CREATED,
            Array.isArray(files) && files.length > 0 ? files : files.at(-1),
            "No files were uploaded"
        ).send(response)
    }

    /**
     *
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */

    static getMedia(request, response, next) {
        const { slug } = JoiValidator.validate(request.params, SlugSchema)
        const attachmentPath = path.join(
            process.cwd(),
            "/dist/images",
            slug
        )


        if (!fs.existsSync(attachmentPath)) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.NOT_FOUND,
                HTTP_CODE.NOT_FOUND,
                'Requested attachment not found!'
            );
        }

        fs.createReadStream(attachmentPath).pipe(response);
    }


}

module.exports = {
    MediaController
}
const router = require("express").Router()

router.use(require("@routers/Authenicate"))
router.use(require("@routers/Profile"))
router.use(require("@routers/Category"))
router.use(require("@routers/Product"))
router.use(require("@routers/Media"))
router.use(require("@routers/Cart"))
router.use(require("@routers/Order"))
router.use(require("@routers/VNPay"))
router.use(require("@routers/Statistics"))
router.use(require("@routers/Chatbot"))

module.exports = router
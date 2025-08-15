const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')

const crossOrigin = process.env.CROSS_ORIGIN
const origin = (crossOrigin?.startsWith("[") && crossOrigin?.endsWith("]")) ? JSON.parse(crossOrigin) : "*"

app.use(express.json())
app.use(cookieParser())
app.use(
    require('cors')(
        {
            origin,
            credentials: true
        }
    )
)
app.use("/api", require("@routers/index"))
app.use(require("@middleware/Error").errorHandle)

require("@databases/ModelSynchronized")
require("@databases/Chroma").startChroma()

module.exports = {
    app
}

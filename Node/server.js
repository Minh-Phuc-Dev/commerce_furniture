require("module-alias/register")
const path = require("path")
require("dotenv").config(
    {
        path: path.join(__dirname, ".env")
    }
)
const {app} = require("@src/app");
const {Postgres} = require("@databases/SequelizePostgres");
const {User} = require("@models/User/UserModel");

app.listen(
    process.env.PORT,
    () => {
        console.log(`Server running on port ${process.env.PORT}`)
    }
)

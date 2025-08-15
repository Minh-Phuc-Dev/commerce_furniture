const { UserOTP } = require("@models/UserOTP/UserOTPModel");
const User = require("@models/User/UserModel");

UserOTP.belongsTo(
    User,
    {
        as: "user_otp",
        foreignKey: "userId",
    }
)


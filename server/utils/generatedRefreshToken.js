const jwt = require('jsonwebtoken');
const UserModel = require('../models/userSchema');

const generateRefreshToken = async (userId) => {
    if (!process.env.SECRET_KEY_REFRESH_TOKEN) {
        throw new Error("SECRET_KEY_REFRESH_TOKEN not defined in .env");
    }

    const token = await jwt.sign(
        { id: userId },
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: '7d' }
    );

    const updateRefreshToken = await UserModel.updateOne(
        { _id: userId },
        { refresh_token: token }
    );

    return { token, updateRefreshToken };
};

module.exports = generateRefreshToken;

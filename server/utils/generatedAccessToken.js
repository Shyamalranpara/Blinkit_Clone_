const jwt = require('jsonwebtoken');

const generateAccessToken = async (userId) => {
    if (!process.env.SECRET_KEY_ACCESS_TOKEN) {
        throw new Error("SECRET_KEY_ACCESS_TOKEN is not defined in .env");
    }

    const token = await jwt.sign(
        { id: userId },
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: '5h' }
    );
    return token;
};

module.exports = generateAccessToken;

const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({
                message: "Provide token",
                error: true,
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        console.log("Decoded Token:", decode);

        req.userId = decode.id; 
        next(); 

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = auth;

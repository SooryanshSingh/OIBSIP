const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization;

        if (!tokenHeader) {
            return res.status(401).json({
                message: "Login required"
            });
        }

        const token = tokenHeader.split(" ")[1];

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const currentUser = await User.findById(payload.id)
            .select("-password");

        if (!currentUser) {
            return res.status(401).json({
                message: "User does not exist"
            });
        }

        req.user = currentUser;

        next();

    } catch (err) {
        console.log(err);

        return res.status(401).json({
            message: "Authentication failed"
        });
    }
};

module.exports = authMiddleware;

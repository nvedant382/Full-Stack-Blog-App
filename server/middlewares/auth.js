import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false, message: "No token provided"
        })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        console.log(decoded)

        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ success: false, message: "Token expired" });
        }
        return res.status(401).json({ success: false, message: "Invalid Token" })
    }
}
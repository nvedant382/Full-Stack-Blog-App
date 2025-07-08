import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
    const token = req.headers.authorization;

    try {
        jwt.verify(token, process.env.JWT_TOKEN)
        next();
    } catch (error) {
        return res.json({ success: false, message: "Invalid Token" })
    }
}
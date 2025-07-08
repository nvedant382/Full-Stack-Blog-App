import dotenv from 'dotenv'
dotenv.config()

import express from "express"
import cors from "cors"
import connectDB from "./configs/db.js"
import adminRouter from "./routes/adminRoutes.js"
import blogRouter from "./routes/blogRoutes.js"

import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"
import rateLimit from "express-rate-limit";

const app = express()

await connectDB()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
})

// Middlewares
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(limiter);

app.use(express.json())
app.use("/api/admin", adminRouter)
app.use("/api/blog", blogRouter)

app.get("/", (req, res) => {
    res.send("🚀 Backend server is running!");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on " + PORT)
})

export default app;
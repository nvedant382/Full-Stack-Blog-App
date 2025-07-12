import express from "express"
import { adminLogin, adminSignup, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllCommentsAdmin, getDashboard } from "../controllers/adminController.js"
import { getAllBlogComment } from "../controllers/blogController.js"
import { auth } from "../middlewares/auth.js"

const adminRouter = express.Router()

adminRouter.post("/signup", adminSignup)
adminRouter.post("/login", adminLogin)
adminRouter.get("/blogs", auth, getAllBlogsAdmin)
adminRouter.get("/comments", auth, getAllCommentsAdmin)
adminRouter.post("/delete-comment", auth, deleteCommentById)
adminRouter.post("/approve-comment", auth, approveCommentById)
adminRouter.get("/dashboard", auth, getDashboard)

export default adminRouter
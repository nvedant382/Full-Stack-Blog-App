import express from "express"
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllCommentsAdmin, getDashboard } from "../controllers/adminController.js"
import { getAllBlogComment } from "../controllers/blogController.js"
import { auth } from "../middlewares/auth.js"

const adminRouter = express.Router()

adminRouter.post("/login", adminLogin)
adminRouter.get("/blogs", getAllBlogsAdmin)
adminRouter.get("/comments", auth, getAllCommentsAdmin)
adminRouter.post("/delete-comment", auth, deleteCommentById)
adminRouter.post("/approve-comment", auth, approveCommentById)
adminRouter.get("/dashboard", auth, getDashboard)

export default adminRouter
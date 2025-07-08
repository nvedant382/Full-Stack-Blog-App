import express from "express"
import { addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublished, addComment, getAllBlogComment, generateContent } from "../controllers/blogController.js"
import upload from "../middlewares/multer.js"
import { auth } from "../middlewares/auth.js"

const blogRouter = express.Router()

blogRouter.post("/add", upload.single("image"), auth, addBlog)
blogRouter.get("/all", getAllBlogs)
blogRouter.get("/comments", getAllBlogComment)
blogRouter.post("/delete", auth, deleteBlogById)
blogRouter.post("/toggle-publish", auth, togglePublished)
blogRouter.post("/add-comment", addComment)
blogRouter.get("/:blogId", getBlogById)

blogRouter.post("/generate", auth, generateContent)

export default blogRouter
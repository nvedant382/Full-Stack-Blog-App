import ImageKit from 'imagekit';
import imagekit from '../configs/imagekit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog)
        const imageFile = req.file;

        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: "Missing Fields required" })
        }

        const fileBuffer = imageFile.buffer;

        // upload image to cloud
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        // optimization through imagekit url transformation

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto" }, { width: "1280" }, { format: "webp" }
            ]
        })

        const image = optimizedImageUrl;

        await Blog.create({ title, subTitle, description, category, image, isPublished })

        res.json({ success: true, message: "Blog added successsfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
        res.json({ success: true, blogs })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId)

        if (!blog) {
            res.json({ success: false, message: "Blog Not Found" })
        }
        res.json({ success: true, blog })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id)

        // delete all comments associated with blog
        await Comment.deleteMany({ blog: id })

        res.json({ success: true, message: "Blog deleted Successsfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const togglePublished = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();

        res.json({ success: true, message: "Blog status Updated" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Comments
export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({ blog, name, content });
        res.json({ success: true, message: "Comment added for review" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getAllBlogComment = async (req, res) => {
    try {
        const { blogId } = req.query;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        const content = await main("You are a helpful blog-writing assistant. You only write blog-style articles in human-friendly language, and you never write code, scripts, or academic papers. Your tone is casual, clear, and simple. Write a blog on topic " + prompt)
        console.log(content)
        res.json({ success: true, content })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
import jwt from "jsonwebtoken"
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js"
import bcrypt from "bcryptjs";

export const adminSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.json({ success: false, message: "User with this email already exists" })
        }

        const newUser = await User.create({
            name,
            email,
            password,
        })

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_TOKEN,
            { expiresIn: "7h" }
        )

        return res.json({
            success: true,
            message: "Admin registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter both email and password",
            });
        }

        const user = await User.findOne({ email }).select("+password")
        console.log(user)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_TOKEN,
            { expiresIn: "7h" }
        );

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
        }

        res.json({
            success: true,
            message: "Login Successful",
            token,
            user: userData
        })

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({ owner: req.user.id }).sort({ createdAt: -1 })
        res.json({ success: true, blogs })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getAllCommentsAdmin = async (req, res) => {
    try {
        const blogIds = await Blog.find({ owner: req.user.id }).select("_id").lean().then(blogs => blogs.map(b => b._id))

        const comments = await Comment.find({ blog: { $in: blogIds } }).populate("blog").sort({ createdAt: -1 })

        res.json({ success: true, comments })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({ owner: req.user.id }).sort({ createdAt: -1 }).limit(5);

        const blogs = await Blog.find({ owner: req.user.id }).countDocuments();

        const blogIds = await Blog.find({ owner: req.user.id }).select("_id").lean().then(blogs => blogs.map(b => b._id))

        const comments = await Comment.countDocuments({ blog: { $in: blogIds } });

        const drafts = await Blog.find({ owner: req.user.id }).countDocuments({ isPublished: false });

        const dashboardData = {
            recentBlogs, blogs, comments, drafts
        }
        res.json({ success: true, dashboardData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.deleteOne({ _id: id }); // filter object
        res.json({ success: true, message: "Comment deleted successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true })
        res.json({ success: true, message: "Comment approved successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
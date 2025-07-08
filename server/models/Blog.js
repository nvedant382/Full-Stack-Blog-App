import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters"],
        maxlength: [100, "Title cannot exceed 100 characters"],
        unique: true,
    },


    subTitle: {
        type: String,
        required: [true, "A subtitle is required"],
        trim: true,
        maxlength: [150, "Subtitle cannot exceed 150 characters"],
    },

    description: {
        type: String,
        required: [true, "A description is required"],
        minlength: [20, "Description must be at least 20 characters"],
    },

    category: {
        type: String,
        required: [true, "Please select a category"],
        enum: {
            values: ["Startup", "Technology", "Health", "Lifestyle", "Finance", "Science", "Technology"],
            message: "{VALUE} is not a valid category",
        },
    },

    category: {
        type: String,
        required: [true, "Please select a category"],
        enum: {
            values: ["Startup", "Technology", "Health", "Lifestyle", "Finance"],
            message: "{VALUE} is not a valid category",
        },
    },

    image: {
        type: String,
        required: [true, "An image URL is required"],
        match: [
            /^https?:\/\/.*\.(jpeg|jpg|gif|png|svg)$/i,
            "Please enter a valid image URL",
        ],
    },

    isPublished: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

const Blog = mongoose.model('blog', blogSchema)

export default Blog;
import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

const Comment = mongoose.model("comment", commentSchema)

export default Comment;
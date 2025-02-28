import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true
    },
}, { timestamps: true });

const Comment = new mongoose.model("Comment", commentSchema);

export default Comment
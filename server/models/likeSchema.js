import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
}, { timestamps: true });

const Like = new mongoose.model("Like", LikeSchema);

export default Like;
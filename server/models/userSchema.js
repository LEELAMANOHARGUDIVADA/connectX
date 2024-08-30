import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:  true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true,
            unique: true
        },
        posts: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Post"
            },
        ],
        followers: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User"
            },
        ],
        following: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User"
            },
        ],
        
    },
    {
        timestamps: true
    }
);

const User = new mongoose.model("User", userSchema);

export default User
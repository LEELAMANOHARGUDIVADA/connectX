import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        caption: {
            type: String,
            required: true
        },
        postUrl: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        comments:[
            {
                type: mongoose.Types.ObjectId,
                ref: "Comment",
                required: true
            },
        ],
        likes:[
            {
                type: mongoose.Types.ObjectId,
                ref: "Like",
                required: true
            }
        ]

    },
    {
        timestamps: true
    }
)


const Post = new mongoose.model("Post", postSchema);

export default Post
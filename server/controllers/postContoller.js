import Post from "../models/postSchema.js";
import User from "../models/userSchema.js";

//create post
const createPost = async (req,res) => {
    try {
        const { title, caption, user } = req.body;
        console.log("Request Body:", req.body);
        console.log("File:", req.file);
        //check if required fields are provided
        if (!title || !req.file || !caption || !user) {
            return res.status(500).json({ message: "Provide all credentials" });
        }
        //creates new post
        const post = new Post({
            title,
            postUrl: req.file.path,
            caption,
            user
        });
        const savedPost = await post.save();

        await User.findByIdAndUpdate(user, {
            $push: { posts: savedPost }
        })

        return res.status(201).json({ message: "Post created successfully", savedPost });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while creating post", error })
    }
}

//getAllPosts 
const getAllPosts = async(req,res) => {
    try {
        const allposts = await Post.find({}).populate("user").sort({ createdAt: -1 });

        return res.status(200).json({message: "Posts Fetched", allposts})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//getSinglePost
const getSinglePost = async (req,res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate("user");

        if (!post) {
            return res.status(400).json({ message: "Invalid Post Id" });
        }

        return res.status(200).json({ message: "Post Fetched Successfully", post });
        // console.log(post);

    } catch (error) {
        return res.status(500).json({ message: "Error while fetching post", error });
    }
}



export { createPost, getAllPosts, getSinglePost }
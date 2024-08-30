import Like from "../models/likeSchema.js";
import Post from "../models/postSchema.js";

const PostIsLiked = async (req,res) => {
    try {

        
    const { user, post } = req.body;
    //checks whether all input parameters are valid
    if(!user || !post) {
        return res.status(400).json({ message: "Provide all credentials" });
    }

    const userLiked = await Like.findOne({user,post});
    console.log(userLiked);
    if(userLiked) {
        await Like.findByIdAndDelete(userLiked._id);
        await Post.findByIdAndUpdate(userLiked.post, {
            $pull: { likes: userLiked._id }
        } )
        return res.status(200).json({ message: "Unliked Successfully" })
    }

    //create Like 
    const postIsLiked = new Like({
        user, post
    });
    await postIsLiked.save();
    await Post.findByIdAndUpdate(post, {
        $push: { likes: postIsLiked }
    });

    return res.status(201).json({ message: "Liked successlly", postIsLiked })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export { PostIsLiked };
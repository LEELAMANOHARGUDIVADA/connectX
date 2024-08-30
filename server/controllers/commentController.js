import Comment from "../models/commentSchema.js";
import Post from "../models/postSchema.js";

const createComment = async (req, res) => {
  try {
    const { comment, user, post } = req.body;
  
    //Cheecks whether all credentials are provided
    if (!comment || !user || !post) {
      return res.status(500).json({ message: "Provide all credentials" });
    }

    //creates new comment
    const newComment = new Comment({
      comment,
      user,
      post,
    });

    const savedComment = await newComment.save();

    //Updates the comment in post schema
    await Post.findByIdAndUpdate(post, {
        $push: { comments: savedComment }
    })
    return res
      .status(200)
      .json({ message: "Commented Successfully", savedComment });
  } catch (error) {
    return res.status(500).json({ message: "Error While Creating Comment", error: error.message })
  }
};

//getPostComments
const getPostComments = async (req,res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ post: id }).populate("user").sort({ createdAt: -1 });

    if (!comments) {
      return res.status(400).json({ message: "Invalid Post Id" });
    }

    return res.status(200).json({ message: "Fetched Comments", comments });
  } catch (error) {
    return res.status(500).json({ message: "Error While Fetching Comments", error: error.message });
  }
}

//delete Comment
const deleteComment = async (req,res) => {
    try {
        const {id} = req.params;

        //Finds comment by Id and delete
        const comment = await Comment.findByIdAndDelete(id, req.body).populate("post");
        await comment.post.comments.pull(comment);
        await comment.post.save();

        if (!comment) {
            return res.status(500).json({ message: "Comment Not Found" });
        }

        return res.status(200).json({ message: "Comment Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error while deleting comment", error });
    }
}

export { createComment, deleteComment, getPostComments }
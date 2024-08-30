import express from "express"
import { createPost, getAllPosts, getSinglePost } from "../controllers/postContoller.js";
import {  createComment, deleteComment, getPostComments } from "../controllers/commentController.js";
import upload from "../middlewares/multer.config.js";
import { PostIsLiked } from "../controllers/likeController.js";


const router = express.Router();

router.post('/createpost', upload.single("file"), createPost);
router.post('/createcomment', createComment);
router.delete('/deletecomment/:id', deleteComment);
router.post('/likepost', PostIsLiked);
router.get('/allposts', getAllPosts);
router.get('/singlepost/:id', getSinglePost);
router.get('/comment/:id', getPostComments);

export default router;
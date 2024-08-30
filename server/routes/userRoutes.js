import express from "express"
import { followUser, getUserPosts, loginUser, postUserName, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post('/register', registerUser );
router.post('/login', loginUser );
router.post('/followuser', followUser );
router.get('/userposts/:id', getUserPosts );
router.post('/username/:id', postUserName );

export default router
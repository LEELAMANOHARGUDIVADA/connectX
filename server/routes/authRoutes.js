import express from "express"
import { GoogleSignIn } from "../controllers/authController.js";
import passport from "passport"


const router = express.Router();

router.get('/', passport.authenticate('google', { scope: ['profile', "email"] }), GoogleSignIn);

export default router;
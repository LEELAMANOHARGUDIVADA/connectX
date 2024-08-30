import mongoose from "mongoose";
import User from "../models/userSchema.js";
import generateToken from "../utils/jwt.js";
import bcrypt from "bcryptjs";

const registerUser = async (req,res) => {
    try {
        const { name, email, password } = req.body;

        //checks whether all credentials are provided
        if(!name || !email || !password) {
            return res.status(400).json({ message: "Provide all credentials" });
        }

        //checks if user already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "EmailId already exists" });
        }

        //password hashing
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        //creates new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        return res.status(201).json({ message: "User registered successfully", user, token: generateToken(user._id) });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const loginUser = async(req,res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password ) {
            return res.status(400).json({ message: "Provide all credentials" });
        }

        //Checks if user exists in DB with same emailId
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Invalid User" });
        }
        if (user.email !== email || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({ message: "Login Successful", user, token: generateToken(user._id)})

    } catch (error) {
        return res.status(500).json({error: error});
    }
}

const followUser = async (req,res) => {
    try {
        const { userTobeFollowed, user } = req.body;
        if( !userTobeFollowed, !user ) {
            return res.status(400).json({ message: "Provide all credentials" });
        }

        //Updates the following List of the user
        await User.findByIdAndUpdate(user, {
            $addToSet: { following: userTobeFollowed }
        });

        // Update the followers list of the user to be followed
        await User.findByIdAndUpdate(userTobeFollowed, {
            $addToSet: { followers: user }
        });
        
        return res.status(200).json({ message: "Successfully followed" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//getUserPosts
const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 10 } = req.query;

        if(!id) { 
            return res.status(400).json({message: "Provide User Id"});
        }

        const userposts = await User.findOne({
            userId: id
        }).populate({
            path: 'posts',
            options: {
                sort: { createdAt: -1 },
                skip: (page - 1) * limit,
                limit: parseInt(limit)
            }
        }).lean();

        if (!userposts) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        return res.status(200).json({ message: "User Posts Fetched", userposts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

const postUserName = async(req,res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if(!username) {
            return res.status(400).json({ message: "Provide all  credentials" })
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "Invalid Id" });
        }

        const updateUser = await User.findByIdAndUpdate(id,{
            userId: username
        });

        const updatedUser = await User.findById(id);
        return res.status(201).json({ message: "Username Updated!", updatedUser });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


export { registerUser, loginUser, followUser, getUserPosts, postUserName }
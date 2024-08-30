import User from "../models/userSchema.js"
import { v4 as uuidv4 } from 'uuid';

async function GoogleSignIn(req, res, profile, callback) {
        console.log(profile);
        const userId = uuidv4();
        try {
            let user = await User.findOne({email: profile.emails[0].value});
                
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: profile.displayName,
                    image: profile.photos[0].value,
                    userId: "user"
                });
                await user.save();
                
            }
            console.log(user);
            return callback(null, user);
        } catch (error) {
            return callback(error, null);
        }
}
async function GithubSignIn(accessToken, refreshToken, profile, callback) {
        console.log(profile);
        try {
            let user = await User.findOne({email: profile.profileUrl});
    
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.profileUrl,
                    password: profile.displayName,
                    image: profile.photos[0].value,
                    userId: "user"
                });
                await user.save();
                console.log(user);
                
            }
            console.log(user);
            return callback(null, user);
        } catch (error) {
            return callback(error, null);
        }
}

export { GoogleSignIn, GithubSignIn }
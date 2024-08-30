import express from "express"
import session from "express-session"
import cors from "cors"
import dotenv from "dotenv"
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./connection.js"
import pkg from 'passport-google-oauth20';
import pkg2  from "passport-github2";
import passport from "passport"
import multer from "multer"
import { GithubSignIn, GoogleSignIn } from "./controllers/authController.js"


dotenv.config();

const app = express();
var GoogleStrategy  = pkg.Strategy;
var GitHubStrategy  = pkg2.Strategy;


//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'sjkcbjkvdvbjkdc8393nsbsjb',
    resave: false,
    saveUninitialized: true,
}));
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static("uploads"));

//ROUTES
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);

//Social-Links-Authentication
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback",
    scope: ["profile", "email"]
  }, GoogleSignIn));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback",
    // scope: ['user:email']
  }, GithubSignIn));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// google-sign-in

app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile', "email"] 
}));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    async function(req, res) {
      // Successful authentication, redirect home.
      res.redirect(`${process.env.CLIENT_URL}/dashboard?user=${encodeURIComponent(JSON.stringify(req.user))}`);
      
});

//github-sign-in

app.get('/auth/github', 
    passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/auth/failure' }),
    async function(req, res) {
      // Successful authentication, redirect home.
      res.redirect(`${process.env.CLIENT_URL}/dashboard?user=${encodeURIComponent(JSON.stringify(req.user))}`); 
});

app.get('/', (req,res) => {
    res.send('App is working');
});


app.listen(process.env.PORT, () => {
    console.log('Server Running on PORT', process.env.PORT);
    connectDB(process.env.MONGODB_URL);
});
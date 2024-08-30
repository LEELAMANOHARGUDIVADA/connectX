import mongoose from "mongoose"

function connectDB(url) {
    mongoose.connect(url).then(
        console.log("MongoDB Connected")
    )
}

export default connectDB 
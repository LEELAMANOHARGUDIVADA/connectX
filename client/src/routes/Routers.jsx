import { Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Home from "../pages/Home"
import Dashboard from "../pages/Dashboard"
import { useState } from "react"
import CreatePost from "../pages/CreatePost"
import Comment from "../components/Comment"
import CommentPage from "../pages/CommentPage"
import ProfilePage from "../pages/ProfilePage"

const Routers = () => {
  const [userData, setUserData] = useState(null);
  //Implement Data Parsing don't forget you Idiot it optimizes your code.
  return (
    <Routes>
        <Route path="/login" element={<Login user={userData} setUser={setUserData} />} />
        <Route path="/home" element={<Home user={userData} setUser={setUserData} />} />
        <Route path="/dashboard" element={<Dashboard user={userData} setUser={setUserData}  />} />
        <Route path="/createpost" element={<CreatePost user={userData} setUser={setUserData} />} />
        <Route path="/:id/posts/:id" element={<CommentPage user={userData} setUser={setUserData} />} />
        <Route path="/profile/:id" element={<ProfilePage user={userData} setUser={setUserData} />} />
    </Routes>
  )
}

export default Routers
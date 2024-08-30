import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link, useParams } from 'react-router-dom'
import post from "../assets/post.jpg"
import axios from 'axios'

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();

    const {id} = useParams();
    // console.log(id);
    const getPosts = async() => {
        try {
            const response = await axios.get(`http://localhost:8000/api/user/userposts/${id}`);
            const data = await response.data;
            setPosts(data.userposts.posts);
            setUser(data.userposts);
            // console.log(posts);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getPosts();
    }, [])
  return (
    <div className='w-full border-x border-x-hoverColor flex flex-col items-start justify-center'>
      {user ? (
        <div>
          <div className='sticky top-0 z-10 w-full h-16  bg-black/5 backdrop-filter backdrop-blur-sm flex items-center justify-start'>
        <Link to={`/home`} className='px-2 py-2 hover:bg-hoverColor/40 rounded-full ml-4'>
            <FaArrowLeft size={20} className='text-secondaryColor' />
        </Link>
        <Link className='ml-5'>
            <h3 className='text-lg'>{user.name}</h3>
            <h4 className='text-sm text-hoverColor'>{posts.length} posts</h4>
        </Link>
      </div>

      {/* User info  */}
      <div className='w-full mt-10 border-b border-b-hoverColor'>
        <div className='w-full flex items-center justify-between px-5'>
        <Link to={``}>
            <img src={user.image} alt={user.name} className='rounded-full w-24' />
        </Link>
        <button className='px-10 py-3 rounded-full border border-hoverColor'>Edit Profile</button>
        </div>
        <h3 className='mt-4 text-lg font-semibold px-5'>{user.name}</h3>
        <h4 className='text-hoverColor px-5'>@{user.userId}</h4>
        <div className='flex items-center justify-start gap-5 px-5'>
            <h3 className='my-2'>{user.followers.length} <span className='text-hoverColor ml-1'>followers</span></h3>
            <h3 className='my-2'>{user.following.length} <span className='text-hoverColor ml-1'>following</span></h3>
        </div>

        <div className='mt-4 w-full'>
        <div className='w-2/4 h-12 hover:bg-hoverColor/40 transition duration-200 cursor-pointer flex items-center justify-center'>
          <Link to="/" className="flex flex-col items-center justify-center">
            <h3 className='text-sm text-secondaryColor'>Posts</h3>
            <h4 className="w-16 h-1.5 bg-buttonColor rounded-full relative top-3"></h4>
          </Link>
        </div>
        </div>
      </div>
      {/* Posts Section */}
        <div className='w-full h-full grid grid-cols-3'>
            {posts && posts.map((post, index) => (
                <div className='h-96 w-full border-r border-b border-hoverColor' key={index}>
                <Link to={`/${user._id}/posts/${post._id}`}>
                <img src={`http://localhost:8000/${post.postUrl}`} alt="" className='w-96 h-96 object-cover' />
                </Link>
                </div>
            ))}
        </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Profile
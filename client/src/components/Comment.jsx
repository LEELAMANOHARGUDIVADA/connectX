import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft, FaRegComment } from "react-icons/fa6";
import logo from '../assets/google-logo (1).webp'
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { SiSimpleanalytics } from 'react-icons/si';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import axios from 'axios';

const Comment = ({ user, setUser }) => {
  const [liked, setLiked] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const {id} = useParams();

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/post/singlepost/${id}`);
      setPost(response.data.post);
      // console.log(post);
    } catch (error) {
      console.log(error)
    }
    
  }
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/post/comment/${id}`);
      const data = await response.data;
      setComments(data.comments);
      // console.log(comments);
    } catch (error) {
      console.log(error)
    }
    
  }

  const handleComment = async () => {
    
    try {
      const response = await axios.post(`http://localhost:8000/api/post/createcomment`, { comment: comment,
      post: id,
      user: user._id
      });
      // console.log(response.data);
      setComment("");
      fetchComments();
      fetchPost();
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async (index) => {
    // console.log(feedData);
    const response = await axios.post(`http://localhost:8000/api/post/likepost`, {
      user: user._id,
      post: id
    });
    // console.log(response.data);
    fetchPost();
  };

  const handlePostSave = () => {
    setPostSaved(!postSaved);
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  },[])
  return (
    <div className='w-full border-x border-x-hoverColor flex flex-col items-start justify-center'>
      <div className='sticky top-0 z-10 w-full h-12  bg-black/5 backdrop-filter backdrop-blur-md flex items-center justify-start'>
        <Link to={`/home`} className='px-2 py-2 hover:bg-hoverColor/40 rounded-full ml-4'>
            <FaArrowLeft size={20} className='text-secondaryColor' />
        </Link>
        <Link className='ml-5'>
            <h3 className='text-lg'>Post</h3>
        </Link>
      </div>
      <div className="w-full h-full border-b border-b-hoverColor/40">
      {post && <div className="border-b border-b-hoverColor px-5">
            {/* User Info */}
            <div className="flex items-center justify-start gap-10 mt-5">
              <div className='flex items-center justify-center gap-3'>
              <img src={post.user.image} alt="user-profile" className="w-12 rounded-full" />
              <div className="flex flex-col">
                <h3 className="text-secondaryColor hover:underline cursor-pointer ">{post.user.name}</h3>
                <h4 className="text-hoverColor cursor-pointer">@{post.user.userId}</h4>
              </div>
              </div>

              <div>
                <button className='px-10 py-2 bg-secondaryColor rounded-full text-primaryColor text-sm font-semibold'>Follow</button>
              </div>
            </div>
            {/* Post description */}
              <div className="mt-5">
              <p className="text-secondaryColor font-normal text-sm">{post.title}</p>
            </div>
            {/* Post Media */}
            <div className="my-4 w-full" loading="lazy">
              <img src={`http://localhost:8000/${post.postUrl}`} alt="" className="w-full rounded-2xl object-contain border border-hoverColor" />
            </div>

            {/* Post Analytics */}
            <div className="flex items-center justify-around mb-3">
              <div className="flex items-center justify-center gap-1">
                {liked ? (
                  <GoHeartFill className="text-pink-800 cursor-pointer" size={18} onClick={() => handleLike()} />
                ) : (
                  <GoHeart className="text-hoverColor cursor-pointer" size={18} onClick={() => handleLike()} />
                )}
                <h4 className="text-hoverColor">{post.likes.length}</h4>
              </div>
              <div className="flex items-center justify-center gap-1">
                <FaRegComment size={18} className="text-hoverColor cursor-pointer" />
                <h4 className="text-hoverColor">{post.comments.length}</h4>
              </div>
              <div className="flex items-center justify-center gap-1">
                <SiSimpleanalytics size={15} className="text-hoverColor cursor-pointer" />
                <h4 className="text-hoverColor">1.8K</h4>
              </div>
              <div className="flex items-center justify-center gap-1">
                {postSaved ? 
                  <IoBookmark size={18} className="text-buttonColor cursor-pointer" onClick={handlePostSave} /> : 
                  <IoBookmarkOutline size={18} className="text-hoverColor cursor-pointer" onClick={handlePostSave} />
                }
              </div>
            </div>

            {/* Post Reply Section  */}
            <div className='w-full h-full border-t border-t-hoverColor'>
                <div className='mt-4'>
                <h4 className='text-hoverColor px-10'>Replying to 
                <Link>
                <span className="text-buttonColor ml-1">@{post.user.userId}</span>
                </Link>
                </h4>
                </div>
                <div className='flex items-center justify-center w-full gap-4'>
                    <img src={user.image} alt="" className='w-12 rounded-full' />
                    <textarea className=' mt-4 w-full text-secondaryColor placeholder:text-hoverColor bg-transparent resize-none text-lg outline-none ' placeholder='Post your reply' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <button className="bg-buttonColor px-10 py-2 rounded-full" onClick={handleComment}>Reply</button>
                </div>
            </div>

      </div>}
      </div>
      {/* Comments Section  */}
      {comments && comments.map((postComment, index) => (
        <div className='mt-5 flex flex-col items-start justify-center border-b border-b-hoverColor w-full px-5' key={index}>
        <div className='flex items-start gap-5'>
        <img src={postComment.user.image} alt="" className='w-12 rounded-full' />
        <div>
        <h3>{postComment.user.name}</h3>
        <span className='text-sm text-hoverColor'>@{postComment.user.userId}</span>
        </div>
        <h3 className='text-sm text-hoverColor'>{Date(postComment.createdAt)}</h3>
        </div>
        <h3 className='mt-2 px-16 mb-4'>{postComment.comment}</h3>
      </div>
      ))}
    </div>
  )
}

export default Comment
import { Link } from "react-router-dom";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

const Feed = ({ user }) => {
  const [liked, setLiked] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [feedData, setFeedData] = useState([]);

  const handleLike = async (index) => {
    // console.log(feedData);
    const response = await axios.post(`http://localhost:8000/api/post/likepost`, {
      user: user._id,
      post: feedData[index]._id
    });

    const updatedFeedData = [...feedData];
    updatedFeedData[index].liked = !updatedFeedData[index].liked;
    setFeedData(updatedFeedData);
    
    console.log(response.data);
    getFeed();
    
  };

  const handlePostSave = () => {
    setPostSaved(!postSaved);
  };

  const getFeed = async () => {
    try {
      const feed = await axios.get("http://localhost:8000/api/post/allposts");
      setFeedData(feed.data.allposts);
    } catch (error) {
      console.error("Error fetching feed data:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className='w-full border-x border-x-hoverColor flex flex-col items-center'>
      <div className='sticky top-0 z-10 w-full h-12 border-b border-b-hoverColor bg-black/5 backdrop-filter backdrop-blur-md flex items-center justify-between'>
        <div className='w-1/2 h-full hover:bg-hoverColor/40 transition duration-200 cursor-pointer flex items-center justify-center'>
          <Link to="/" className="flex flex-col items-center justify-center">
            <h3 className='text-sm text-secondaryColor'>For you</h3>
            <h4 className="w-16 h-1.5 bg-buttonColor rounded-full relative top-3"></h4>
          </Link>
        </div>
        <div className='w-1/2 h-full hover:bg-hoverColor/40 transition duration-200 cursor-pointer flex items-center justify-center'>
          <Link to="/following">
            <h3 className='text-sm text-hoverColor'>Following</h3>
          </Link>
        </div>
      </div>

      {/* Feed */}
      <div className="w-full h-full">
        {feedData && feedData.map((post, index) => (
          <div className="border-b border-b-hoverColor px-5" key={index}>
            {/* User Info */}
            <div className="flex items-center justify-start gap-10 mt-5">
              <div className="flex items-center justify-center gap-3">
              <img src={post.user.image} alt="user-profile" className="w-12 rounded-full" />
              <Link to={`/profile/${post.user.userId}`}>
              <div className="flex flex-col">
                <h3 className="text-secondaryColor hover:underline cursor-pointer ">{post.user.name}</h3>
                <h4 className="text-hoverColor cursor-pointer">@{post.user.userId}</h4>
              </div>
              </Link>
              </div>
              {/* <div>
                <button className='px-10 py-2 bg-secondaryColor rounded-full text-primaryColor text-sm font-semibold'>Follow</button>
              </div> */}
            </div>
            {/* Post description */}
            <Link to={`/${post.user.name}/posts/${post._id}`}>
            <div className="mt-5">
              <p className="text-secondaryColor font-normal text-sm">{post.title}</p>
            </div>
            {/* Post Media */}
            <div className="my-4 w-full" loading="lazy">
              <img src={`http://localhost:8000/${post.postUrl}`} alt="" className="w-full rounded-2xl object-contain border border-hoverColor" />
            </div>
            </Link>
            {/* Post Analytics */}
            <div className="flex items-center justify-around mb-3">
              <div className="flex items-center justify-center gap-1">
                {post.liked ? (
                  <GoHeartFill className="text-pink-800 cursor-pointer" size={18} onClick={() => handleLike(index)} />
                ) : (
                  <GoHeart className="text-hoverColor cursor-pointer" size={18} onClick={() => handleLike(index)} />
                )}
                <h4 className="text-hoverColor">{post.likes.length}</h4>
              </div>
              <div className="flex items-center justify-center gap-1">
              <Link to={`/${post.user.name}/posts/${post._id}`}>
                <FaRegComment size={18} className="text-hoverColor cursor-pointer" />
              </Link>
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
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Feed;

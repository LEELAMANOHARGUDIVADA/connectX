import React from 'react'
import Sidebar from '../components/Sidebar';
import Suggestions from '../components/Suggestions';
import Comment from '../components/Comment';


const CommentPage = () => {
  const data = localStorage.getItem("userData");
  const userData = JSON.parse(data);
  // console.log(userData);
  return (
    <div className='w-full h-screen bg-primaryColor text-secondaryColor flex flex-col items-center justify-center'>
      <div className='w-[75%] h-full flex items-center justify-center'>
      <Sidebar className='fixed  h-full' user={userData} />
      <div className='w-2/4 h-full overflow-y-auto hide-scrollbar'>
          <Comment user={userData} />
      </div>
      <div className='w-1/4 h-full overflow-y-auto hide-scrollbar'>
        <Suggestions />
      </div>
      </div>
    </div>
  )
}

export default CommentPage
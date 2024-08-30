import React from 'react'
import Sidebar from '../components/Sidebar'
import Profile from '../components/Profile'
import Suggestions from '../components/Suggestions'

const ProfilePage = ({ user, setUser }) => {
    const data = localStorage.getItem("userData");
    const userData = JSON.parse(data);
    // console.log(userData);
  return (
    <div className='w-full h-screen bg-primaryColor text-secondaryColor flex flex-col items-center justify-center'>
      <div className='w-[75%] h-full flex items-center justify-center'>
      <Sidebar className='fixed  h-full' user={userData} />
      <div className='w-2/4 h-full overflow-y-auto hide-scrollbar'>
          <Profile />
      </div>
      <div className='w-1/4 h-full overflow-y-auto hide-scrollbar'>
        <Suggestions />
      </div>
      </div>
    </div>
  )
}

export default ProfilePage
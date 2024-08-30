import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Suggestions from '../components/Suggestions';
import logo from "../assets/logo.png"

const Home = ({ user, setUser }) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1500)
  },[])

  const data = localStorage.getItem("userData");
  const userData = JSON.parse(data);
  // console.log(userData);

  const handleLogOut = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  }
  
  return (
    <div>
      {loading ? (
        <div className='w-full h-screen dark bg-primaryColor text-secondaryColor flex flex-col items-center justify-center'>
        <div className='w-[75%] h-full flex items-center justify-center'>
        <Sidebar className='fixed  h-full' user={userData} />
        <div className='w-2/4 h-full overflow-y-auto hide-scrollbar'>
            <Feed className="h-screen" user={userData} />
        </div>
        <div className='w-1/4 h-full overflow-y-auto hide-scrollbar'>
          <Suggestions />
        </div>
        </div>
    </div>
      ) : (
        <div className="w-full h-screen bg-primaryColor flex items-center justify-center">
          <img src={logo} alt="" className="w-32" />
        </div>
      )}
    </div>
  );
}

export default Home;

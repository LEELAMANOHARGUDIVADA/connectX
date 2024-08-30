import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ user, setUser }) => {
  const [username, setUserName] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const userParam = urlParams.get('user');
    const userDecoded = decodeURIComponent(userParam);
    const userObj = JSON.parse(userDecoded);
    if(userObj.userId !== "user") {
      localStorage.setItem('userData', JSON.stringify(userObj));
      setTimeout(() => {
        navigate('/home')
      },50)
    } 
    setId(userObj._id)
    console.log(id);
  },[]);


  const handleClick = async() => {
    try {
      const response = await axios.post(`http://localhost:8000/api/user/username/${id}`, {
        username: username
      });
      const updatedUser = response.data.updatedUser;
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  }
    
  return (
    <div className='m-10'>
      <input type="text" placeholder='username' className='w-60 py-2 rounded-lg bg-black text-white px-5' onChange={(e) => setUserName(e.target.value)} value={username} />
      <button onClick={handleClick} className='bg-blue-500 px-20 py-3 rounded-full  text-white text-sm'>Submit</button>
    </div>
  )
}

export default Dashboard
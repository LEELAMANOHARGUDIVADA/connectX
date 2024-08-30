import { useState } from "react";
import logo from "../assets/logo.png";
import { GoHome, GoHomeFill, GoSearch,  GoSignOut } from "react-icons/go";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { IoSearch,IoBookmarkOutline, IoBookmark, IoMailOutline, IoMail } from "react-icons/io5";
import { BsPeople, BsPeopleFill, BsPerson, BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";



const Sidebar = ({ user }) => {
  const [activeItem, setActiveItem] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("userData");
    location.reload();
  }

  const handleClick = (item) => {
    setActiveItem(item);
  };
  const profilePath = user ? `/profile/${user.userId}` : '/profile';

  const menuItems = [
    { name: "Home", icon: GoHome, iconActive: GoHomeFill, path: '/home' },
    { name: "Explore", icon: GoSearch, iconActive: IoSearch, path: '/dashboard' },
    { name: "Notifications", icon: IoMdNotificationsOutline, iconActive: IoMdNotifications, path: '/notifications' }, 
    { name: "Messages", icon: IoMailOutline, iconActive: IoMail, path: '/messages' }, 
    { name: "Bookmarks", icon: IoBookmarkOutline, iconActive: IoBookmark, path: '/bookmarks' },
    { name: "Communities", icon: BsPeople, iconActive: BsPeopleFill, path: '/communities' },
    { name: "Profile", icon: BsPerson, iconActive: BsPersonFill, path: profilePath}
  ];

  return (
    <div className='w-1/4 h-full'>
        <div className="mt-2 px-2 w-12 py-2 hover:bg-hoverColor/30 rounded-full cursor-pointer">
         <img src={logo} alt="logo" className="w-8" />
        </div>
        <div className="mt-5">
            <ul className="flex flex-col items-start justify-center gap-4">
              {menuItems.map((item) => (
                
                  <Link  to={item.path}
                  key={item.name}
                  className={`w-48 px-2 py-3 hover:bg-hoverColor/50 rounded-full cursor-pointer transition duration-200 flex items-center justify-start gap-3 `}
                  onClick={() => handleClick(item.name)}
                >
                  {activeItem === item.name ? <item.iconActive size={30} /> : <item.icon size={30} />}
                  <h3 className={`text-md ${activeItem === item.name ? "font-semibold" : "font-medium"}`}>{item.name}</h3>
                </Link>
                
              ))}
            </ul>
        </div>
        <div className="absolute bottom-5 flex flex-col ">
          {user && <button onClick={handleLogout} className="text-secondaryColor w-60 py-3 rounded-full text-sm font-semibold bg-red-500 mb-5">Logout</button>}
          <Link to={`/createpost`}><button className="bg-buttonColor text-secondaryColor w-60 py-3 rounded-full text-sm font-semibold text-center">
            Post
          </button></Link>

          {
            user ? (
              <div className="mt-5 w-full flex items-center justify-center gap-4 hover:bg-hoverColor/40 transition duration-200 py-2 rounded-full cursor-pointer">
              <div className="w-full px-2 flex items-start justify-center gap-2">
              <img src={user.image} alt="userProfile" className="w-12 rounded-full" />
              <div className="w-full">
                <h3 className="text-secondaryColor font-semibold  max-w-full ">{user.name}</h3>
              <h4 className="text-hoverColor ">@{user.userId}</h4>
            </div>
              </div>
          </div>
            ) : (
              <div className="mt-5 w-full">
                <Link to={`/login`}>
                   <button className="w-60 py-3 text-secondaryColor text-sm rounded-full border border-buttonColor hover:bg-buttonColor/5 transition duration-300">Sign in</button>
                </Link>

              </div>
            )
          }
          
        </div>
    </div>
  );
}

export default Sidebar;

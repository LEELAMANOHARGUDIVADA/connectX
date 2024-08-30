import googleLogo from "../assets/google-logo (1).webp";
import githubLogo from "../assets/github (1).png";
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  //Google Sign In Function
  const handleGoogleSignIn = async () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  //Github Sign In Function
  const handleGithubSignIn = async () => {
    window.location.href = "http://localhost:8000/auth/github";
  }

  //If user is signed in => redirected to homepage
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
  if(userData) {
    navigate('/');
  }
  });
  
  return (
    <div className="w-full h-screen bg-primaryColor flex flex-col xl:flex-row  items-center justify-center">

      <div className="relative top-52 md:top-56 xl:top-0 xl:left-72">
        <img src={logo} alt="connectX" className="xl:w-96 w-32" />
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center gap-5  max-w-[75%]">
      <div className="">
        <h2 className="text-4xl xl:text-7xl font-extrabold mb-5 xl:mb-20 text-secondaryColor xl:ml-44">Happening Now</h2>
      <h3 className="text-white text-2xl xl:text-4xl font-bold xl:ml-56">Join today.</h3>
      </div>
        <div>
        <div className="flex flex-col items-center justify-center gap-3">
          <Link>
          <div
            className="bg-secondaryColor px-10 py-0.5 rounded-full w-80 flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <img src={googleLogo} alt="google" className="w-10" />
            <h3 className="text-gray-700 text-md font-medium">Sign in with google</h3>
          </div>
          </Link>
          <Link>
          <div
            className="bg-secondaryColor px-10 py-1.5 rounded-full w-80 flex items-center justify-center gap-3"
            onClick={handleGithubSignIn}
          >
            <img src={githubLogo} alt="google" className="w-8" />
            <h3 className="text-gray-700 text-md font-medium">Sign in with github</h3>
          </div>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4">
            <hr className="w-32" />
            <h3 className="text-secondaryColor text-md">or</h3>
            <hr className="w-32" />
        </div>
        <div className="mt-5 flex flex-col items-center w-80">
            <Link>
                <button className="bg-buttonColor px-10 w-80 py-2 text-lg font-semibold text-secondaryColor rounded-full">Create account</button>
            </Link>
            <div className="w-80 text-center mt-2">
                <h4 className="text-gray-500 text-xs">By signing up, you agree to the <span className="text-buttonColor hover:underline cursor-pointer">Terms of Service</span> and <span className="text-buttonColor hover:underline cursor-pointer">Privacy Policy</span>, including <span className="text-buttonColor hover:underline cursor-pointer">Cookie</span> Use.</h4>
            </div>
        </div>
        </div>

        <div className="w-80">
            <h3 className="text-xl font-semibold text-secondaryColor">Already have an account?</h3>
            <Link>
            <button className="text-buttonColor w-full py-1.5 mt-5 rounded-full border-2 border-gray-400 hover:bg-buttonColor/10 transition duration-300 text-lg font-medium">
                Sign in
            </button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;

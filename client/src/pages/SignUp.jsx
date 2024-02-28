import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaComment,
  FaCommentAlt,
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaIdBadge,
  FaLink,
  FaStackOverflow,
  FaTag,
  FaTrophy,
  FaVoteYea,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  // const host = "http://localhost:8000";
  const host = "https://stackoverflowclone-backend.vercel.app"
  const [passwordType, setPasswordType] = useState("password");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = credentials;
    if (password === confirmPassword) {
      try {
        const response = await fetch(`${host}/api/auth/createUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: "include",
          body: JSON.stringify({
            name,
            email,
            password,
            confirmPassword,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.authToken);
          toast.success("Account created successfully", {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          });
          navigate("/home");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Both password doesn't match", {
        style:{
          color:"black",
          backgroundColor:"white",
          borderRadius:"10px",
          border:"2px solid rgb(251,146,60)"
        }
      })
    }
  };
  return (
    <>
      <div className="flex items-center justify-center lg:h-[100%] bg-gray-100">
        <div className="w-[70%] flex flex-col lg:flex-row space-y-2 lg:space-y-0 h-fit items-center my-10">
          {/* welcome thread */}
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-start space-y-4">
              <div className="text-2xl">Join the Stack Overflow community</div>
              <div className="items-center hidden lg:flex space-x-1">
                <FaCommentAlt></FaCommentAlt>
                <span>Get unstuck - ask a question</span>
              </div>
              <div className="hidden lg:flex items-center space-x-1">
                <FaVoteYea />
                <span>Unlock new previleges like voting and commenting</span>
              </div>
              <div className="hidden lg:flex items-center space-x-1">
                <FaTag />
                <span>
                  Save your favorite questions, answers, watch tags and more
                </span>
              </div>
              <div className="hidden lg:flex items-center space-x-1">
                <FaTrophy />
                <span>Earn reputation and badges</span>
              </div>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm">
                  Collaborate and share knowledge with a private group for FREE
                </span>
                <Link className="text-sm text-blue-500" to="/">
                  Get Stack Overflow for Teams free for up to 50 users
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start w-full items-center space-y-6">
            {/* other links like google, faceboook, github to login */}
            <div className="flex flex-col space-y-3 items-center">
              <div className="space-y-3 flex flex-col text-sm">
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 w-80 justify-center border-[1px] border-gray-300 rounded-md"
                >
                  <span>
                    <FaGoogle />
                  </span>
                  &nbsp; Log in with Google
                </Link>
                <Link
                  to="/"
                  className="flex items-center px-3 bg-black text-white py-2 w-80 justify-center border-[1px] border-gray-300 rounded-md"
                >
                  <span>
                    <FaGithub />
                  </span>
                  &nbsp; Log in with GitHub
                </Link>
                <Link
                  to="/"
                  className="flex items-center px-3 bg-[#385499] text-white py-2 w-80 justify-center border-[1px] border-gray-300 rounded-md"
                >
                  <span>
                    <FaFacebook />
                  </span>
                  &nbsp; Log in with Facebook
                </Link>
              </div>
            </div>
            {/* signup page elements */}
            <div className="flex flex-col items-start justify-center space-y-2 w-80">
              <form
                onSubmit={handleSignUp}
                className="flex flex-col items-start justify-center w-full bg-white  border-[1px] border-gray-200 shadow-md rounded-md shadow-gray-300 py-2"
              >
                <div className="flex flex-col items-start w-full px-5 py-2 space-y-1">
                  <label className="font-semibold" htmlFor="name">
                    Display name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    name="name"
                    onChange={onChange}
                    value={credentials.name}
                    className="border-[1px] border-gray-500 w-full py-1 rounded-md px-1 focus:outline-none focus:placeholder:text-blue-500"
                  />
                </div>
                <div className="flex flex-col items-start w-full px-5 py-2 space-y-1">
                  <label className="font-semibold" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    onChange={onChange}
                    value={credentials.email}
                    className="border-[1px] border-gray-500 w-full py-1 rounded-md px-1 focus:outline-none focus:placeholder:text-blue-500"
                  />
                </div>
                <div className="flex flex-col items-start w-full px-5 py-2 space-y-1">
                  <label className="font-semibold" htmlFor="password">
                    Set Password
                  </label>
                  <input
                    type={passwordType}
                    id="password"
                    placeholder="Password"
                    name="password"
                    onChange={onChange}
                    value={credentials.password}
                    className="border-[1px] border-gray-500 w-full py-1 rounded-md px-1 focus:outline-none focus:placeholder:text-blue-500"
                  />
                </div>
                <div className="px-5 py-1 text-sm flex items-center space-x-1">
                  <input
                    onClick={togglePasswordType}
                    type="checkbox"
                    name=""
                    id=""
                  />{" "}
                  <span>Show Password</span>
                </div>
                <div className="flex flex-col items-start w-full px-5 py-2 space-y-1">
                  <label className="font-semibold" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type={passwordType}
                    id="confirmPassword"
                    placeholder="Password"
                    name="confirmPassword"
                    onChange={onChange}
                    value={credentials.confirmPassword}
                    className="border-[1px] border-gray-500 w-full py-1 rounded-md px-1 focus:outline-none focus:placeholder:text-blue-500"
                  />
                </div>
                <span className="flex w-72 mx-auto px-2 justify-center">
                  <p className="text-gray-500 text-xs">
                    Passwords must contain atleast at eight characters,
                    including at least 1 letter and 1 number.
                  </p>
                </span>
                <button className="w-[280px] my-5 py-2 text-sm bg-sky-600 text-white rounded-md mx-auto">
                  Sign up
                </button>
                <div className="flex mx-auto w-[280px] mb-5">
                  <p className="text-gray-600 text-xs">
                    By clicking "Sign up", you agree to our{" "}
                    <span className="text-blue-500">terms of service</span> and
                    acknowledge that you have read our{" "}
                    <span className="text-blue-500">privacy policy</span> and{" "}
                    <span className="text-blue-500">code of conduct</span>
                  </p>
                </div>
              </form>
            </div>
            {/* other links to login and... */}
            <div className="flex flex-col items-center space-y-2">
              <div className="text-sm flex items-center space-x-1">
                <span>Already have an acccount? </span>
                <Link to="/login" className="text-xs text-blue-500">
                  Log in
                </Link>
              </div>
              <div className="text-sm flex  items-center space-x-1">
                <span>Are you an employeer? </span>
                <Link to="/" className="text-blue-500 text-xs">
                  Sign up on a talent
                </Link>
                <FaLink />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

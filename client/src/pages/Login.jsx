import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaStackOverflow,
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaLink,
} from "react-icons/fa";

import { Link, redirect, useNavigate } from "react-router-dom";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  // const host = "http://localhost:8000";
  const host = "https://stackoverflowclone-backend.vercel.app";
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",

        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.authToken);
        navigate("/home");
        toast.success("Logged in successfully!", {
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          },
        });
      } else {
        toast.error("Incorrect credentials", {
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          },
        });
        console.error("password incorrect");
        redirect("/signUp");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-[90vh] bg-gray-100">
        <div className="flex flex-col items-center space-y-8 h-fit w-[90%]">
          <div className="flex flex-col space-y-3 items-center">
            <span>
              <FaStackOverflow></FaStackOverflow>
            </span>
            <div className="space-y-3 flex flex-col text-sm">
              <Link
                to="/"
                className="flex items-center px-3 py-2 w-72 justify-center border-[1px] border-gray-300 rounded-md"
              >
                <span>
                  <FaGoogle />
                </span>
                &nbsp; Log in with Google
              </Link>
              <Link
                to="/"
                className="flex items-center px-3 bg-black text-white py-2 w-72 justify-center border-[1px] border-gray-300 rounded-md"
              >
                <span>
                  <FaGithub />
                </span>
                &nbsp; Log in with GitHub
              </Link>
              <Link
                to="/"
                className="flex items-center px-3 bg-[#385499] text-white py-2 w-72 justify-center border-[1px] border-gray-300 rounded-md"
              >
                <span>
                  <FaFacebook />
                </span>
                &nbsp; Log in with Facebook
              </Link>
            </div>
          </div>
          {/* login form code */}
          <div className="w-72 flex flex-col items-center">
            <form
              className="space-y-4 flex flex-col items-start w-full p-5 shadow-lg rounded-md shadow-gray-200 bg-white border-[1px] border-gray-200"
              onSubmit={handleLogin}
            >
              <div className="flex flex-col items-start w-full">
                <label className="font-bold" htmlFor="email">
                  Email
                </label>
                <input
                  className="focus:outline-none focus:placeholder:text-blue-500 rounded-md py-1 px-2 border-[1px] border-gray-500 w-full"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="w-full justify-between flex items-center">
                  <label className="font-bold" htmlFor="password">
                    Password
                  </label>
                  <span className="text-xs cursor-pointer text-blue-500">
                    Forgot password?
                  </span>
                </div>
                <div className="w-full flex items-center rounded-md py-1 border-[1px] border-gray-500 ">
                  <input
                    className=" focus:placeholder:text-blue-500  focus:outline-none px-2  w-full"
                    type={passwordType}
                    value={credentials.password}
                    onChange={onChange}
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className="text-sm my-1 items-center flex space-x-1">
                  <input onClick={togglePasswordType} type="checkbox" />
                  <span> Show Password</span>
                </div>
              </div>
              <button className="bg-sky-600 hover:bg-sky-700 text-sm my-1 text-white w-full py-2 rounded-lg">
                Log in
              </button>
            </form>
          </div>
          {/* other links */}
          <div className="flex flex-col items-center justify-center w-[100vw] space-y-2">
            <div className="flex items-center justify-center w-fit mx-auto space-x-1 text-sm">
              <span>Don't have an account?</span>
              <Link to="/signUp" className="text-blue-500 text-xs">
                Sign Up
              </Link>
            </div>
            <div className="flex items-center w-full mx-auto justify-center space-x-1 text-sm">
              <span>Are you an employeer?</span>
              <Link className="text-blue-500 text-xs">Sign up on a Talent</Link>
              <FaLink></FaLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import stackOverflowIcon from "../images/logo-stackoverflow.png";
import menu from "../images/menu.png";
import close from "../images/close.png";
import teams from "../images/teams-img.svg";
import dropdown from "../images/dropdown.png";
import share from "../images/share.png";
import {
  FaRegQuestionCircle,
  FaTrophy,
  FaBell,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import ToggleMenu from "./ToggleMenu";
import toast from "react-hot-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef();
  const imageHost = "http://localhost:8000/";

  const [loggedUserData, setLoggedUserData] = useState(null);
  const [hamburgerMenuDisplay, setHamburgerMenuDisplay] = useState("hidden");
  const [hamburgerToggle, setHamburgerToggle] = useState(false);
  const token = localStorage.getItem("token");
  // const host = "http://localhost:8000";
  const host = "https://stackoverflowclone-backend.vercel.app"

  const toggleHamburgerMenu = (e) => {
    e.preventDefault();
    ref.current.click();
    if (hamburgerMenuDisplay === "hidden") {
      setHamburgerMenuDisplay("flex");
      setHamburgerToggle(true);
    } else {
      setHamburgerMenuDisplay("hidden");
      setHamburgerToggle(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      localStorage.removeItem("token");
      navigate("/home");
      console.log("logged out");
      toast.success("Logged Out Successfully!", {
        style: {
          color: "black",
          backgroundColor: "white",
          borderRadius: "20px",
          border: "2px solid rgb(251,146,60)",
        },
      });
      window.location.reload();
    }
  };

  const handleGetUser = async () => {
    const response = await fetch(`${host}/api/auth/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      // credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setLoggedUserData(data.user);
    }
  };

  return (
    <>
      <div className="z-10 sticky top-0 w-full bg-white flex justify-center border-t-[3px] border-t-orange-400 border-b-[1px] border-b-gray-300 py-3">
        <div className="flex justify-between w-[90%] items-center h-8">
          {/* navbar icon and hamburger */}
          <div className="flex h-full items-center space-x-6">
            {!token && (
              <button
                className={`cursor-pointer 
                lg:${location.pathname === "/welcome" ? "flex" : "hidden"}
                `}
                ref={ref}
                onClick={toggleHamburgerMenu}
              >
                {!hamburgerToggle ? (
                  <img className="h-6" src={menu} alt="" />
                ) : (
                  <img className="h-6" src={close} alt="" />
                )}
              </button>
            )}
            {token ? (
              <Link to="/home">
                <img className="h-7" src={stackOverflowIcon} alt="" />
              </Link>
            ) : (
              <Link to="/welcome">
                <img className="h-6" src={stackOverflowIcon} alt="" />
              </Link>
            )}
          </div>
          {/* navlink */}
          <div className="md:flex items-center space-x-5 px-3">
            {!token && (
              <Link
                className={`hidden md:flex text-sm text-gray-500 hover:text-gray-900 ${
                  location.pathname === "/about" ? "underline" : "no-underline"
                } ${
                  location.pathname === "/about"
                    ? "text-gray-900"
                    : "text-gray-500"
                }`}
                to="/about"
              >
                About
              </Link>
            )}
            <Link
              className={`text-xs md:text-sm text-gray-500 hover:text-gray-900 ${
                location.pathname === "/product" ? "underline" : "no-underline"
              } ${
                location.pathname === "/product"
                  ? "text-gray-900"
                  : "text-gray-500"
              }`}
              to="/product"
            >
              Product
            </Link>
            {!token && (
              <Link
                className={`hidden md:flex text-sm text-gray-500 hover:text-gray-900 ${
                  location.pathname === "/teams" ? "underline" : "no-underline"
                } ${
                  location.pathname === "/teams"
                    ? "text-gray-900"
                    : "text-gray-500"
                }`}
                to="/teams"
              >
                For Teams
              </Link>
            )}
          </div>
          {/* search bar */}
          <div
            className={`hidden sm:flex border-[1px] border-gray-400 rounded-md w-[40%] sm:w-[25%] ${
              token ? "xl:w-[65%]" : "xl:w-[55%]"
            } px-3 h-full py-1`}
          >
            <div className="flex items-center h-full space-x-1">
              <FaSearch className="h-7 text-gray-600"></FaSearch>
              <input
                className="px-2 w-full focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                type="text"
                placeholder="Search..."
              />
            </div>
          </div>
          {/* authentication buttons */}
          {!token ? (
            <div className="flex justify-center items-center space-x-2 h-full">
              <Link
                to="/login"
                className="w-[4rem] text-xs md:text-sm border-[1px] border-blue-600 text-blue-700 hover:bg-blue-200 rounded-md py-[.30rem] px-2"
              >
                Log in
              </Link>
              <Link
                to="signUp"
                className="w-[4rem] md:w-[5rem] text-xs md:text-sm border-[1px] border-blue-600 text-white bg-sky-600 hover:bg-sky-700 rounded-md py-[.30rem] px-2"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full space-x-4">
              <button
                onClick={handleLogout}
                className="text-sm border-[1px] border-blue-600 text-white bg-sky-600 hover:bg-sky-700 rounded-md py-[.30rem] px-2"
              >
                Logout
              </button>
              <div className="flex justify-between space-x-5 items-center h-fit">
                <Link
                  onClick={handleGetUser}
                  to="/userProfile"
                  className="cursor-pointer"
                >
                  <FaUser></FaUser>
                </Link>
                <span className="cursor-pointer">
                  <FaBell></FaBell>
                </span>
                <span className="cursor-pointer">
                  <FaTrophy></FaTrophy>
                </span>
                <span className="cursor-pointer">
                  <FaRegQuestionCircle></FaRegQuestionCircle>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* hamburger menu */}
        {!token && (
          <ToggleMenu
            dropdown={dropdown}
            hamburgerMenuDisplay={hamburgerMenuDisplay}
            teams={teams}
            share={share}
            toggleHamburgerMenu={toggleHamburgerMenu}
          ></ToggleMenu>
        )}
      </div>
    </>
  );
};

export default Navbar;

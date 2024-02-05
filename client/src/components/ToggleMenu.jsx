import React, { useRef, useState } from "react";
import {
  FaCommentAlt,
  FaHome,
  FaInfoCircle,
  FaPlus,
  FaQuestion,
  FaStar,
  FaSuitcase,
  FaTags,
  FaUsers,
} from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const ToggleMenu = ({
  dropdown,
  share,
  teams,
  hamburgerMenuDisplay,
  toggleHamburgerMenu,
}) => {
  const location = useLocation();
  const collectiveRef = useRef();
  const labsRef = useRef();
  const { path } = useParams;
  const navigate = useNavigate();

  const [toggleLabsInfo, setToggleLabsInfo] = useState("hidden");
  const [toggleCollectives, setToggleCollectives] = useState("hidden");

  const handleToggleCollectives = (e) => {
    e.preventDefault();
    collectiveRef.current.click();
    if (toggleCollectives === "hidden") {
      setToggleCollectives("flex");
    } else {
      setToggleCollectives("hidden");
    }
  };
  const handleToggleLabsInfo = (e) => {
    e.preventDefault();
    labsRef.current.click();
    if (toggleLabsInfo === "hidden") {
      setToggleLabsInfo("flex");
    } else {
      setToggleLabsInfo("hidden");
    }
  };

  return (
    <>
      <div
        className={`absolute top-[3.70rem] rounded-sm bg-white h-[91.5vh] shadow-sm shadow-gray-400 py-2 ${hamburgerMenuDisplay} flex-col items-center -left-0 md:left-20 md:w-1/6 `}
      >
        <div className="flex flex-col items-start py-4 w-full space-y-3">
          <div className="text-sm flex flex-col items-start w-full space-y-1">
            <button onClick={toggleHamburgerMenu}>
              <Link
                to="/home"
                className={`flex space-x-2 items-center h-fit ${
                  location.pathname === "/" ? "" : "hover:bg-gray-100"
                } w-full py-2 px-2 ${
                  location.pathname === "/" ? "bg-gray-200" : "bg-transparent"
                } ${
                  location.pathname === "/" ? "font-bold" : "font-normal"
                } cursor-pointer`}
              >
                <FaHome />
                <span>Home</span>
              </Link>
            </button>
            <button onClick={toggleHamburgerMenu}>
              <Link
                to="/questions"
                className={`flex space-x-2 items-center h-fit ${
                  location.pathname === "/questions" ? "" : "hover:bg-gray-100"
                } w-full py-2 px-2 ${
                  location.pathname === "/questions"
                    ? "bg-gray-200"
                    : "bg-transparent"
                } ${
                  location.pathname === "/questions"
                    ? "font-bold"
                    : "font-normal"
                } cursor-pointer`}
              >
                <FaQuestion />
                <span>Questions</span>
              </Link>
            </button>
            <button onClick={toggleHamburgerMenu}>
              <Link
                to="/tags"
                className={`flex space-x-2 items-center h-fit ${
                  location.pathname === "/tags" ? "" : "hover:bg-gray-100"
                } w-full py-2 px-2 ${
                  location.pathname === "/tags"
                    ? "bg-gray-200"
                    : "bg-transparent"
                } ${
                  location.pathname === "/tags" ? "font-bold" : "font-normal"
                } cursor-pointer`}
              >
                <FaTags />
                <span>Tags</span>
              </Link>
            </button>
          </div>
          <div className="text-sm flex flex-col items-start w-full space-y-1">
            <button onClick={toggleHamburgerMenu}>
              <Link
                to="/users"
                className={`flex items-center h-fit space-x-2 w-full py-2 px-2 ${
                  location.pathname === "/users" ? "" : "hover:bg-gray-100"
                } ${
                  location.pathname === "/users"
                    ? "bg-gray-200"
                    : "bg-transparent"
                } ${
                  location.pathname === "/users" ? "font-bold" : "font-normal"
                } cursor-pointer`}
              >
                <FaUsers />
                <span>Users</span>
              </Link>
            </button>
            <Link
              to="/companies"
              className={`flex items-center h-fit space-x-2 w-full py-2 px-2 ${
                location.pathname === "/companies" ? "" : "hover:bg-gray-100"
              } ${
                location.pathname === "/companies"
                  ? "bg-gray-200"
                  : "bg-transparent"
              } ${
                location.pathname === "/companies" ? "font-bold" : "font-normal"
              } cursor-pointer`}
            >
              <FaSuitcase />
              <span>Companies</span>
            </Link>
          </div>
          <div className="text-sm flex flex-col w-full h-fit">
            <div className="flex w-full justify-between items-center py-2 px-2">
              <div className="relative w-full">
                <div className={`${toggleCollectives} w-full`}>
                  <div className="absolute bottom-6 opacity-100 bg-white h-44 left-[.35rem] rounded-md px-2 py-3 border-[1px] border-gray-100 shadow-md shadow-gray-300 w-full space-y-4">
                    <div className="flex justify-between w-full">
                      <span className="font-bold w-full">
                        Collectives on Stack Overflow
                      </span>
                      <span className="font-bold border-2 border-orange-500 text-orange-500 px-1 text-base h-fit w-fit rounded-md">
                        &lt;/&gt;
                      </span>
                    </div>
                    <div className="text-xs">
                      Find centralized, trusted content and collaborate around
                      the technologies you use most.
                    </div>
                    <div>
                      <Link
                        to="/collectives"
                        className="text-white bg-sky-600 hover:bg-sky-700 px-2 py-1 text-xs rounded-md text-center"
                      >
                        Learn more about collectives
                      </Link>
                    </div>
                  </div>
                  <img
                    className="absolute -top-[.6rem] left-[50%] h-5 opacity-20"
                    src={dropdown}
                    alt=""
                  />
                </div>
                <button
                  ref={collectiveRef}
                  onClick={handleToggleCollectives}
                  className="font-bold text-xs"
                >
                  COLLECTIVES
                </button>
              </div>
              <span onClick={handleToggleCollectives} ref={collectiveRef}>
                <FaPlus className="cursor-pointer opacity-50 hover:opacity-100" />{" "}
              </span>
            </div>
            <Link
              to="/collectives"
              className={`flex py-2 px-2 space-x-1 items-center ${
                location.pathname === "/collectives" ? "" : "hover:bg-gray-100"
              } ${
                location.pathname === "/collectives"
                  ? "bg-gray-200"
                  : "bg-transparent"
              } ${
                location.pathname === "/collectives"
                  ? "font-bold"
                  : "font-normal"
              } cursor-pointer`}
            >
              <div className="bg-orange-400 p-1 h-fit scale-75 rounded-full w-fit">
                <FaStar className="invert" />
              </div>
              <span className="text-sm">Explore Collectives</span>
            </Link>
          </div>
          <div className="text-sm flex flex-col w-full h-fit">
            <div className="flex w-full justify-between items-center py-2 px-2">
              <div className="relative w-full">
                <div className={`${toggleLabsInfo} w-full`}>
                  <div className="absolute bottom-6 opacity-100 bg-white h-36 left-[.35rem] rounded-md px-2 py-3 border-[1px] border-gray-100 shadow-md shadow-gray-300 w-full space-y-4">
                    <div className="flex justify-between w-full">
                      <span className="font-bold w-fit border-2 border-black px-1 pt-[.125rem] rounded-md">
                        LABS
                      </span>
                    </div>
                    <div className="text-xs">
                      Get Early access and see previews of new features
                    </div>
                    <Link
                      to="/labs"
                      className="flex items-center justify-center bg-sky-600 hover:bg-sky-700 rounded-md "
                    >
                      <img src={share} className="invert h-3" alt="" />
                      <span className="text-white  px-2 py-1 text-xs text-center">
                        Learn more about labs
                      </span>
                    </Link>
                  </div>
                  <img
                    className="absolute -top-[.6rem] left-[50%] h-5 opacity-20"
                    src={dropdown}
                    alt=""
                  />
                </div>
                <button
                  ref={labsRef}
                  onClick={handleToggleLabsInfo}
                  className="font-bold text-xs cursor-pointer"
                >
                  LABS
                </button>
              </div>
              <span onClick={handleToggleLabsInfo} ref={labsRef}>
                <FaInfoCircle className="cursor-pointer opacity-50 hover:opacity-100" />
              </span>
            </div>
            <Link
              to="/discussions"
              className={`flex py-2 px-2 space-x-2 items-center ${
                location.pathname === "/discussions" ? "" : "hover:bg-gray-100"
              } ${
                location.pathname === "/discussions"
                  ? "bg-gray-200"
                  : "bg-transparent"
              } ${
                location.pathname === "/discussions"
                  ? "font-bold"
                  : "font-normal"
              } cursor-pointer`}
            >
              <FaCommentAlt />
              <span className="text-sm">Discussions</span>
            </Link>
          </div>
          <div className="text-sm flex flex-col items-center w-full h-fit space-y-4">
            <span className="font-bold px-2 text-xs w-full">TEAMS</span>
            <div className="flex flex-col items-start justify-center w-48 px-3">
              <span className="font-bold text-xs">
                Stack Overflow for Teams -
              </span>
              <p className="text-xs">
                Start collaboration and sharing organizational knowledge.
              </p>
              <img src={teams} alt="" />
              <div className="flex flex-col space-y-1 w-full">
                <span className="w-full bg-orange-500 text-white text-xs py-[.35rem] rounded-md text-center cursor-pointer">
                  Create a free Team
                </span>
                <span className="text-center w-full text-xs cursor-pointer">
                  Why Teams?
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToggleMenu;

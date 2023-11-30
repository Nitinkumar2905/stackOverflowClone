import React from "react";
import HomeSidebar from "../components/HomeSiderbar";
import HomeRightSideContent from "../components/HomeRightSideContent";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  // const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLinkClick = (key) => {
    navigate(key);
  };
  return (
    <div className="flex justify-between mx-auto w-[91%]">
      <div className="md:w-[25%] lg:w-[17%]">
        {/* {token && <HomeSidebar onLinkClick={handleLinkClick} />} */}
        <HomeSidebar onLinkClick={handleLinkClick}></HomeSidebar>
      </div>
      <Outlet className="" />
      <div className="lg:flex hidden w-[23%]">
        <HomeRightSideContent />
      </div>
    </div>
  );
};

export default Home;

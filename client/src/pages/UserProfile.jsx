import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  // const [loggedUserDetails, setLoggedUserDetails] = useState([]);
  // const token = localStorage.getItem("token");
  // const host = "http://localhost:8000/api/auth";

  // const handleGetUser = async () => {
  //   const response = await fetch(`${host}/getUser`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": token,
  //     },
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data);
  //   }
  // };
  return (
    <>
      <div className="flex w-[90%] mx-auto justify-center">
        <div className="flex space-x-5 w-full h-[90vh]">
          <div className="w-[20%] h-full mx-auto bg-gray-50 flex justify-center">
            <Link
              className="my-4 border-[1px] border-sky-800 bg-sky-600 text-white h-fit rounded px-4 py-2"
              to="/home"
            >
              &lt; Back to Home
            </Link>
          </div>
          <div className="flex justify-center w-[80%] bg-gray-50">
            <div className="my-4 w-[96%] border-2">user profile</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

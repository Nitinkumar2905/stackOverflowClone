import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

const UserProfile = () => {
  const [loggedUserDetails, setLoggedUserDetails] = useState([]);
  const token = localStorage.getItem("token");
  const host = "http://localhost:8000/api/auth";

  const handleGetUser = async () => {
    const response = await fetch(`${host}/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setLoggedUserDetails(data);
      console.log(typeof loggedUserDetails);
    }
  };
  useEffect(() => {
    handleGetUser();
    // eslint-disable-next-line
  }, [host]);
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
          <div className="flex flex-col w-[96%] space-y-10 bg-gray-50">
            <div className="m-4">
              <div className="flex w-full justify-between">
                <div className="flex flex-col justify-between border-2 border-black">
                  {loggedUserDetails.user && (
                    <div className="flex flex-col items-start m-4">
                      <span>{loggedUserDetails.user.name}</span>
                      <span>{loggedUserDetails.user.email}</span>
                    </div>
                  )}
                  <div>user other details</div>
                </div>
                <div className="text-xs flex  cursor-pointer border-[1px] rounded-lg border-gray-600 h-fit w-fit px-2 py-2">
                  <FaPencilAlt className="mt-[2.5px] mx-2"></FaPencilAlt>
                  Edit profile
                </div>
              </div>
              <div>2nd box</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

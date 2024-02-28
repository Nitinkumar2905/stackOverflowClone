import React, { useEffect, useState } from "react";
import HomeSidebar from "./HomeSidebar";

const AllUsers = () => {
  // const host = "http://localhost:8000";
  const host = "https://stackoverflowclone-backend.vercel.app"
  // const imageHost = "http://localhost:8000/";
  const imageHost = "https://stackoverflowclone-backend.vercel.app/"

  const [usersData, setUsersData] = useState([]);
  const fetchAllUsers = async () => {
    const response = await fetch(`${host}/api/auth/getAllUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setUsersData(data);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, [host]);
  return (
    <div className="flex justify-center w-full md:justify-between md:w-screen md:ml-5 lg:mx-0 lg:w-[57%] h-[88vh] hideScrollbar overflow-y-auto mt-7">
      <div className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 h-fit gap-4">
        {usersData &&
          usersData.map((user, index) => {
            return (
              <>
                <div
                  className="flex justify-between w-full text-sm space-x-2 border-[0px] shadow-gray-300 shadow-md rounded-md p-2 border-sky-600"
                  key={index}
                >
                  <img
                    className="w-[50px] h-[50px] rounded-md content-normal object-cover"
                    src={`${imageHost}${user?.profileImage?.data}`}
                    alt=""
                  />
                  <div className="flex flex-col flex-wrap w-full items-start justify-center h-full">
                    <span className="text-blue-600 font-semibold">
                      {user.name}
                    </span>
                    <span className="">{user.email}</span>
                  </div>
                  {/* <span>{user._id}</span> */}
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default AllUsers;

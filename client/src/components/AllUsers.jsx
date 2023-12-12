import React, { useEffect, useState } from "react";
import HomeSidebar from "./HomeSidebar";

const AllUsers = () => {
  const host = "http://localhost:8000/api/auth";
  const [usersData, setUsersData] = useState([]);
  const fetchAllUsers = async () => {
    const response = await fetch(`${host}/getAllUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
    <div className="space-x-3 flex w-full">
      {/* <HomeSidebar></HomeSidebar> */}
      <div className="flex items-start w-fit mx-auto flex-col space-y-3">
        {usersData &&
          usersData.map((user, index) => {
            return (
              <>
                <div className="flex flex-col items-start" key={index}>
                  <div className="flex ">
                    {user.email}
                    {user.name}
                    {user._id}
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default AllUsers;

import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPencilAlt, FaPlus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

const UserProfile = () => {
  const [loggedUserDetails, setLoggedUserDetails] = useState([]);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef();

  // const host = "http://localhost:8000/api/auth";
  const host = "https://stackoverflowclone-backend.vercel.app/api/auth"
  // const imageHost = "http://localhost:8000/";
  const imageHost = "https://stackoverflowclone-backend.vercel.app/"

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // show the image preview
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }

    setFile(selectedFile);
  };

  const handleSelectFile = (e) => {
    e.preventDefault();
    ref.current.click();
  };

  const handleUpload = async () => {
    // use form data to send file to the backend
    const formData = new FormData();
    formData.append("profileImage", file);

    // send the form data to the backend api endpoint
    try {
      const response = await axios.post(`${host}/uploadImage`, formData, {
        headers: {
          "auth-token": token,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Image uploaded successfully!", {
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          },
        });
        setFile(null);
        await handleGetUser();
      } else {
        toast.error("Some technical issue occured", {
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          },
        });
        console.error("could not process your request at this time");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
  }, []);

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `${host}/removeUser/${loggedUserDetails.user._id}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": token,
          },
        }
      );
      if (response.ok) {
        toast.success("Account deleted successfully!", {
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          },
        });
        await localStorage.removeItem("token");
        navigate("/home");
        console.log("account deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUserImage = async () => {
    try {
      const response = await fetch(
        `${host}/removeImage/${loggedUserDetails.user._id}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": token,
          },
        }
      );
      if (response.ok) {
        toast.success("image remove successfully!", {
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          },
        });
        await handleGetUser();
        setImagePreview(null);
        setFile(null);
        // await localStorage.removeItem("token");
        // navigate("/home");
        console.log("image removed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex w-[90%] mx-auto justify-center">
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 w-full md:h-[90vh]">
          <div className="w-full md:w-[20%] h-full mx-auto bg-gray-50 flex justify-center">
            <Link
              className="flex items-center my-4 border-[1px] border-sky-800 bg-sky-600 text-white h-fit rounded px-4 py-2"
              to="/home"
            >
              <FaArrowLeft className="mx-1" /> Back to Home
            </Link>
          </div>
          <div className="flex flex-col w-[100%] bg-gray-50">
            <div className="m-4">
              <div className="flex flex-col w-full justify-between">
                <div className="flex md:w-[40%] space-x-2">
                  {/* user image */}
                  {!loggedUserDetails?.user?.profileImage?.data && (
                    <div className="w-fit space-y-3 p-2">
                      {!imagePreview && (
                        <input
                          ref={ref}
                          type="file"
                          accept="image/*"
                          name="profileImage"
                          className="hidden w-fit"
                          onChange={handleFileChange}
                        />
                      )}
                      {!imagePreview && (
                        <span
                          onClick={handleSelectFile}
                          className="cursor-pointer w-16 h-16 border-2 border-gray-800 flex items-center justify-center"
                        >
                          <FaPlus />
                        </span>
                      )}
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt=""
                          className="w-[100px] h-[100px] mt-2 object-cover"
                        />
                      )}
                      {imagePreview && (
                        <button
                          onClick={handleUpload}
                          className="border-[1px] rounded border-gray-500 px-3 py-1 text-sm"
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  )}
                  {loggedUserDetails?.user?.profileImage?.data ? (
                    <div className="w-full relative">
                      <img
                        className="w-[120px] h-[120px] rounded-sm content-normal object-cover"
                        src={`${imageHost}${loggedUserDetails?.user?.profileImage?.data}`}
                        alt=""
                      />
                      <span
                        onClick={handleDeleteUserImage}
                        className="md:w-fit cursor-pointer text-xs flex my-2 border-[1px] border-gray-500 py-1 px-2 items-center rounded"
                      >
                        <AiFillDelete />
                        remove photo
                      </span>
                    </div>
                  ) : null}
                  {loggedUserDetails.user && (
                    <div className="flex w-full flex-col items-start m-4">
                      <span className="font-normal text-2xl md:text-3xl">
                        {loggedUserDetails.user.name}
                      </span>
                      {/* <span>{loggedUserDetails.user.email}</span> */}
                    </div>
                  )}
                </div>
                <div className="md:w-[26%] flex justify-between">
                  <div className="text-xs flex  cursor-pointer border-[1px] rounded-md border-gray-600 h-fit w-36 md:w-32 px-2 py-2">
                    <FaPencilAlt className="mt-[2.5px] mx-2"></FaPencilAlt>
                    Edit profile
                  </div>
                  <div
                    onClick={handleDeleteUser}
                    className="text-xs flex  cursor-pointer border-[1px] rounded-md border-gray-600 h-fit w-36 md:w-32 px-2 py-2"
                  >
                    <AiFillDelete className="mt-[2.5px] mx-2"></AiFillDelete>
                    Delete Account
                  </div>
                </div>
              </div>
              {/* other part */}
              <div className="hidden flex-col space-y-4 w-full h-fit mt-10">
                {/* 1st part w-full */}
                <div className="flex space-x-4 items-center mx-auto border-[1px] border-gray-500 rounded bg-gray-100 w-full h-12">
                  <div className="flex justify-around w-[40%]">
                    <Link
                      to="/profile"
                      className={`border-[1px] border-gray-400 px-4 py-1 text-sm rounded-full ${
                        location.pathname === "/profile" ? "bg-orange-400" : ""
                      }`}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/activity"
                      className={`border-[1px] border-gray-400 px-4 py-1 text-sm rounded-full ${
                        location.pathname === "/activity" ? "bg-orange-400" : ""
                      }`}
                    >
                      Activity
                    </Link>
                    <Link
                      to="/saved"
                      className={`border-[1px] border-gray-400 px-4 py-1 text-sm rounded-full ${
                        location.pathname === "/saved" ? "bg-orange-400" : ""
                      }`}
                    >
                      Saved
                    </Link>
                    <Link
                      to="/settings"
                      className={`border-[1px] border-gray-400 px-4 py-1 text-sm rounded-full ${
                        location.pathname === "/settings" ? "bg-orange-400" : ""
                      }`}
                    >
                      Settings
                    </Link>
                  </div>
                </div>
                {/* 2nd part w-full */}
                <div className="flex space-x-4 justify-between w-full h-[60vh]">
                  <div className="border-[1px] w-[20%] border-gray-500 rounded bg-gray-100"></div>
                  <div className="border-[1px] w-[80%] border-gray-500 rounded bg-gray-100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

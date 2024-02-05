import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./hideScrollbar.css";
import toast from "react-hot-toast";

const AllQuestions = () => {
  const [questionsData, setQuestionsData] = useState([]);
  // const host = "http://localhost:8000/api/questions";
  const host = "https://stackoverflowclone-backend.vercel.app"
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Function to format the time with custom message
  const formatTime = (timestamp) => {
    const currentTime = new Date();
    const postTime = new Date(timestamp);

    const timeDifference = Math.floor((currentTime - postTime) / 1000); // in seconds

    if (timeDifference < 60) {
      return `${timeDifference} seconds ago`;
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        // timeZoneName: "short",
      };
      return new Date(timestamp).toLocaleDateString("en-US", options);
    }
  };
  const fetchAllQuestions = async () => {
    // e.preventDefault();
    try {
      const response = await fetch(`${host}/fetchQuestions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Sort questions by date in descending order

        const sortedQuestions = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setQuestionsData(sortedQuestions);
      } else {
        console.error("some error occured");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigateAskQuestion = () => {
    if (token) {
      navigate("/askQuestion");
    } else {
      toast("Login to continue", {
        color: "black",
        backgroundColor: "white",
        borderRadius: "10px",
        border: "2px solid rgb(251,146,60)",
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchAllQuestions();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="flex justify-between md:w-screen md:ml-5 lg:mx-0 lg:w-[57%] h-[88vh] hideScrollbar overflow-y-auto mt-7">
      <div className="pr-4 flex flex-col items-start w-full space-y-10">
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex justify-between w-full items-center">
            <div className="text-xl md:text-3xl">All Questions</div>
            <button
              onClick={handleNavigateAskQuestion}
              className="border-[1px] border-sky-700 bg-sky-600 text-xs md:text-sm px-2 py-2 rounded text-center text-white"
            >
              Ask Question
            </button>
          </div>
          <div className="text-xs md:text-sm font-medium py-1 px-2 bg-black text-white border-black rounded  border-2 w-fit">
            No. of Question:{" "}
            <span className="font-normal">{questionsData.length}</span>
          </div>
        </div>
        {/* all question section */}
        <div className="flex flex-col items-start border-t-[1px] border-blue-100 space-y-2 w-full">
          {questionsData.sort()?.map((question, index) => {
            return (
              <>
                <div className="w-full" key={index}>
                  <div className="border-b-[0px] border-blue-100 flex flex-col space-y-2 pb-2 w-full">
                    <div className="flex flex-col space-y-1 items-start">
                      <Link
                        to={`/questions/${question._id}`}
                        className="text-sm md:text-base font-medium text-blue-500"
                      >
                        {question.QuestionTitle}
                      </Link>
                      <p className="text-xs md:text-sm">
                        {question.QuestionDetails.length > 340
                          ? `${question.QuestionDetails.slice(0, 340)}...`
                          : question.QuestionDetails}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-x-2">
                      <div className="space-x-2">
                        {question.QuestionTags.map((tag) => {
                          return (
                            <>
                              <span className="text-xs md:text-sm bg-blue-100 px-2 text-blue-500 py-1 rounded">
                                {tag}
                              </span>
                            </>
                          );
                        })}
                      </div>
                      {question.userName && (
                        <div className="text-sm">
                          <Link to="/userProfile" className="font-medium text-blue-600">
                            {question?.userName}
                          </Link>{" "}
                          {""}
                          asked {formatTime(question.date)}
                        </div>
                      )}
                    </div>
                    <hr className=""></hr>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;

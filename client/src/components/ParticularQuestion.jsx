import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./hideScrollbar.css";

const ParticularQuestion = () => {
  const [particularQuestionData, setParticularQuestionData] = useState({});
  const token = localStorage.getItem("token");
  const host = "http://localhost:8000/api/questions";
  const { id } = useParams();
  const navigate = useNavigate();

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

  const fetchQuestionData = async () => {
    try {
      const response = await fetch(`${host}/question/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const questionData = await data.question;
        console.log(questionData);
        setParticularQuestionData(questionData);
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  const handleAskQuestion = async () => {
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
    fetchQuestionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div
      className={`flex justify-between md:w-screen md:ml-5 lg:mx-0 lg:w-[57%] h-[88vh] overflow-y-scroll mt-7`}
    >
      <div className="flex flex-col w-full pr-4">
        <div className="flex flex-col w-full space-y-3">
          <div className="flex justify-between items-start h-fit w-full ">
            <span className="text-xl w-[83%] text-blue-500 font-medium">
              {particularQuestionData.QuestionTitle}
            </span>
            <button
              onClick={handleAskQuestion}
              // to="/askQuestion"
              className="text-sm px-4 py-2 bg-sky-600 text-white rounded border-sky-700 broder-[1px]"
            >
              Ask Question
            </button>
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="text-sm text-gray-400">
              Asked{" "}
              <span className="text-black">
                {formatTime(particularQuestionData.date)}
              </span>
            </div>
            <div className="">
              by{" "}
              <span className="text-blue-500 font-medium text-sm">
                {particularQuestionData.userName}
              </span>
            </div>
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between w-full space-x-4">
          <div>buttons</div>
          <div className="flex flex-col space-y-2 h-full w-full">
            <p className="tracking-wider text-sm">
              {particularQuestionData.QuestionDetails}
            </p>
            {/* tags and other data */}
            <div className="flex space-x-2">
              {particularQuestionData.QuestionTags &&
                particularQuestionData.QuestionTags.map((tag) => {
                  return (
                    <>
                      <div className="flex">
                        <span className="bg-blue-100 text-blue-400 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col space-y-6">
          <p className="tracking-wide text-lg">
            Know someone who can answer? Share a link to this{" "}
            <span className="text-blue-500">quesiton</span> via{" "}
            <span className="text-blue-500">email</span>,{" "}
            <span className="text-blue-500">whatsapp</span>,{" "}
            <span className="text-blue-500">facebook</span>,{" "}
            <span className="text-blue-500">twitter</span>
          </p>
          <div className="flex flex-col space-y-2 pb-10">
            <span className="text-lg">Your answer</span>
            <textarea
              className="focus:placeholder:outline-none border-[1px] placeholder:text-lg border-gray-400 rounded py-2 px-4"
              placeholder="Write your answer here for above asked question"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticularQuestion;

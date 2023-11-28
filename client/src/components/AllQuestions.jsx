import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllQuestions = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const host = "http://localhost:8000/api/question";

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

  useEffect(() => {
    fetchAllQuestions();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="flex justify-between md:w-screen md:ml-5 lg:mx-0 lg:w-[57%]">
      <div className="mt-6 flex flex-col items-start w-full space-y-10">
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex justify-between w-full items-center">
            <div className="text-3xl">All Questions</div>
            <Link
              to="/askQuestion"
              className="border-[1px] border-sky-700 bg-sky-600 text-sm px-2 py-2 rounded text-center text-white"
            >
              Ask Question
            </Link>
          </div>
          <div className="font-medium py-1 px-2 bg-black text-white border-black rounded  border-2 w-fit">
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
                      <Link to={`/question/${question.id}`} className="font-medium text-blue-500">
                        {question.QuestionTitle}
                      </Link>
                      <p className="text-sm">{question.QuestionDetails}</p>
                    </div>
                    <div className="flex justify-between space-x-2">
                      <div className="space-x-2">
                        {question.QuestionTags.map((tag) => {
                          return (
                            <>
                              <span className="text-xs bg-blue-100 px-2 text-blue-500 py-1 rounded">
                                {tag}
                              </span>
                            </>
                          );
                        })}
                      </div>
                      {question.userName && (
                        <div className="text-sm">
                          <Link to="/userProfile" className="text-blue-400">
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

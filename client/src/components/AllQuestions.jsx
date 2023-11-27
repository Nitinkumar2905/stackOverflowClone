import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllQuestions = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const host = "http://localhost:8000/api/question";

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
        setQuestionsData(data);
        console.log(data);
        console.log(data[0].QuestionTags);
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
        <div className="flex justify-between w-full items-center">
          <span className="text-3xl">Top Questions</span>
          <Link
            to="/askQuestion"
            className="border-[1px] border-sky-700 bg-sky-600 text-sm px-2 py-2 rounded text-center text-white"
          >
            Ask Question
          </Link>
        </div>
        {/* all question section */}
        <div className="flex flex-col items-start border-t-[1px] border-blue-100 space-y-2 w-full">
          {questionsData?.map((question) => {
            return (
              <>
                <div className="w-full" key={question._id}>
                  <div className="border-b-[0px] border-blue-100 flex flex-col space-y-2 pb-2 w-full">
                    <span className="text-sky-600">
                      {question.QuestionTitle}
                    </span>
                    <div className="flex justify-between space-x-2">
                      <div className="space-x-2">
                        {question.QuestionTags.map((tag) => {
                          return (
                            <>
                              <span className="text-xs bg-sky-100 px-2 text-sky-800 py-1 rounded">
                                {tag}
                              </span>
                            </>
                          );
                        })}
                      </div>
                      {question.userName && (
                        <div className="text-sm">asked by <Link to="/userProfile" className="text-blue-400">{question?.userName}</Link></div>
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

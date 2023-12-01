import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./hideScrollbar.css";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";

const ParticularQuestion = () => {
  const [particularQuestionData, setParticularQuestionData] = useState([]);
  const [postQuestionAnswer, setPostQuestionAnswer] = useState({
    answerBody: "",
  });
  const [voteCount, setVoteCount] = useState(0);
  const [fetchQuestionAnswer, setFetchQuestionAnswer] = useState([]);

  const token = localStorage.getItem("token");
  const loggedUserId = localStorage.getItem("loggedUserId");
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
        console.log(data);
        const questionData = await data.question;
        // console.log(questionData);
        setParticularQuestionData(questionData);
        if(loggedUserId){
          
        }
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  const handleVoteUp = async () => {
    try {
      if (token) {
        const response = await fetch(`${host}/question/upVote/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        if (response.ok) {
          await fetchTotalVotes();
          await fetchQuestionData();
        } else {
          console.warn("You have already upVoted for this question");
          toast("You have already voted up 😁 for this question", {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          });
        }
      } else {
        toast("Login first to vote", {
          color: "black",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "2px solid rgb(251,146,60)",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVoteDown = async () => {
    try {
      if (token) {
        const response = await fetch(`${host}/question/downVote/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        if (response.ok) {
          // eslint-disable-next-line
          const data = await response.json();
          await fetchTotalVotes();
          await fetchQuestionData();
        } else {
          console.warn("You already have downVoting for this question");
          toast("You have already voted down 😢 for this question", {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          });
        }
      } else {
        toast("Login first to vote", {
          color: "black",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "2px solid rgb(251,146,60)",
        });
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const fetchTotalVotes = async () => {
    const response = await fetch(`${host}/question/getVotes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setVoteCount(data.totalVotes);
    }
  };
  useEffect(() => {
    fetchTotalVotes();
    // eslint-disable-next-line
  }, [id]);

  const onChange = (e) => {
    setPostQuestionAnswer({
      ...postQuestionAnswer,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostQuestionAnswer = async () => {
    if (token) {
      const { answerBody } = postQuestionAnswer;
      try {
        const response = await fetch(`${host}/question/answer/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            answerBody,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          toast.success("Answer posted successfully", {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          });
          setPostQuestionAnswer({
            answerBody: "",
          });
          await fetchQuestionAnswers();
          // console.log(data);
        } else {
          console.log("could not post answer");
        }
      } catch (error) {
        console.error(error);
      }
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

  const fetchQuestionAnswers = async () => {
    try {
      const response = await fetch(`${host}/question/getAnswer/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFetchQuestionAnswer(data);
      } else {
        console.log("no answer available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestionAnswers();
    // eslint-disable-next-line
  }, [id]);

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
        <div className="flex justify-between w-full space-x-4 mb-2">
          {particularQuestionData.QuestionDetails && (
            <div className="flex flex-col justify-center items-center space-y-1">
              <span
                onClick={handleVoteUp}
                className="border-[1px] hover:bg-orange-100 cursor-pointer border-black rounded-full p-2"
              >
                <BiSolidUpvote />
              </span>
              <span className="font-bold text-lg">{voteCount}</span>
              <span
                onClick={handleVoteDown}
                className="cursor-pointer hover:bg-orange-100 border-[1px] border-black rounded-full p-2"
              >
                <BiSolidDownvote />
              </span>
            </div>
          )}
          <div className="flex flex-col space-y-2 h-full w-full">
            <p className="">{particularQuestionData.QuestionDetails}</p>
            {/* tags and other data */}
            <div className="flex space-x-2">
              {particularQuestionData.QuestionTags &&
                particularQuestionData.QuestionTags.map((tag, index) => {
                  return (
                    <>
                      <div className="flex" key={index}>
                        <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded text-sm">
                          {tag}
                        </span>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
        <hr className="my-1" />
        {/* question's answers */}
        <div>
          <div className="flex space-x-1 items-center">
            <span className="font-medium text-lg">
              {fetchQuestionAnswer.answers &&
                fetchQuestionAnswer.answers.length}
            </span>
            <span className="text-lg font-medium">
              {fetchQuestionAnswer.answers
                ? fetchQuestionAnswer.answers.length > 1
                  ? "Answers"
                  : "Answer"
                : "No one answered yet😢"}
            </span>
          </div>
          <div className="flex flex-col space-y-4">
            {fetchQuestionAnswer.answers &&
              fetchQuestionAnswer.answers.map((answer, index) => {
                return (
                  <>
                    <div
                      className="flex flex-col border-b-[1px] border-gray-100 pb-2"
                      key={index}
                    >
                      <span className="">{answer.answerBody}</span>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          answered{" "}
                          <span className="text-black">
                            {formatTime(answer.date)}
                          </span>
                        </div>
                        <div className="text-sm">
                          by{" "}
                          <span className="font-medium text-blue-500">
                            {answer.userName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col space-y-6 mt-4">
          <p className="tracking-wide text-lg">
            Know someone who can answer? Share a link to this{" "}
            <span className="text-blue-500">quesiton</span> via{" "}
            <span className="text-blue-500">email</span>,{" "}
            <span className="text-blue-500">whatsapp</span>,{" "}
            <span className="text-blue-500">facebook</span>,{" "}
            <span className="text-blue-500">twitter</span>
          </p>
          <div className="flex flex-col items-start space-y-2 pb-10 w-full">
            <span className="text-lg">Your answer</span>
            <textarea
              className="w-full focus:placeholder:outline-none border-[1px] placeholder:text-lg border-gray-400 rounded py-2 px-4"
              type="text"
              name="answerBody"
              onChange={onChange}
              value={postQuestionAnswer.answerBody}
              placeholder="Write your answer here for above asked question"
            ></textarea>
            <button
              className="bg-sky-600 border-sky-700 border-[1px] rounded px-4 py-1 text-white"
              onClick={handlePostQuestionAnswer}
            >
              Post Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticularQuestion;

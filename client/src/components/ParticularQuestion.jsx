import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ParticularQuestion = () => {
  const [particularQuestionData, setParticularQuestionData] = useState({});
  const token = localStorage.getItem("token");
  const host = "http://localhost:8000/api/question";
  const { id } = useParams();

  const fetchQuestionData = async () => {
    try {
      const response = await fetch(`${host}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const questionData = await data.question;
        setParticularQuestionData(questionData);
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  useEffect(() => {
    fetchQuestionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <h2 className="text-2xl font-bold">
        {particularQuestionData.QuestionTitle}
      </h2>
      <p className="text-gray-600">{particularQuestionData.QuestionDetails}</p>
      <div className="flex space-x-2">
        {particularQuestionData.QuestionTags &&
          particularQuestionData.QuestionTags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 px-2 text-blue-500 py-1 rounded"
            >
              {tag}
            </span>
          ))}
      </div>
      <span className="text-xs bg-blue-100 px-2 text-blue-500 py-1 rounded">
        {particularQuestionData.id}
      </span>
    </div>
  );
};

export default ParticularQuestion;

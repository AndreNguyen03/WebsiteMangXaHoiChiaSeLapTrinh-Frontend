import React from "react";
import "./Question.css";
import Avatar from "../Avatar/Avatar.jsx";
import { Link, useLocation } from "react-router-dom";

const Question = ({ question }) => {
  const location = useLocation().pathname;

  return (
    <div className="flex items-baseline mb-4">
      <div className="w-2/12 h-full flex-col py-4 justify-items-end ">
        <p className="question-properties">{question.votes} votes</p>
        <p className="question-properties">{question.noOfAnswers} answers</p>
        <p className="question-properties">{question.views} views</p>
      </div>
      <div className="w-11/12 p-4">
        <Link
          to={`/Questions/${question.id}`}
          className="text-blue-500 font-medium"
        >
          {question.questionTitle}
        </Link>
        {location === "/questions" ? (
          <span className="block text-gray-600 text-sm">
            {question.questionBody}
          </span>
        ) : (
          <></>
        )}
        <div className="flex items-center text-xs text-gray-600 mt-1">
          {question.questionTags.map((tag) => (
            <span className="question-tags">{tag}</span>
          ))}

          <span className="ml-auto">
            <img
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              className="mr-2 relative inline-block size-6 !rounded-full object-cover object-center"
            />
            {question.userPosted}
            <span className="text-gray-400 ml-2">asked on {question.time}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Question;

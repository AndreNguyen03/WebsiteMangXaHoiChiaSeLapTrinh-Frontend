import React from "react";
import "./Question.css";
import Avatar from "../Avatar/Avatar.jsx";
import { Link, useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { useEffect, useState } from "react";

const Question = ({ question }) => {
  const location = useLocation().pathname;

  return (
    <div className="flex items-baseline mb-4">
      <div className="w-2/12 h-full flex-col py-4 justify-items-end ">
        <p className="question-properties">
          {question.upvote - question.downvote} votes
        </p>
        <p className="question-properties">{question.answers.length} answers</p>
        <p className="question-properties">{question.views} views</p>
      </div>
      <div className="w-11/12 p-4">
        <Link
          to={`/Questions/${question.id}`}
          className="text-blue-500 font-medium"
        >
          {question.title}
        </Link>
        {location.startsWith("/questions") ? (
          <span className="block text-gray-600 text-sm">{question.body}</span>
        ) : (
          <></>
        )}
        <div className="flex items-center text-xs text-gray-600 mt-1">
          {question.posttags.map((tag, index) => (
            <span key={index} className="question-tags">
              {tag.tag.tagname}
            </span>
          ))}

          <span className="ml-auto">
            <img
              src={question.user.gravatar}
              alt="avatar"
              className="mr-2 relative inline-block size-6 !rounded-full object-cover object-center"
            />
            {question.user.username}
            <span className="text-gray-400 ml-2">
              {formatDistanceToNow(new Date(question.createdAt), {
                addSuffix: true,
              })}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Question;

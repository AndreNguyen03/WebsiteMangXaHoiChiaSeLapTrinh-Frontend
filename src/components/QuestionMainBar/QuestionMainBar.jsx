import React from "react";
import { Link } from "react-router-dom";
import QuestionList from "../HomeMainBar/QuestionList";

const QuestionMainBar = () => {
  const questionsList = [
    {
      id: 1,
      votes: 3,
      views: 1,
      noOfAnswers: 2,
      questionTitle: "How does a function work in JavaScript?",
      questionBody: "Can someone explain the basics of how functions work?",
      questionTags: ["javascript", "functions", "beginner"],
      userPosted: "mano",
      time: "Jan 1",
    },
    {
      id: 2,
      votes: 0,
      views: 3,
      noOfAnswers: 0,
      questionTitle: "Difference between Java and JavaScript?",
      questionBody:
        "I often hear people mention Java and JavaScript. Are they the same?",
      questionTags: ["java", "javascript", "differences"],
      userPosted: "mano",
      time: "Jan 2",
    },
    {
      id: 3,
      votes: 1,
      views: 5,
      noOfAnswers: 1,
      questionTitle: "What is the purpose of MongoDB?",
      questionBody:
        "Why should I use MongoDB instead of a relational database?",
      questionTags: ["mongodb", "database", "NoSQL"],
      userPosted: "mano",
      time: "Jan 3",
    },
    {
      id: 4,
      votes: 2,
      views: 10,
      noOfAnswers: 3,
      questionTitle: "How to handle asynchronous code in Node.js?",
      questionBody:
        "I’m having trouble understanding async functions and promises in Node.js.",
      questionTags: ["node js", "asynchronous", "promises"],
      userPosted: "alex",
      time: "Jan 4",
    },
    {
      id: 5,
      votes: 5,
      views: 20,
      noOfAnswers: 5,
      questionTitle:
        "What is React and how does it differ from vanilla JavaScript? blablablablablablablablablablablablabla",
      questionBody: "Is React really necessary for front-end development?",
      questionTags: ["react js", "javascript", "frontend"],
      userPosted: "jane",
      time: "Jan 5",
    },
  ];
  const user = 1;
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">All Questions</h1>
        <Link
          to={user === null ? "/Login" : "/AskQuestion"}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Ask Question
        </Link>
      </div>
      <div className="flex items-center justify-between space-x-4 mb-4">
        <span className="text-lg">{questionsList.length} questions</span>
        <div className="flex items-center space-x-2">
          <div className="border border-gray-400 p-2 rounded">
            <button className="px-3 py-1 bg-gray-200 rounded border border-gray-300">
              Newest
            </button>
            <button className="px-3 py-1">Active</button>
            <button className="px-3 py-1">Unanswered</button>
          </div>
          <button className="flex items-center p-3 border border-blue-500 rounded text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            Filter
          </button>
        </div>
      </div>
      <div className="bg-white rounded shadow-sm border-gray-300 border mb-4">
        <QuestionList QuestionList={questionsList} />
      </div>
    </>
  );
};

export default QuestionMainBar;

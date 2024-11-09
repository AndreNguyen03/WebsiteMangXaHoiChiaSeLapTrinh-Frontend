import React from "react";

const DisplayQuestionMainBar = () => {
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

  return <div></div>;
};

export default DisplayQuestionMainBar;

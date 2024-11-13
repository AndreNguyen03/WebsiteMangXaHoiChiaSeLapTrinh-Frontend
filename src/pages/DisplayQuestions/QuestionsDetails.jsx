import React from "react";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";

import "./Questions.css";
import DisplayAnswer from "./DisplayAnswer";

const QuestionsDetails = () => {
  const { id } = useParams(); // Get the id from the URL parameters
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
      answers: [
        {
          answerBody:
            "In JavaScript, a function is a block of code designed to perform a particular task. Functions are defined with the `function` keyword, followed by a name, parentheses, and curly brackets for the code block.",
          userAnswered: "alice",
          answeredOn: "Jan 2",
          userID: "u1",
        },
        {
          answerBody:
            "You can also create anonymous functions, which are functions without a name. These are often used in event listeners or as arguments to other functions.",
          userAnswered: "bob",
          answeredOn: "Jan 2",
          userID: "u2",
        },
      ],
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
      answers: [
        {
          answerBody:
            "Java is a programming language used mainly for backend development, while JavaScript is mostly used for front-end development in web browsers.",
          userAnswered: "charlie",
          answeredOn: "Jan 3",
          userID: "u3",
        },
      ],
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
      answers: [
        {
          answerBody:
            "MongoDB is a NoSQL database, which stores data in flexible, JSON-like documents. It's often chosen for applications requiring a dynamic schema and high scalability.",
          userAnswered: "dave",
          answeredOn: "Jan 4",
          userID: "u4",
        },
      ],
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
      answers: [
        {
          answerBody:
            "Asynchronous code in Node.js can be managed with callbacks, promises, or async/await syntax. Promises provide a cleaner, more manageable way to handle asynchronous tasks.",
          userAnswered: "emma",
          answeredOn: "Jan 5",
          userID: "u5",
        },
        {
          answerBody:
            "Async functions simplify working with promises by allowing you to use `await` to pause code execution until the promise resolves.",
          userAnswered: "frank",
          answeredOn: "Jan 5",
          userID: "u6",
        },
      ],
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
      answers: [
        {
          answerBody:
            "React is a JavaScript library for building user interfaces, especially single-page applications. It introduces components and state, which make it easier to manage complex UIs.",
          userAnswered: "grace",
          answeredOn: "Jan 6",
          userID: "u7",
        },
        {
          answerBody:
            "While not strictly necessary, React simplifies the process of building interactive UIs and is popular in the industry, so learning it can be beneficial.",
          userAnswered: "henry",
          answeredOn: "Jan 6",
          userID: "u8",
        },
      ],
    },
  ];

  return (
    <div className="question-details-page">
      {questionsList === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList
            .filter((question) => question.id === parseInt(id)) // Convert id to integer for comparison
            .map((question) => (
              <div key={question.id}>
                <section className="question-details-container">
                  <h1> {question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="green"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <p>{question.votes}</p>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="red"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <div style={{ width: "100%" }}>
                        <p className="question-body">{question.questionBody}</p>
                        <div className="question-details-tags">
                          {question.questionTags.map((tag) => (
                            <p key={tag}>{tag}</p>
                          ))}
                        </div>

                        <div children="question-action-user">
                          <div>
                            <button type="button">Share</button>
                            <button type="button">Delete</button>
                          </div>
                          <div>
                            <p>
                              Asked on {question.time}
                              <Link
                                to={`/User/${question.userPosted}`}
                                className="user-link"
                              >
                                <Avatar
                                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                                  alt="avatar"
                                  size="xs"
                                />
                                <div>{question.userPosted}</div>
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} answers</h3>
                    <DisplayAnswer key={question.id} question={question} />
                  </section>
                )}
                <section>
                  <h3>Your Answer</h3>
                  <form>
                    <textarea className="w-full h-32 border border-gray-300 rounded-lg p-2"></textarea>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-lg p-2 mt-2"
                    >
                      Post Your Answer
                    </button>
                  </form>
                  <p>
                    Browse other questions tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tag">
                        {tag}
                      </Link>
                    ))}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                      className="ans-tag"
                    >
                      Ask your own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;

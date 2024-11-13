import React from "react";
import Question from "./Question";

const QuestionList = ({ posts }) => {
  return (
    <>
      {posts.map((question) => (
        <>
          <Question key={question.id} question={question} />
          <hr class=" h-0.5 border-t-0 bg-gray-100" />
        </>
      ))}
    </>
  );
};

export default QuestionList;

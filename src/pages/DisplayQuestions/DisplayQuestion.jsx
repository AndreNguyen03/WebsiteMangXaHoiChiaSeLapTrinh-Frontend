import React from "react";
import { useParams } from "react-router-dom";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import QuestionDetails from "../../components/QuestionsDetails/QuestionsDetails";
import "./Questions.css";

const DisplayQuestion = () => {
  const { postId } = useParams(); // Fetch postId from the route parameter

  return (
    <div className="container w-screen mx-auto flex mt-4 h-fit">
      <aside className="w-2/12 md:block md:w-1/6 shadow-2xl bg-white flex-grow">
        <LeftSideBar></LeftSideBar>
      </aside>
      <main className=" md:w-5/6 bg-white pt-4  h-fit shadow-xl ml-4">
        <QuestionDetails postId={postId}></QuestionDetails>
      </main>
    </div>
  );
};

export default DisplayQuestion;

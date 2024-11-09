import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import QuestionsDetails from "./QuestionsDetails";

const DisplayQuestion = () => {
  return (
    <div className="container mx-auto flex mt-4 h-screen">
      <aside className="w-1/4 bg-white p-8  shadow-2xl sidebar">
        <LeftSideBar></LeftSideBar>
      </aside>
      <main className="w-2/4 bg-white p-4 shadow-xl ml-4">
        <QuestionsDetails></QuestionsDetails>
      </main>
      <aside className="w-1/4 bg-white p-4 shadow-2xl ml-4">
        <RightSideBar></RightSideBar>
      </aside>
    </div>
  );
};

export default DisplayQuestion;

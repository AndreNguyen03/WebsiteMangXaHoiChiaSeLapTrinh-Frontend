import React from "react";
import { useParams } from "react-router-dom";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import QuestionDetails from "../../components/QuestionsDetails/QuestionsDetails";
const DisplayQuestion = () => {
  const { postId } = useParams(); // Fetch postId from the route parameter

  return (
    <div className="container w-screen mx-auto gap-4 flex mt-4 ">
      {/* LeftSideBar - Luôn nằm bên trái */}
      <aside className="hidden md:block md:w-1/6 bg-white shadow-2xl">
        <LeftSideBar />
      </aside>

      {/* Wrapper cho HomeMainBar và RightSideBar */}
      <div className="flex flex-col md-lg:flex-row w-full h-fit min-h-screen md-lg:w-5/6">
        {/* HomeMainBar - Chiếm 3/4 không gian khi md-lg */}
        <main className="w-full md-lg:w-3/4 bg-white p-4 flex-grow shadow-xl">
          <QuestionDetails postId={postId} />
        </main>

        {/* RightSideBar - Nhảy xuống dưới HomeMainBar khi màn hình từ md-lg trở xuống */}
        <aside className="w-full md-lg:w-1/4 bg-white p-4 shadow-2xl mt-4 md-lg:mt-0 md-lg:ml-4">
          <RightSideBar />
        </aside>
      </div>
    </div>
  );
};

export default DisplayQuestion;

import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import QuestionMainBar from "../../components/QuestionMainBar/QuestionMainBar";

const Question = () => {
  return (
    <div className="container mx-auto gap-4 flex mt-4 h-fit">
      {/* LeftSideBar - Luôn nằm bên trái */}
      <aside className="hidden md:block md:w-1/6 shadow-2xl flex-grow bg-white">
        <LeftSideBar />
      </aside>

      {/* Wrapper cho HomeMainBar và RightSideBar */}
      <div className="flex flex-col md-lg:flex-row w-full min-h-screen h-fit md-lg:w-5/6">
        {/* HomeMainBar - Chiếm 3/4 không gian khi md-lg */}
        <main className="w-full md-lg:w-3/4 bg-white flex-grow p-4 shadow-xl">
          <QuestionMainBar />
        </main>

        {/* RightSideBar - Nhảy xuống dưới HomeMainBar khi màn hình từ md-lg trở xuống */}
        <aside className="w-full md-lg:w-1/4 bg-white p-4 shadow-2xl mt-4 md-lg:mt-0 md-lg:ml-4">
          <RightSideBar />
        </aside>
      </div>
    </div>
  );
};

export default Question;

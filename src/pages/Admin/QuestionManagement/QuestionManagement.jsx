import React from "react";
import QuestionManageMainBar from "../../../components/Admin/QuestionManageMainBar/QuestionManageMainBar";
import SideMenu from "../../../components/Admin/SideMenu/SideMenu";

const QuestionManagement = () => {
  return (
    <div className="flex relative min-h-screen ">
      <div className="bg-blue-900 flex-grow">
        <SideMenu></SideMenu>
      </div>
      <main className="w-full bg-white pt-4 h-fit shadow-xl ">
        <QuestionManageMainBar></QuestionManageMainBar>
      </main>
    </div>
  );
};

export default QuestionManagement;

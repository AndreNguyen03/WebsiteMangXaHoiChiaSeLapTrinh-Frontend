import React from "react";
import AnswerManageMainBar from "../../../components/Admin/AnswerManageMainBar/AnswerManageMainBar";
import SideMenu from "../../../components/Admin/SideMenu/SideMenu";

const AnswerManagement = () => {
  return (
    <div className="flex w-screen relative min-h-screen ">
      <div className="bg-blue-900 flex-grow">
        <SideMenu></SideMenu>
      </div>
      <main className="w-full bg-white pt-4 h-fit shadow-xl ">
        <AnswerManageMainBar></AnswerManageMainBar>
      </main>
    </div>
  );
};

export default AnswerManagement;

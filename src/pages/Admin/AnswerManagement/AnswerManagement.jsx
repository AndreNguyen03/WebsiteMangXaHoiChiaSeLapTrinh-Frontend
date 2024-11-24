import React from "react";
import AnswerManageMainBar from "../../../components/Admin/AnswerManageMainBar/AnswerManageMainBar";
import SideMenu from "../../../components/Admin/SideMenu/SideMenu";

const AnswerManagement = () => {
  return (
    <div className="flex h-fit">
      <SideMenu></SideMenu>
      <main className="w-full bg-white pt-4 h-fit shadow-xl ">
        <AnswerManageMainBar></AnswerManageMainBar>
      </main>
    </div>
  );
};

export default AnswerManagement;

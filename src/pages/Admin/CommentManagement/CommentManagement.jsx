import React from "react";
import CommentManageMainBar from "../../../components/Admin/CommentManageMainBar/CommentManageMainBar";
import SideMenu from "../../../components/Admin/SideMenu/SideMenu";

const CommentManagement = () => {
  return (
    <div className="flex w-screen relative min-h-screen ">
      <div className="bg-blue-900 flex-grow">
        <SideMenu></SideMenu>
      </div>
      <main className="w-full bg-white pt-4 h-fit shadow-xl ">
        <CommentManageMainBar></CommentManageMainBar>
      </main>
    </div>
  );
};

export default CommentManagement;

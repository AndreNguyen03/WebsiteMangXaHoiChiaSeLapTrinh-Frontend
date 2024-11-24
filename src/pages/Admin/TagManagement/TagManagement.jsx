import React from "react";
import SideMenu from "../../../components/Admin/SideMenu/SideMenu";
import TagManageMainBar from "../../../components/Admin/TagManageMainBar/TagManageMainBar";

const TagManagement = () => {
  return (
    <div className="flex h-fit">
      <SideMenu></SideMenu>
      <main className="w-full bg-white pt-4 h-fit shadow-xl ">
        <TagManageMainBar></TagManageMainBar>
      </main>
    </div>
  );
};

export default TagManagement;

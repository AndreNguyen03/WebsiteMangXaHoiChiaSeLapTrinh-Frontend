import React from "react";
import RoleManageMainBar from "../../../components/Admin/RoleManageMainBar/RoleManageMainBar";
import SideMenu from "../../../components/Admin/SideMenu/SideMenu";

const RoleManagement = () => {
  return (
    <div className="flex w-screen relative min-h-screen ">
      <div className="bg-blue-900 flex-grow">
        <SideMenu></SideMenu>
      </div>
      <main className="w-full bg-white pt-4 h-fit shadow-xl ">
        <RoleManageMainBar></RoleManageMainBar>
      </main>
    </div>
  );
};

export default RoleManagement;

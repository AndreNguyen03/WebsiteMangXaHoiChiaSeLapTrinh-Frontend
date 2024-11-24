import React from "react";
import RoleManageMainBar from "../../../components/Admin/RoleManageMainBar/RoleManageMainBar";
import SideMenu from "../../../components/Admin/SideMenu/SideMenu";

const RoleManagement = () => {
  return (
    <div className="flex h-fit">
      <SideMenu></SideMenu>
      <main className="w-full bg-white pt-4 h-fit shadow-xl ">
        <RoleManageMainBar></RoleManageMainBar>
      </main>
    </div>
  );
};

export default RoleManagement;

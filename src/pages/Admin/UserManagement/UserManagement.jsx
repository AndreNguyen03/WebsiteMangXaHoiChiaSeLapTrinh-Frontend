import React from "react";
import UserManageMainBar from "../../../components/Admin/UserManageMainBar/UserManageMainBar";
import SideMenu from "../../../components/Admin/SideMenu/SideMenu";

const UserManagement = () => {
  return (
    <div className="flex h-fit">
      <SideMenu></SideMenu>
      <main className="w-full bg-white pt-4 h-fit shadow-xl ">
        <UserManageMainBar></UserManageMainBar>
      </main>
    </div>
  );
};

export default UserManagement;

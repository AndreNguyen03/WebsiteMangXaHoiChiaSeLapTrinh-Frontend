import React from "react";
import UserManageMainBar from "../../../components/Admin/UserManageMainBar/UserManageMainBar";
import SideMenu from "../../../components/Admin/SideMenu/SideMenu";

const UserManagement = () => {
  return (
    <div className="flex w-screen min-h-screen ">
      <div className="bg-blue-900 flex-grow">
        <SideMenu></SideMenu>
      </div>
      <main className="w-full min-h-screen h-fit shadow-xl ">
        <UserManageMainBar></UserManageMainBar>
      </main>
    </div>
  );
};

export default UserManagement;

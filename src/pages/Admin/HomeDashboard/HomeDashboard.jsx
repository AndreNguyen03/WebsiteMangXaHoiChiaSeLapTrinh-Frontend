import React from "react";
import SideMenu from "../../../components/Admin/SideMenu/SideMenu";
import AdminHomeMainBar from "../../../components/Admin/AdminHomeMainBar/AdminHomeMainBar";

const HomeDashboard = () => {
  return (
    <div className="flex relative min-h-screen ">
      <div className="bg-blue-900 flex-grow">
        <SideMenu></SideMenu>
      </div>
      <main className="w-full bg-white pt-4 h-fit shadow-xl ">
        <AdminHomeMainBar></AdminHomeMainBar>
      </main>
    </div>
  );
};

export default HomeDashboard;

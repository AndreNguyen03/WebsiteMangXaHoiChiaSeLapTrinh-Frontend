import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import UserMainBar from "../../components/UserMainBar/UserMainBar";

const Users = () => {
  return (
    <div className="container mx-auto flex mt-4 h-screen">
      <aside className="hidden md:block md:w-1/6 p-8 shadow-2xl sidebar">
        <LeftSideBar></LeftSideBar>
      </aside>
      <main className="w-5/6 bg-white pt-4  shadow-xl ml-4">
        <UserMainBar></UserMainBar>
      </main>
    </div>
  );
};

export default Users;
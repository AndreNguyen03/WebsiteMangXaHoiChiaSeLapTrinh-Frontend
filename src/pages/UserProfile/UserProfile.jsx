import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import UserProfileMainBar from "../../components/UserProfileMainBar/UserProfileMainBar";

const UserProfile = () => {
  return (
    <div className="container mx-auto flex mt-4 h-fit">
      <aside className="hidden md:block md:w-1/6 bg-white shadow-2xl flex-grow">
        <LeftSideBar></LeftSideBar>
      </aside>
      <main className="w-5/6 h-fit bg-white py-4 shadow-xl ml-4">
        <UserProfileMainBar></UserProfileMainBar>
      </main>
    </div>
  );
};

export default UserProfile;

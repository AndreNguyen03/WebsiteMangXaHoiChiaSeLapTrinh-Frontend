import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import TagMainBar from "../../components/TagMainBar/TagMainBar";

const Tags = () => {
  return (
    <div className="container mx-auto flex mt-4 h-screen">
      <aside className="w-1/6 bg-white p-8 shadow-2xl sidebar">
        <LeftSideBar></LeftSideBar>
      </aside>
      <main className="w-full bg-white pt-4  shadow-xl ml-4">
        <TagMainBar></TagMainBar>
      </main>
    </div>
  );
};

export default Tags;

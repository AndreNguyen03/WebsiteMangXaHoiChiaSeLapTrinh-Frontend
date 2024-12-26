import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import TagMainBar from "../../components/TagMainBar/TagMainBar";

const Tags = () => {
  return (
    <div className="container w-screen mx-auto flex mt-4 h-fit">
      <aside className="w-2/12 md:block md:w-1/6 shadow-2xl bg-white flex-grow">
        <LeftSideBar></LeftSideBar>
      </aside>
      <main className=" md:w-5/6 bg-white pt-4  h-fit shadow-xl ml-4">
        <TagMainBar></TagMainBar>
      </main>
    </div>
  );
};

export default Tags;

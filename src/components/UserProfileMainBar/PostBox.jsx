import React from "react";
import Post from "./Post";
import SortingGroupBar from "../SortingGroupBar/SortingGroupBar";
import { useState } from "react";

const sortingOptions = ["All", "Questions", "Answers"];

const PostBox = ({ posts }) => {
  const [sorting, setSorting] = useState("All");

  return (
    <div
      className="h-full w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100
p-4 mt-6"
    >
      <div className="flex justify-between flex-col sm:flex-row mb-3 gap-2">
        <h3 className="text-lg  text-center font-semibold">All Posts</h3>
        <div className="flex justify-center">
          <SortingGroupBar
            sortingOptions={sortingOptions}
            active={sorting}
            onChange={setSorting}
          />
        </div>
        {/* <Button outline gradientDuoTone="cyanToBlue" size="xs" pill>
          Edit
        </Button> */}
      </div>
      <div className="divide-y divide-[#e5e5e5]">
        {posts.map((post, index) => (
          <Post key={index} post={post}></Post>
        ))}
      </div>
    </div>
  );
};

export default PostBox;

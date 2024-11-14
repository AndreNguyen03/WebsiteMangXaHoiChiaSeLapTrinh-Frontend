import React from "react";
import Post from "./Post";

const PostBox = ({ posts }) => {
  return (
    <div
      className="h-full w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100
p-4 mt-6"
    >
      <div className="flex justify-between mb-3">
        <h3 className="text-lg font-semibold">All Posts</h3>
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

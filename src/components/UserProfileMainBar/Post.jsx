import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div className="flex items-center p-4 hover:bg-[#f5f5f7] transition-colors duration-200">
      <div className="flex-shrink-0 w-12 h-12 bg-[#34c759] rounded-lg flex items-center justify-center text-white font-medium">
        {post.type}
      </div>
      <Link to={`/Questions/${post.id}`} className="ml-4 flex-1 min-w-0">
        <p className="text-[#1d1d1f] hover:text-blue-400 font-medium line-clamp-1">
          {post.title}
        </p>
      </Link>
      <div className="ml-4 flex-shrink-0">
        <span className="text-[#86868b] text-sm">{post.date}</span>
      </div>
    </div>
  );
};

export default Post;

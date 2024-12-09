import React from "react";
import { Link } from "react-router-dom";

const HotQuestion = ({ post }) => {
  return (
    <div className="flex items-start mb-2">
      <span className="font-bold mr-2">{post.answers.length}</span>
      <Link
        to={`/Questions/${post.id}`}
        className="text-blue-600 hover:underline"
      >
        {post.title}
      </Link>
    </div>
  );
};

export default HotQuestion;

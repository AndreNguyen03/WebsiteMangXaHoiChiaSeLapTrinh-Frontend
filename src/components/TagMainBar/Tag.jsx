import React from "react";
import { Link } from "react-router-dom";

const Tag = ({ tag }) => {
  return (
    <Link
      to={`/questions/tags/${tag.id}`}
      className="group flex flex-col bg-tag-background border border-tag-border rounded-lg p-4 shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm bg-gray-200 rounded-lg p-2 font-medium text-gray-900">
          {tag.tagname}
        </span>
        <span className="text-xs text-tag-count bg-white px-2 py-0.5 rounded-full">
          {tag.posttags.length.toLocaleString()} questions
        </span>
      </div>
      <p className="text-sm text-gray-600 line-clamp-4">{tag.description}</p>
      {/* <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-tag-count">
          {Math.floor(tag.count / 30)} asked today
        </span>
        <span className="text-xs text-tag-count">
          {Math.floor(tag.count / 7)} this week
        </span>
      </div> */}
    </Link>
  );
};

export default Tag;

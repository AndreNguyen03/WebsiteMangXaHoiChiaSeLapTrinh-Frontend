import React from "react";

const TagBox = ({ tags }) => {
  return (
    <div className="glassmorphism p-4 mt-6">
      <h3 className="text-lg font-semibold mb-3">Watched Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors duration-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagBox;

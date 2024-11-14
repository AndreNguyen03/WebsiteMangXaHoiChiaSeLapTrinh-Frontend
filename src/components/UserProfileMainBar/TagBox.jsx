import React from "react";
import { Button } from "flowbite-react";

const TagBox = ({ tags }) => {
  return (
    <div
      className="h-full w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100
 p-4 mt-6"
    >
      <div className="flex justify-between mb-3">
        <h3 className="text-lg font-semibold">Watched Tags</h3>
        <Button outline gradientDuoTone="cyanToBlue" size="xs" pill>
          Edit
        </Button>
      </div>
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

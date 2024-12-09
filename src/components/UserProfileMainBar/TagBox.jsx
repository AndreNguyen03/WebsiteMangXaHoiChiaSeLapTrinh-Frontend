import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const TagBox = ({ tags }) => {
  return (
    <div
      className="h-fit w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100
 p-4 mt-6"
    >
      <div className="flex justify-between mb-3">
        <h3 className="text-lg font-semibold">Các thẻ đã theo dõi</h3>
        <Button
          outline
          gradientDuoTone="cyanToBlue"
          className="text-center align-text-bottom "
          size="xs"
          pill
        >
          <span className="flex items-center justify-center ">Chỉnh sửa</span>
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags ? (
          tags.map((tag, index) => (
            <Link
              to={`/questions/tags/${tag.id}`}
              key={index}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors duration-200"
            >
              {tag.name}
            </Link>
          ))
        ) : (
          <p className="text-gray-500">Không có thẻ nào</p>
        )}
      </div>
    </div>
  );
};

export default TagBox;

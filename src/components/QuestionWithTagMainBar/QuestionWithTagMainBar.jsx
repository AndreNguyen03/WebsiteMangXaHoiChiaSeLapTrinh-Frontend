import React from "react";
import { Link } from "react-router-dom";
import QuestionList from "../HomeMainBar/QuestionList";
import QuestionSorting from "../QuestionMainBar/QuestionSorting";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";

const QuestionWithTagMainBar = () => {
  const user = 1;
  const [isUserWatchingTag, setUserWatchingTag] = useState(false);

  const [posts, setPosts] = useState([]);
  const [sorting, setSorting] = useState("Newest");

  const handleWatchTag = () => {
    setUserWatchingTag(!isUserWatchingTag);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5114/api/Posts/postshome") // Gọi API
      .then((response) => {
        console.log(response.data);
        setPosts(response.data); // Lưu dữ liệu sản phẩm từ API vào state
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  return (
    <>
      <div className="grid grid-rows-2 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Tag name</h1>
          <Link
            to={user === null ? "/Login" : "/AskQuestion"}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Ask Question
          </Link>
        </div>
        <p className="line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit nisi
          ipsum eaque ut aperiam, nemo culpa, iure maxime quae blanditiis labore
          praesentium asperiores autem, earum est perferendis soluta tenetur.
          Ullam!
        </p>
      </div>

      {isUserWatchingTag ? (
        <Button
          outline
          gradientDuoTone="greenToBlue"
          size="sm"
          pill
          onClick={handleWatchTag}
        >
          Watching
        </Button>
      ) : (
        <Button className="bg-blue-500" size="sm" pill onClick={handleWatchTag}>
          Watch
        </Button>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 my-4">
        <span className="text-lg">{posts.length} questions</span>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <QuestionSorting
            active={sorting}
            onChange={setSorting}
          ></QuestionSorting>
          <button className="flex items-center py-1.5 px-3 border border-blue-500 rounded text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            Filter
          </button>
        </div>
      </div>
      <div className="bg-white rounded shadow-sm border-gray-300 border mb-4">
        {posts.length > 0 ? (
          <QuestionList posts={posts} />
        ) : (
          <p className="text-gray-600 text-center p-4">
            There's currently no question available. Please check back later.
          </p>
        )}
      </div>
    </>
  );
};

export default QuestionWithTagMainBar;
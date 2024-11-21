import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SortingGroupBar from "../SortingGroupBar/SortingGroupBar";
import Tag from "./Tag";
import axios from "axios";
import { useState, useEffect } from "react";

const sortingOptions = ["Popular", "Name"];

// const tags = [
//   {
//     name: "javascript",
//     count: 2536508,
//     description:
//       "For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations.",
//   },
//   {
//     name: "python",
//     count: 2215310,
//     description:
//       "Python is a dynamically typed, multi-purpose programming language designed to be quick to learn, understand, and use.",
//   },
//   {
//     name: "java",
//     count: 1921777,
//     description:
//       "Java is a high-level object-oriented programming language. Use this tag when you're having problems using or understanding the language itself.",
//   },
//   {
//     name: "c#",
//     count: 1624662,
//     description:
//       "C# is a high-level, statically typed, multi-paradigm programming language developed by Microsoft.",
//   },
//   // Add more tags as needed
// ];

const TagMainBar = () => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("Popular");

  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5114/api/Tags") // Gọi API
      .then((response) => {
        console.log(response.data);
        setTags(response.data); // Lưu dữ liệu sản phẩm từ API vào state
      })
      .catch((error) => {
        console.error("There was an error fetching the tags!", error);
      });
  }, []);

  const filteredTags = tags
    .filter((tag) => tag.tagname.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sorting === "Popular") return b.posttags.length - a.posttags.length;
      if (sorting === "Name") return a.tagname.localeCompare(b.tagname);
      return Math.random() - 0.5; // Simplified "New" sorting
    });

  return (
    <div className="min-h-screen bg-white">
      <div className="container">
        <div className="max-w-4xl pt-2 ">
          <h1 className="text-xl font-bold mb-2">Tags</h1>
          <p className="text-gray-600 mb-8">
            A tag is a keyword or label that categorizes your question with
            other, similar questions. Using the right tags makes it easier for
            others to find and answer your question.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Filter by tag name"
              />
            </div>
            <div className="flex justify-center">
              <SortingGroupBar
                sortingOptions={sortingOptions}
                active={sorting}
                onChange={setSorting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTags.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagMainBar;

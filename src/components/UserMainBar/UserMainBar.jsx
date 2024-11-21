import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SortingGroupBar from "../SortingGroupBar/SortingGroupBar";
import User from "./User";
import { useState, useEffect } from "react";
import axios from "axios";

const sortingOptions = ["New Users", "Name", "Most Answers", "Most Questions"];

const users = [
  {
    name: "Alice",
    numberOfAnswers: 42,
    numberOfQuestions: 10,
    dateCreated: "2023-01-15",
  },
  {
    name: "Bob",
    numberOfAnswers: 35,
    numberOfQuestions: 5,
    dateCreated: "2023-02-20",
  },
  {
    name: "Charlie",
    numberOfAnswers: 50,
    numberOfQuestions: 20,
    dateCreated: "2023-03-10",
  },
  {
    name: "Diana",
    numberOfAnswers: 60,
    numberOfQuestions: 15,
    dateCreated: "2023-04-05",
  },
  // Add more users as needed
];

const UserMainBar = () => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("New Users");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5114/api/Users") // Gọi API
      .then((response) => {
        console.log(response.data);
        setUsers(response.data); // Lưu dữ liệu sản phẩm từ API vào state
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sorting === "Name") return a.username.localeCompare(b.username);
      if (sorting === "New Users")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sorting === "Most Answers")
        return b.answers.length - a.answers.length;
      if (sorting === "Most Questions") return b.posts.length - a.posts.length;
      return 0; // Default case if no sorting matches
    });

  return (
    <div className="min-h-screen bg-white">
      <div className="container">
        <div className="max-w-4xl pt-2 ">
          <h1 className="text-xl font-bold mb-4">Users</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Filter by user"
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
            {filteredUsers.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMainBar;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import SearchBar from "../SearchBar/SearchBar";
import SortingGroupBar from "../SortingGroupBar/SortingGroupBar";
import User from "./User";

const sortingOptions = [
  "Người Dùng Mới",
  "Tên",
  "Nhiều Câu Trả Lời Nhất",
  "Nhiều Câu Hỏi Nhất",
];

const UserMainBar = () => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("Người Dùng Mới");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5114/api/Users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi tải người dùng!", error);
      });
  }, []);

  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sorting === "Tên") return a.username.localeCompare(b.username);
      if (sorting === "Người Dùng Mới")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sorting === "Nhiều Câu Trả Lời Nhất")
        return b.answers.length - a.answers.length;
      if (sorting === "Nhiều Câu Hỏi Nhất")
        return b.posts.length - a.posts.length;
      return 0;
    });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      <div className="container">
        <div className="max-w-4xl pt-2">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl font-bold mb-4"
          >
            Người Dùng
          </motion.h1>
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Lọc theo tên người dùng"
              />
            </div>
            <div className="flex justify-center">
              <SortingGroupBar
                sortingOptions={sortingOptions}
                active={sorting}
                onChange={setSorting}
              />
            </div>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {filteredUsers.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserMainBar;

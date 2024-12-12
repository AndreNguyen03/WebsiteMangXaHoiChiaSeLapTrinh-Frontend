import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import QuestionList from "../HomeMainBar/QuestionList";
import SortingGroupBar from "../SortingGroupBar/SortingGroupBar";
import AskQuestionButton from "../HomeMainBar/AskQuestionButton";

const sortingOptions = ["Mới nhất", "Tên", "Chưa trả lời"];

const QuestionMainBar = () => {
  const user = 1;
  const [posts, setPosts] = useState([]);
  const [sorting, setSorting] = useState("Mới nhất");

  useEffect(() => {
    axios
      .get("http://localhost:5114/api/Posts")
      .then((response) => {
        const mappedData = response.data.map((post) => ({
          id: post.id,
          title: post.title,
          body: post.tryAndExpecting,
          createdAt: post.createdAt,
          views: post.views,
          upvote: post.upvote,
          downvote: post.downvote,
          posttags: post.posttags,
          user: post.user,
          answers: post.answers,
        }));
        setPosts(mappedData);
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi tải bài đăng!", error);
      });
  }, []);

  const filteredPosts = posts.sort((a, b) => {
    if (sorting === "Mới nhất") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sorting === "Tên") {
      return a.title.localeCompare(b.title);
    }
    if (sorting === "Chưa trả lời") {
      return a.answers.length - b.answers.length;
    }
    return 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex justify-between items-center">
        <motion.h1
          className="text-xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Tất cả câu hỏi
        </motion.h1>
        <AskQuestionButton />
      </div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.span className="text-lg" whileHover={{ scale: 1.05 }}>
          {posts.length} câu hỏi
        </motion.span>
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SortingGroupBar
            sortingOptions={sortingOptions}
            active={sorting}
            onChange={setSorting}
          />
          {/* <motion.button
            className="flex items-center py-1.5 px-3 border border-blue-500 rounded text-blue-500 hover:bg-blue-50 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
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
            Lọc
          </motion.button> */}
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          className="bg-white rounded shadow-sm border-gray-300 border mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {filteredPosts.length > 0 ? (
            <QuestionList posts={filteredPosts} />
          ) : (
            <motion.p
              className="text-gray-600 text-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Hiện tại chưa có câu hỏi nào. Vui lòng kiểm tra lại sau.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionMainBar;

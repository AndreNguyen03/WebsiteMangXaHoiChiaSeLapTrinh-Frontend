import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "flowbite-react";

import QuestionList from "../HomeMainBar/QuestionList";
import SortingGroupBar from "../SortingGroupBar/SortingGroupBar";
import AskQuestionButton from "../HomeMainBar/AskQuestionButton";

const sortingOptions = ["Mới nhất", "Tên", "Chưa trả lời"];

const QuestionMainBar = () => {
  const user = 1;
  const [posts, setPosts] = useState([]);
  const [sorting, setSorting] = useState("Mới nhất");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
      })
      .finally(() => {
        setIsLoading(false);
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
      <div className="mb-4 flex-col md:flex-row gap-4 flex justify-between items-center">
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
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          className="bg-white rounded shadow-sm border-gray-300 border mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {isLoading ? (
            <motion.div
              className="flex flex-col items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Spinner color="info" size="xl"></Spinner>
              <p className="text-gray-600 mt-4">
                Đang tải câu hỏi, vui lòng chờ...
              </p>
            </motion.div>
          ) : filteredPosts.length > 0 ? (
            <QuestionList posts={filteredPosts} />
          ) : (
            <motion.p
              className="text-gray-600 text-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Hiện tại không có câu hỏi nào. Vui lòng quay lại sau.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionMainBar;

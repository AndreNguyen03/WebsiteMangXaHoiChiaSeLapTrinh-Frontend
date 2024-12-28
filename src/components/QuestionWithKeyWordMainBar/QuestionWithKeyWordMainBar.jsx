import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import QuestionList from "../HomeMainBar/QuestionList";
import SortingGroupBar from "../SortingGroupBar/SortingGroupBar";
import AskQuestionButton from "../HomeMainBar/AskQuestionButton";

const sortingOptions = ["Mới nhất", "Tên", "Chưa trả lời"];

const QuestionWithKeyWordMainBar = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [sorting, setSorting] = useState("Mới nhất"); // Default sorting

  useEffect(() => {
    if (keyword) {
      setLoading(true);
      axios
        .get(
          `http://localhost:5114/api/Posts/searchPostByKeyWord?keyWord=${encodeURIComponent(
            keyword
          )}`
        )
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
          console.error("There was an error fetching the posts!", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [keyword]);

  const sortedPosts = posts.sort((a, b) => {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
        <motion.h1
          className="text-xl font-bold"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {keyword
            ? `Kết quả tìm kiếm cho từ khóa: ${keyword}`
            : "Tất cả câu hỏi"}
        </motion.h1>
        <AskQuestionButton />
      </div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between gap-2 my-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.span className="text-lg" whileHover={{ scale: 1.05 }}>
          {posts.length} câu hỏi
        </motion.span>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <SortingGroupBar
            sortingOptions={sortingOptions}
            active={sorting}
            onChange={setSorting}
          />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          className="bg-white rounded shadow-sm border-gray-300 border mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {loading ? (
            <motion.p
              className="text-gray-600 text-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Câu hỏi đang được tải...
            </motion.p>
          ) : sortedPosts.length > 0 ? (
            <QuestionList posts={sortedPosts} />
          ) : (
            <motion.p
              className="text-gray-600 text-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Hiện tại không có câu hỏi nào. Vui lòng kiểm tra lại sau.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionWithKeyWordMainBar;

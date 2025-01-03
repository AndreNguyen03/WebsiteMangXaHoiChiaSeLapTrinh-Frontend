import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { motion } from "framer-motion";

import QuestionList from "./QuestionList";
import AskQuestionButton from "./AskQuestionButton";

const HomeMainBar = () => {
  const user = 1;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Đang tải dữ liệu
    axios
      .get("http://localhost:5114/api/Posts/gethomepost") // Gọi API
      .then((response) => {
        // Chuyển đổi dữ liệu API theo định dạng custom
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

        setPosts(mappedData); // Lưu vào state
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi lấy bài đăng!", error);
      })
      .finally(() => {
        setIsLoading(false); // Kết thúc tải dữ liệu
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <motion.h1
          className="text-xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Các câu hỏi thú vị dành cho bạn
        </motion.h1>
        <AskQuestionButton />
      </div>
      <motion.div
        className="bg-white rounded shadow-sm border-gray-300 border mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
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
        ) : posts.length > 0 ? (
          <QuestionList posts={posts} />
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
    </motion.div>
  );
};

export default HomeMainBar;

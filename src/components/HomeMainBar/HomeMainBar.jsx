import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuestionList from "./QuestionList";
import axios from "axios";
import { motion } from "framer-motion";

const HomeMainBar = () => {
  const user = 1;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5114/api/Posts") // Gọi API
      .then((response) => {
        console.log(response.data);

        // Chuyển đổi dữ liệu API theo định dạng custom
        const mappedData = response.data.map((post) => ({
          id: post.id, // Đổi id thành customId
          title: post.title, // Đổi title thành customTitle
          body: post.tryAndExpecting, // Đổi content thành customContent
          createdAt: post.createdAt, // Đổi createdAt thành customDate
          views: post.views, // Đổi views thành customViews
          upvote: post.upvote, // Đổi upvote thành customUpvote
          downvote: post.downvote, // Đổi downvote thành customDownvote
          posttags: post.posttags, // Đổi posttags thành customTags
          user: post.user, // Đổi user thành customUser
          answers: post.answers, // Đổi answers thành customAnswers
        }));

        setPosts(mappedData); // Lưu vào state custom
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

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
          Interesting posts for you
        </motion.h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={user === null ? "/Login" : "/AskQuestion"}
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white px-4 py-2 rounded-lg"
          >
            Ask Question
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="bg-white rounded shadow-sm border-gray-300 border mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {posts.length > 0 ? (
          <QuestionList posts={posts} />
        ) : (
          <motion.p
            className="text-gray-600 text-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            There's currently no question available. Please check back later.
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HomeMainBar;

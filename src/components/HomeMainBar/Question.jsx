import React from "react";
import { Link, useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import "./Question.css";

const Question = ({ question, watchedTags }) => {
  const location = useLocation().pathname;
  const [validWatchedTags, setValidWatchedTags] = useState(watchedTags || []); // Lưu danh sách watchedTags hợp lệ

  // useEffect để cập nhật validWatchedTags nếu watchedTags thay đổi
  useEffect(() => {
    if (watchedTags) {
      setValidWatchedTags(watchedTags);
    } else {
      setValidWatchedTags([]); // Đặt giá trị mặc định nếu watchedTags là null
    }
  }, [watchedTags]);

  // Kiểm tra nếu có tagId trong watchedTags trùng với tagId của câu hỏi
  const isWatched = question.posttags.some((tag) =>
    validWatchedTags.some((watchedTag) => watchedTag.id === tag.tag.id)
  );

  return (
    <motion.div
      className="flex items-baseline mb-4"
      style={{
        backgroundColor: isWatched ? "rgba(0, 255, 0, 0.1)" : "transparent", // Đặt màu nền nếu là watched
      }}
      whileHover={{
        backgroundColor: isWatched
          ? "rgba(0, 255, 0, 0.2)"
          : "rgba(0,0,0,0.01)",
      }} // Đổi màu khi hover
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="w-2/12 h-full flex-col py-4 justify-items-end"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.p className="question-properties" whileHover={{ scale: 1.05 }}>
          {question.upvote - question.downvote} phiếu bầu
        </motion.p>
        <motion.p className="question-properties" whileHover={{ scale: 1.05 }}>
          {question.answers.length} câu trả lời
        </motion.p>
        <motion.p className="question-properties" whileHover={{ scale: 1.05 }}>
          {question.views} lượt xem
        </motion.p>
      </motion.div>
      <motion.div
        className="w-11/12 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Link
          to={`/Questions/${question.id}`}
          className="text-blue-500 font-medium hover:text-blue-600 transition-colors duration-200"
        >
          {question.title}
        </Link>
        {location.startsWith("/questions") && (
          <motion.span
            className="block text-gray-600 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {question.body}
          </motion.span>
        )}
        <motion.div
          className="flex items-center text-xs text-gray-600 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {question.posttags.map((tag, index) => (
            <motion.span
              key={index}
              className="question-tags"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {tag.tag.tagname}
            </motion.span>
          ))}
          <motion.span className="ml-auto" whileHover={{ scale: 1.02 }}>
            <img
              src={question.user.gravatar}
              alt="ảnh đại diện"
              className="mr-2 relative inline-block size-6 !rounded-full object-cover object-center"
            />
            {question.user.username}
            <span className="text-gray-400 ml-2">
              {formatDistanceToNow(new Date(question.createdAt), {
                addSuffix: true,
                locale: vi,
              })}
            </span>
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Question;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import { ThumbsUp, MessageSquare, Eye } from "lucide-react"; // Import lucide-react icons

import "./Question.css";
import { nav } from "motion/react-client";

const Question = ({ question, watchedTags, ignoreTags }) => {
  const location = useLocation().pathname;
  const [validWatchedTags, setValidWatchedTags] = useState(watchedTags || []); // Lưu danh sách watchedTags hợp lệ
  const [validIgnoreTags, setValidIgnoreTags] = useState(ignoreTags || []); // Lưu danh sách ignoreTags hợp lệ

  // useEffect để cập nhật validWatchedTags nếu watchedTags thay đổi
  useEffect(() => {
    if (watchedTags) {
      setValidWatchedTags(watchedTags);
    } else {
      setValidWatchedTags([]); // Đặt giá trị mặc định nếu watchedTags là null
    }
  }, [watchedTags]);

  // useEffect để cập nhật validIgnoreTags nếu ignoreTags thay đổi
  useEffect(() => {
    if (ignoreTags) {
      setValidIgnoreTags(ignoreTags);
    } else {
      setValidIgnoreTags([]); // Đặt giá trị mặc định nếu ignoreTags là null
    }
  }, [ignoreTags]);

  // Kiểm tra nếu có tagId trong ignoreTags trùng với tagId của câu hỏi
  const isIgnored = question.posttags.some((tag) =>
    validIgnoreTags.some((ignoreTag) => ignoreTag.id === tag.tag.id)
  );

  // Kiểm tra nếu có tagId trong watchedTags trùng với tagId của câu hỏi
  const isWatched = question.posttags.some((tag) =>
    validWatchedTags.some((watchedTag) => watchedTag.id === tag.tag.id)
  );

  return (
    <motion.div
      className="flex items-baseline"
      style={{
        backgroundColor: isIgnored
          ? "rgba(255, 165, 0, 0.1)" // Màu cam nếu bị ignore
          : isWatched
          ? "rgba(0, 255, 0, 0.1)" // Màu xanh lá nếu được watch
          : "transparent", // Không có màu nếu không thuộc loại nào
      }}
      whileHover={{
        backgroundColor: isIgnored
          ? "rgba(255, 165, 0, 0.2)" // Hover màu cam nếu bị ignore
          : isWatched
          ? "rgba(0, 255, 0, 0.2)" // Hover màu xanh lá nếu được watch
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
        {/* Hiển thị icon khi màn hình nhỏ hơn md */}
        <motion.p className="question-properties" whileHover={{ scale: 1.05 }}>
          <span className="hidden md:inline">
            {question.upvote - question.downvote} phiếu bầu
          </span>
          <span className=" md:hidden flex items-center">
            <ThumbsUp className="mr-1" /> {question.upvote - question.downvote}
          </span>
        </motion.p>
        <motion.p className="question-properties" whileHover={{ scale: 1.05 }}>
          <span className="hidden md:inline">
            {question.answers.length} câu trả lời
          </span>
          <span className=" md:hidden flex items-center">
            <MessageSquare className="mr-1" /> {question.answers.length}
          </span>
        </motion.p>
        <motion.p className="question-properties" whileHover={{ scale: 1.05 }}>
          <span className="hidden md:inline">{question.views} lượt xem</span>
          <span className=" md:hidden flex items-center">
            <Eye className="mr-1" /> {question.views}
          </span>
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
          <span className=" line-clamp-1 md:line-clamp-2">
            {question.title}
          </span>
        </Link>
        {location.startsWith("/questions") && (
          <motion.span
            className="block text-gray-600 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className=" line-clamp-1 md:line-clamp-3">
              {question.body}
            </span>
          </motion.span>
        )}
        <motion.div
          className="flex items-center text-xs text-gray-600 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {question.posttags.slice(0, 2).map((tag, index) => (
            <motion.span
              key={index}
              className="question-tags"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {tag.tag.tagname}
            </motion.span>
          ))}
          {question.posttags.length > 2 && (
            <motion.span
              className="question-tags more-tags"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              ...
            </motion.span>
          )}

          <motion.span className="ml-auto" whileHover={{ scale: 1.02 }}>
            <img
              src={question.user.gravatar}
              alt="ảnh đại diện"
              className="mr-2 relative inline-block size-6 !rounded-full object-cover object-center"
            />
            <span className="hidden md:inline">{question.user.username}</span>

            <span className="text-gray-400 ml-2 hidden md:inline">
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

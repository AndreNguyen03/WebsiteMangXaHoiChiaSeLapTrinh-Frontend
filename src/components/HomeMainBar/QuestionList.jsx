import React from "react";
import Question from "./Question";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchWatchedTags } from "../../features/WatchedTags/WatchedTags";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const QuestionList = ({ posts }) => {
  const authState = useSelector((state) => state.auth);
  const watchedTags = useSelector((state) => state.watchedTags.tags);
  const ignoreTags = useSelector((state) => state.ignoredTags.tags);

  const dispatch = useDispatch();

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {posts.map((question) => (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Question
            key={question.id}
            question={question}
            watchedTags={watchedTags}
            ignoreTags={ignoreTags}
          />
          <hr className="h-0.5 border-t-0 bg-gray-100" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuestionList;

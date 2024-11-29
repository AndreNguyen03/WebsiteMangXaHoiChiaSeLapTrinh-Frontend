import React from "react";
import Question from "./Question";
import { motion } from "framer-motion";

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
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {posts.map((question) => (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Question key={question.id} question={question} />
          <hr className="h-0.5 border-t-0 bg-gray-100" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuestionList;

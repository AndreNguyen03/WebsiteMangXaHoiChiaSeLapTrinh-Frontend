import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};

const HotQuestion = ({ post }) => {
  return (
    <motion.div
      className="flex items-start mb-2"
      variants={item}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <motion.span className="font-bold mr-2" whileHover={{ scale: 1.1 }}>
        {post.answers.length}
      </motion.span>
      <Link
        to={`/Questions/${post.id}`}
        className="text-blue-600 hover:underline"
      >
        {post.title}
      </Link>
    </motion.div>
  );
};

export default HotQuestion;

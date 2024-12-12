import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Tag = ({ tag }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <motion.div variants={item}>
      <Link
        to={`/questions/tags/${tag.id}`}
        className="group flex flex-col bg-tag-background border border-tag-border rounded-lg p-4 shadow-none transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400 hover:-translate-y-1"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="text-sm bg-gray-200 rounded-lg p-2 font-medium text-gray-900">
            {tag.tagname}
          </span>
          <motion.span
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-xs text-tag-count bg-white px-2 py-0.5 rounded-full"
          >
            {tag.posttags.length.toLocaleString()} câu hỏi
          </motion.span>
        </motion.div>
        <p className="text-sm text-gray-600 line-clamp-4">{tag.description}</p>
      </Link>
    </motion.div>
  );
};

export default Tag;

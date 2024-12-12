import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Function to format date to dd/mm/yy
const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return dateString; // Return original string if date is invalid
  }

  // Pad single digit numbers with leading zero
  const pad = (num) => num.toString().padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // getMonth() returns 0-11
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of year

  return `${day}/${month}/${year}`;
};

const Post = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02, backgroundColor: "#f5f5f7" }}
      className="flex items-center p-4 transition-colors duration-200"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="flex-shrink-0 w-12 h-12 bg-[#34c759] rounded-lg flex items-center justify-center text-white font-medium"
      >
        {post.type}
      </motion.div>
      <motion.div whileHover={{ x: 5 }} className="ml-4 flex-1 min-w-0">
        <Link to={`/Questions/${post.id}`}>
          <p className="text-[#1d1d1f] hover:text-blue-400 font-medium line-clamp-1">
            {post.title}
          </p>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="ml-4 flex-shrink-0"
      >
        <span className="text-[#86868b] text-sm">{formatDate(post.date)}</span>
      </motion.div>
    </motion.div>
  );
};

export default Post;

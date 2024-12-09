import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const AskQuestionButton = () => {
  const authState = useSelector((state) => state.auth);

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={!authState.isAuthenticated ? "/Login" : "/AskQuestion"}
        className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white px-4 py-2 rounded-lg"
      >
        Tạo câu hỏi
      </Link>
    </motion.div>
  );
};

export default AskQuestionButton;

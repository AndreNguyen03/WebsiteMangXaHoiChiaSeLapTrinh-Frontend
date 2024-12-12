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
        className="from-blue-600 bg-gradient-to-r to-cyan-500 transform hover:-translate-y-0.5 transition-all duration-200 text-white px-4 py-2 rounded-lg"
      >
        Tạo câu hỏi
      </Link>
    </motion.div>
  );
};

export default AskQuestionButton;

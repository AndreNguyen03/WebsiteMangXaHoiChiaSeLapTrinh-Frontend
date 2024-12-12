import React from "react";
import Question from "./Question";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

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
  const [watchedTags, setWatchedTags] = useState(null);

  //getwatchtag
  useEffect(() => {
    if (authState.user) {
      axios
        .get(
          `http://localhost:5114/api/Tags/getWatchedTagByUserId?userId=${authState.user}`
        )
        .then((response) => {
          const mappedData = response.data.map((tag) => ({
            id: tag.id,
            name: tag.tagname,
          }));
          setWatchedTags(mappedData);
        })
        .catch((error) => console.error("Error fetching watched tag", error));
    } else {
      setWatchedTags(null);
    }
  }, [authState.isAuthenticated, authState.user]);

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
          />
          <hr className="h-0.5 border-t-0 bg-gray-100" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuestionList;

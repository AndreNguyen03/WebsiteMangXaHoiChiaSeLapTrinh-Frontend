import React from "react";
import Question from "./Question";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Pagination } from "flowbite-react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const paginatedPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const dispatch = useDispatch();

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {paginatedPosts.map((question) => (
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
      <div className="flex justify-between items-center mt-4">
        <Dropdown
          color="teal"
          label={`Hiển thị ${itemsPerPage} mục`}
          onSelect={(e) => handleItemsPerPageChange(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((size) => (
            <Dropdown.Item
              key={size}
              onClick={() => handleItemsPerPageChange(size)}
            >
              {size} mục/trang
            </Dropdown.Item>
          ))}
        </Dropdown>
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(posts.length / itemsPerPage)}
        />
      </div>
    </motion.div>
  );
};

export default QuestionList;

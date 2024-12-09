import React from "react";
import Post from "./Post";
import SortingGroupBar from "../SortingGroupBar/SortingGroupBar";
import { useState } from "react";
import { motion } from "framer-motion";

const sortingOptions = ["All", "Questions", "Answers"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const PostBox = ({ posts }) => {
  const [sorting, setSorting] = useState("All");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 p-4 mt-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between flex-col sm:flex-row mb-3 gap-2"
      >
        <motion.h3
          whileHover={{ scale: 1.05 }}
          className="text-lg text-center font-semibold"
        >
          All Posts
        </motion.h3>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex justify-center"
        >
          <SortingGroupBar
            sortingOptions={sortingOptions}
            active={sorting}
            onChange={setSorting}
          />
        </motion.div>
      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-[#e5e5e5]"
      >
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PostBox;

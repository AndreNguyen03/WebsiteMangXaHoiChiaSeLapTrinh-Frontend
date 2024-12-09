import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
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

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const TagBox = ({ tags }) => {
  return (
    <motion.div
      className="h-fit w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 p-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      <motion.div
        className="flex justify-between mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h3
          className="text-lg font-semibold"
          whileHover={{ scale: 1.05 }}
        >
          Các thẻ đã theo dõi
        </motion.h3>
        <Button
          outline
          gradientDuoTone="cyanToBlue"
          className="text-center align-text-bottom hover:scale-105 transition-transform"
          size="xs"
          pill
        >
          <span className="flex items-center justify-center">Chỉnh sửa</span>
        </Button>
      </motion.div>
      <motion.div
        className="flex flex-wrap gap-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {!tags || tags.length === 0 ? (
          <motion.p
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Không có thẻ nào
          </motion.p>
        ) : (
          tags.map((tag, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={`/questions/tags/${tag.id}`}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors duration-200"
              >
                {tag.name}
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default TagBox;

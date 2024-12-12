import React, { useState, useEffect } from "react";
import { Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const User = ({ user }) => {
  const [avatarSize, setAvatarSize] = useState("md");

  const updateAvatarSize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setAvatarSize("xl");
    } else if (width < 1024) {
      setAvatarSize("lg");
    } else {
      setAvatarSize("md");
    }
  };

  useEffect(() => {
    updateAvatarSize();
    window.addEventListener("resize", updateAvatarSize);
    return () => {
      window.removeEventListener("resize", updateAvatarSize);
    };
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
      <Link to={`/users/${user.id}`}>
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar
            img={user.gravatar}
            size={avatarSize}
            className="justify-evenly border p-2 shadow-none transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-1 font-medium"
            >
              <div>{user.username}</div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                Tham gia từ {formatDate(user.createdAt)}
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                {user.posts.length} câu hỏi
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                {user.answers.length} câu trả lời
              </motion.div>
            </motion.div>
          </Avatar>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default User;

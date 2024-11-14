import React, { useState, useEffect } from "react";
import { Avatar } from "flowbite-react";
import { Link } from "react-router-dom";

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
    // Set initial avatar size
    updateAvatarSize();

    // Add event listener for window resize
    window.addEventListener("resize", updateAvatarSize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateAvatarSize);
    };
  }, []);

  return (
    <Link to={`/users/${user.name}`}>
      <Avatar
        img="https://placehold.co/50"
        size={avatarSize}
        className="justify-evenly border p-2 shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400"
      >
        <div className="space-y-1 font-medium">
          <div>{user.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Joined in {user.dateCreated}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {user.numberOfQuestions} questions
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {user.numberOfAnswers} answers
          </div>
        </div>
      </Avatar>
    </Link>
  );
};

export default User;

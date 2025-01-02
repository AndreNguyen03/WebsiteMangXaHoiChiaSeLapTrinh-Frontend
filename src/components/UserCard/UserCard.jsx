import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Avatar } from "flowbite-react";
//import Avatar from "../Avatar/Avatar"; // Import the Avatar component

const UserCard = ({
  userid,
  gravatar, // Add gravatar prop
  name,
  time,
  type = "question",
  isNewContributor = false,
}) => {
  const bgColor = type === "question" ? "bg-blue-50" : "bg-green-50";
  const textColor = type === "question" ? "text-blue-600" : "text-green-600";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-6 flex justify-end"
    >
      <div
        className={`${bgColor} rounded-lg p-3 inline-flex items-center gap-3`}
      >
        {/* Display Avatar with gravatar or fallback */}
        <div className="">
          {gravatar ? (
            <Avatar img={gravatar} size="md" alt={name}></Avatar>
          ) : (
            <Avatar img="https://placehold.co/600x400.png" /> // Default avatar
          )}
        </div>
        <div>
          {userid ? (
            <Link to={`/users/${userid}`} className="hover:underline">
              <div className={`text-sm font-medium ${textColor}`}>{name}</div>
            </Link>
          ) : (
            <div className="text-sm font-medium text-gray-500">{name}</div>
          )}
          <div className="text-xs text-gray-500">{time}</div>
          {isNewContributor && (
            <div className="text-xs text-blue-500">New contributor</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;

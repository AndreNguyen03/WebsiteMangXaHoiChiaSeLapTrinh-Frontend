import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const UserCard = ({
  userid,
  initials,
  name,
  time,
  type = "question",
  isNewContributor = false,
}) => {
  const bgColor = type === "question" ? "bg-blue-50" : "bg-green-50";
  const textColor = type === "question" ? "text-blue-600" : "text-green-600";
  const avatarBg = type === "question" ? "bg-blue-500" : "bg-green-500";

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
        <div
          className={`w-8 h-8 ${avatarBg} rounded-full flex items-center justify-center text-white`}
        >
          {initials}
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

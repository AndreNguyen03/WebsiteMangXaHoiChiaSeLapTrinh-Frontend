import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const VoteButtons = ({
  votes = 1,
  showCheck = false,
  Upvoted,
  DownVoted,
  onVoteClick,
}) => {
  const [isUpvoted, setIsUpvoted] = useState(Upvoted);
  const [isDownVoted, setIsDownVoted] = useState(DownVoted);

  useEffect(() => {
    setIsUpvoted(Upvoted);
    setIsDownVoted(DownVoted);
  }, [Upvoted, DownVoted]);

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (isUpvoted) onVoteClick(0);
          else onVoteClick(1);
        }}
        className={
          isUpvoted ? "text-green-500" : "text-gray-500 hover:text-blue-500"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      </motion.button>
      <span className="text-lg font-semibold">{votes}</span>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (isDownVoted) onVoteClick(0);
          else onVoteClick(-1);
        }}
        className={
          isDownVoted ? "text-red-500" : "text-gray-500 hover:text-blue-500"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </motion.button>
      {showCheck && (
        <div className="text-green-500 mt-2">
          <Check className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default VoteButtons;

import React from "react";
import { Link, useParams } from "react-router-dom";
import QuestionList from "../HomeMainBar/QuestionList";
import SortingGroupBar from "../SortingGroupBar/SortingGroupBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";
import AskQuestionButton from "../HomeMainBar/AskQuestionButton";

const sortingOptions = ["Newest", "Name", "Unanswered"];

const QuestionWithTagMainBar = () => {
  const user = 1;
  const [isUserWatchingTag, setUserWatchingTag] = useState(false);

  const { tagId } = useParams();
  console.log(tagId);

  const [posts, setPosts] = useState([]);
  const [sorting, setSorting] = useState("Newest");

  const [tag, setTag] = useState({});

  const handleWatchTag = () => {
    setUserWatchingTag(!isUserWatchingTag);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5114/api/Posts/getbytagid?id=${tagId}`) // Gọi API
      .then((response) => {
        console.log(response.data);

        // Chuyển đổi dữ liệu API theo định dạng custom
        const mappedData = response.data.map((post) => ({
          id: post.id, // Đổi id thành customId
          title: post.title, // Đổi title thành customTitle
          body: post.tryAndExpecting, // Đổi content thành customContent
          createdAt: post.createdAt, // Đổi createdAt thành customDate
          views: post.views, // Đổi views thành customViews
          upvote: post.upvote, // Đổi upvote thành customUpvote
          downvote: post.downvote, // Đổi downvote thành customDownvote
          posttags: post.posttags, // Đổi posttags thành customTags
          user: {
            gravatar: "https://placehold.co/600x400/png",
            username: "test",
          }, // Đổi user thành customUser
          answers: post.answers, // Đổi answers thành customAnswers
        }));

        setPosts(mappedData); // Lưu vào state custom
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5114/api/Tags/${tagId}`) // Gọi API
      .then((response) => {
        console.log(response.data);

        // Chuyển đổi dữ liệu API theo định dạng custom
        const mappedData = {
          id: response.data.id, // Đổi id thành customId
          tagname: response.data.tagname, // Đổi title thành customTitle
          description: response.data.description, // Đổi content thành customContent
        };

        setTag(mappedData); // Lưu vào state custom
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, [tagId]);

  const filteredPosts = posts.sort((a, b) => {
    if (sorting === "Newest") {
      // Sắp xếp theo thời gian mới nhất
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sorting === "Name") {
      // Sắp xếp theo tên bài viết
      return a.title.localeCompare(b.title);
    }
    if (sorting === "Unanswered") {
      // Sắp xếp các bài chưa được trả lời (answers = 0)
      return a.answers.length - b.answers.length;
    }
    return 0; // Mặc định không thay đổi thứ tự
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="grid grid-rows-2 mb-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center">
          <motion.h1
            className="text-xl font-bold"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {tag.tagname}
          </motion.h1>
          <AskQuestionButton />
        </div>
        <motion.p
          className="line-clamp-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {tag.description}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        {isUserWatchingTag ? (
          <motion.div
            className="w-fit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              outline
              gradientDuoTone="greenToBlue"
              size="md"
              pill
              onClick={handleWatchTag}
            >
              Watching
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className="w-fit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              gradientMonochrome="cyan"
              size="md"
              pill
              onClick={handleWatchTag}
            >
              Watch
            </Button>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between gap-2 my-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.span className="text-lg" whileHover={{ scale: 1.05 }}>
          {posts.length} questions
        </motion.span>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <SortingGroupBar
            sortingOptions={sortingOptions}
            active={sorting}
            onChange={setSorting}
          />
          <motion.button
            className="flex items-center py-1.5 px-3 border border-blue-500 rounded text-blue-500 hover:bg-blue-50 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            Filter
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          className="bg-white rounded shadow-sm border-gray-300 border mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {filteredPosts.length > 0 ? (
            <QuestionList posts={filteredPosts} />
          ) : (
            <motion.p
              className="text-gray-600 text-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              There's currently no question available. Please check back later.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionWithTagMainBar;

import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import QuestionList from "../HomeMainBar/QuestionList"; // Giả sử bạn đã có component này
import SortingGroupBar from "../SortingGroupBar/SortingGroupBar"; // Giả sử bạn đã có component này
import AskQuestionButton from "../HomeMainBar/AskQuestionButton"; // Giả sử bạn đã có component này
import { useSelector } from "react-redux";

const sortingOptions = ["Newest", "Name", "Unanswered"];

const QuestionWithTagMainBar = () => {
  const authState = useSelector((state) => state.auth);
  const { tagId } = useParams();
  const [isUserWatchingTag, setUserWatchingTag] = useState(false);
  const [userWatchedTags, setUserWatchedTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [sorting, setSorting] = useState("Newest");
  const [tag, setTag] = useState({});

  // Hàm lấy thông tin các tag mà người dùng đang theo dõi
  useEffect(() => {
    if (authState.user) {
      axios
        .get(
          `http://localhost:5114/api/Tags/getWatchedTagByUserId?userId=${authState.user}`
        )
        .then((response) => {
          const watchedTags = response.data;
          setUserWatchedTags(watchedTags);

          // Kiểm tra nếu tag hiện tại có trong danh sách watched tags của người dùng
          const isWatching = watchedTags.some((tag) => tag.id === tagId);
          setUserWatchingTag(isWatching);
        })
        .catch((error) => {
          console.error("There was an error fetching watched tags!", error);
        });
    }
  }, [tagId]);

  // Lấy thông tin về tag hiện tại
  useEffect(() => {
    axios
      .get(`http://localhost:5114/api/Tags/${tagId}`)
      .then((response) => {
        setTag(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tag details!", error);
      });
  }, [tagId]);

  // Lấy thông tin bài viết theo tag
  useEffect(() => {
    axios
      .get(`http://localhost:5114/api/Posts/getbytagid?id=${tagId}`)
      .then((response) => {
        const mappedData = response.data.map((post) => ({
          id: post.id,
          title: post.title,
          body: post.tryAndExpecting,
          createdAt: post.createdAt,
          views: post.views,
          upvote: post.upvote,
          downvote: post.downvote,
          posttags: post.posttags,
          user: post.user,
          answers: post.answers,
        }));
        setPosts(mappedData);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, [tagId]);

  // Hàm xử lý Watch tag
  const handleWatchTag = () => {
    axios
      .post(
        `http://localhost:5114/api/Tags/watch?userId=${authState.user}&tagId=${tagId}`
      )
      .then(() => {
        setUserWatchingTag(true);
        setUserWatchedTags((prevTags) => [...prevTags, { id: tagId }]);
      })
      .catch((error) => {
        console.error("There was an error watching the tag!", error);
      });
  };

  // Hàm xử lý Unwatch tag
  const handleUnwatchTag = () => {
    axios
      .delete(
        `http://localhost:5114/api/Tags/unwatch?userId=${authState.user}&tagId=${tagId}`
      )
      .then(() => {
        setUserWatchingTag(false);
        setUserWatchedTags((prevTags) =>
          prevTags.filter((tag) => tag.id !== tagId)
        );
      })
      .catch((error) => {
        console.error("There was an error unwatching the tag!", error);
      });
  };

  // Sắp xếp các bài viết theo lựa chọn
  const sortedPosts = posts.sort((a, b) => {
    if (sorting === "Newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sorting === "Name") {
      return a.title.localeCompare(b.title);
    }
    if (sorting === "Unanswered") {
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
      <div className="flex justify-between items-center mb-4">
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
      <p className="line-clamp-2">{tag.description}</p>

      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex mt-2 gap-2">
          {!isUserWatchingTag && authState.isAuthenticated && (
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
          {isUserWatchingTag && (
            <motion.div
              className="w-fit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                gradientDuoTone="tealToLime"
                size="md"
                pill
                outline
                onClick={handleUnwatchTag}
              >
                Unwatch
              </Button>
            </motion.div>
          )}
        </div>
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
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          className="bg-white rounded shadow-sm border-gray-300 border mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {sortedPosts.length > 0 ? (
            <QuestionList posts={sortedPosts} />
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

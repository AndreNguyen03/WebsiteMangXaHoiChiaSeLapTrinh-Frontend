import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import QuestionList from "../HomeMainBar/QuestionList"; // Giả sử bạn đã có component này
import SortingGroupBar from "../SortingGroupBar/SortingGroupBar"; // Giả sử bạn đã có component này
import AskQuestionButton from "../HomeMainBar/AskQuestionButton"; // Giả sử bạn đã có component này
import {
  fetchWatchedTags,
  watchTag,
  unwatchTag,
} from "../../features/WatchedTags/WatchedTags";
import axios from "axios";

const sortingOptions = ["Mới nhất", "Tên", "Chưa trả lời"]; // Translated sorting options

const QuestionWithTagMainBar = () => {
  const dispatch = useDispatch();
  const { tagId } = useParams();
  const authState = useSelector((state) => state.auth);
  const watchedTags = useSelector((state) => state.watchedTags.tags);
  const isLoading = useSelector((state) => state.watchedTags.loading);

  const [posts, setPosts] = useState([]);
  const [sorting, setSorting] = useState("Mới nhất"); // Default sorting translated
  const [tag, setTag] = useState({});

  // Kiểm tra xem tag hiện tại có nằm trong danh sách watchedTags hay không
  const isUserWatchingTag = watchedTags.some((tag) => tag.id === tagId);

  // Fetch danh sách tag mà người dùng đang theo dõi khi component được mount
  useEffect(() => {
    if (authState.user) {
      dispatch(fetchWatchedTags(authState.user));
    }
  }, [authState.user, dispatch]);

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
    if (authState.user) {
      dispatch(watchTag({ userId: authState.user, tagId }));
    }
  };

  // Hàm xử lý Unwatch tag
  const handleUnwatchTag = () => {
    if (authState.user) {
      dispatch(unwatchTag({ userId: authState.user, tagId }));
    }
  };

  // Sắp xếp các bài viết theo lựa chọn
  const sortedPosts = posts.sort((a, b) => {
    if (sorting === "Mới nhất") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sorting === "Tên") {
      return a.title.localeCompare(b.title);
    }
    if (sorting === "Chưa trả lời") {
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
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
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
                disabled={isLoading}
              >
                Theo dõi
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
                disabled={isLoading}
              >
                Bỏ theo dõi
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
          {posts.length} câu hỏi
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
              Hiện tại không có câu hỏi nào. Vui lòng kiểm tra lại sau.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionWithTagMainBar;

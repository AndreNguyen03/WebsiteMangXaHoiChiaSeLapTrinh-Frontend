import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";

// Các thành phần con
import TagBox from "./TagBox"; // Hộp hiển thị tag
import PostBox from "./PostBox"; // Hộp hiển thị bài đăng
import UserInfoBox from "./UserInfoBox"; // Hộp hiển thị thông tin người dùng
import UpdateUserInfoModal from "./UpdateUserInfoModal"; // Modal chỉnh sửa thông tin

const UserProfileMainBar = () => {
  const { userID } = useParams(); // Lấy `userID` từ tham số URL
  const authState = useSelector((state) => state.auth); // Lấy thông tin đăng nhập từ Redux
  const [user, setUser] = useState({}); // State lưu thông tin người dùng
  const [posts, setPosts] = useState([]); // State lưu bài viết của người dùng
  const [answers, setAnswers] = useState([]); // State lưu câu trả lời của người dùng
  const [allPosts, setAllPosts] = useState([]); // State lưu bài viết và câu trả lời (kết hợp)
  const [watchedTags, setWatchedTags] = useState([]); // State lưu tag đang theo dõi
  const [openModal, setOpenModal] = useState(false); // State để mở modal chỉnh sửa

  // Lấy thông tin người dùng
  useEffect(() => {
    if (userID) {
      axios
        .get(`http://localhost:5114/api/Users/${userID}`)
        .then((response) => {
          const mappedData = {
            id: response.data.id,
            username: response.data.username,
            gravatar: response.data.gravatar,
            createdAt: response.data.createdAt,
            questionsCount: response.data.posts.length,
            answersCount: response.data.answers.length,
            email: response.data.email,
          };
          setUser(mappedData);
        })
        .catch((error) =>
          console.error("Lỗi khi lấy thông tin người dùng:", error)
        );
    }
  }, [userID, openModal]);

  // Lấy câu trả lời của người dùng
  useEffect(() => {
    axios
      .get(`http://localhost:5114/api/Answers/answerByUserId?id=${userID}`)
      .then((response) => {
        const mappedData = response.data.map((answer) => ({
          id: answer.postId,
          title: answer.post.title,
          date: answer.createdAt,
          type: "A", // "A" biểu thị câu trả lời
        }));
        setAnswers(mappedData);
      })
      .catch((error) => console.error("Lỗi khi lấy câu trả lời:", error));
  }, [userID]);

  // Lấy bài viết của người dùng
  useEffect(() => {
    axios
      .get(`http://localhost:5114/api/Posts/getbyuserid?id=${userID}`)
      .then((response) => {
        const mappedData = response.data.map((post) => ({
          id: post.id,
          title: post.title,
          date: post.createdAt,
          type: "Q", // "Q" biểu thị bài viết
        }));
        setPosts(mappedData);
      })
      .catch((error) => console.error("Lỗi khi lấy bài viết:", error));
  }, [userID]);

  // Gộp bài viết và câu trả lời
  useEffect(() => {
    setAllPosts([...posts, ...answers]);
  }, [posts, answers]);

  // Lấy tag đang theo dõi
  useEffect(() => {
    axios
      .get(
        `http://localhost:5114/api/Tags/getWatchedTagByUserId?userId=${userID}`
      )
      .then((response) => {
        const mappedData = response.data.map((tag) => ({
          id: tag.id,
          name: tag.tagname,
        }));
        setWatchedTags(mappedData);
      })
      .catch((error) => console.error("Lỗi khi lấy tag đang theo dõi:", error));
  }, [userID]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container min-h-screen mx-auto px-4 py-8 max-w-4xl"
    >
      {/* Hộp thông tin người dùng */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full w-full bg-blue-200 rounded-md bg-opacity-30 border border-gray-100 p-4 flex flex-col md:flex-row justify-between"
      >
        <UserInfoBox user={user} />
        {userID === authState.user && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setOpenModal(true)}
              pill
              gradientMonochrome="cyan"
              className="mt-4 md:mt-0 p-2 text-white"
            >
              Chỉnh sửa
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Hộp tag đang theo dõi */}
      <TagBox tags={watchedTags} />

      {/* Hộp bài viết và câu trả lời */}
      <PostBox posts={allPosts} />

      {/* Modal chỉnh sửa thông tin người dùng */}
      <UpdateUserInfoModal
        user={user}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </motion.div>
  );
};

export default UserProfileMainBar;

import React, { useState, useEffect } from "react";
import TagBox from "./TagBox";
import { Button } from "flowbite-react";
import PostBox from "./PostBox";
import UserInfoBox from "./UserInfoBox";
import UpdateUserInfoModal from "./UpdateUserInfoModal";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const UserProfileMainBar = () => {
  const { userID } = useParams();
  const [user, setUser] = useState({});
  const authState = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [answers, setAnwsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    if (userID) {
      // Kiểm tra `userID` trước khi gọi API
      axios
        .get(`http://localhost:5114/api/Users/${userID}`)
        .then((response) => {
          const mappedData = {
            id: response.data.id, // Đổi id thành customId
            username: response.data.username, // Đổi title thành customTitle
            gravatar: response.data.gravatar, // Đổi content thành customContent
            createdAt: response.data.createdAt, // Đổi content thành customContent
            questionsCount: response.data.posts.length,
            answersCount: response.data.answers.length,
            email: response.data.email,
            // Đổi content thành customContent
          };
          setUser(mappedData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userID]); // Dependency chính xác

  useEffect(() => {
    axios
      .get(`http://localhost:5114/api/Answers/answerByUserId?id=${userID}`) // Gọi API
      .then((response) => {
        console.log(response.data);

        // Chuyển đổi dữ liệu API theo định dạng custom
        const mappedData = response.data.map((answer) => ({
          id: answer.postId, // Đổi id thành customId
          title: answer.post.title, // Đổi title thành customTitle
          date: answer.post.createdAt, // Đổi createdAt thành customDate
          type: "A",
        }));

        setAnwsers(mappedData); // Lưu vào state custom
      })
      .catch((error) => {
        console.error("There was an error fetching the answers!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5114/api/Posts/getbyuserid?id=${userID}`) // Gọi API
      .then((response) => {
        console.log(response.data);

        // Chuyển đổi dữ liệu API theo định dạng custom
        const mappedData = response.data.map((post) => ({
          id: post.id, // Đổi id thành customId
          title: post.title, // Đổi title thành customTitle
          date: post.createdAt, // Đổi createdAt thành customDate
          type: "Q",
        }));

        setPosts(mappedData); // Lưu vào state custom
      })
      .catch((error) => {
        console.error("There was an error fetching the answers!", error);
      });
  }, []);

  useEffect(() => {
    // Gộp hai mảng posts và answers
    const combinedData = [...posts, ...answers];

    setAllPosts(combinedData);
  }, [posts, answers]); // Lắng nghe sự thay đổi của cả `posts` và `answers`

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="container min-h-screen mx-auto px-4 py-8 max-w-4xl">
      <div
        className="h-full w-full bg-blue-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100
 p-4 flex flex-col md:flex-row justify-between "
      >
        <UserInfoBox user={user}></UserInfoBox>
        {userID == authState.user ? (
          <Button
            onClick={() => setOpenModal(true)}
            pill
            gradientMonochrome="cyan"
            className="mt-4 md:mt-0 p-2 text-white align-top h-10 items-center w-full md:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit Profile
          </Button>
        ) : (
          <></>
        )}
      </div>
      <TagBox tags={user.watchedTags} />
      <PostBox posts={allPosts} />
      <UpdateUserInfoModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      ></UpdateUserInfoModal>
    </div>
  );
};

export default UserProfileMainBar;

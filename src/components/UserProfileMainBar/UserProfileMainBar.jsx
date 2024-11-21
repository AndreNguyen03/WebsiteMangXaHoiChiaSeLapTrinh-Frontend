import React, { useState, useEffect } from "react";
import TagBox from "./TagBox";
import { Button } from "flowbite-react";
import PostBox from "./PostBox";
import UserInfoBox from "./UserInfoBox";
import UpdateUserInfoModal from "./UpdateUserInfoModal";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfileMainBar = () => {
  const { userID } = useParams();

  // const user = {
  //   name: "John Doe",
  //   username: "@johndoe",
  //   avatarUrl: "https://i.pravatar.cc/300",
  //   joinDate: "January 15, 2022",
  //   questionsCount: 42,
  //   answersCount: 128,
  //   watchedTags: ["react", "javascript", "tailwindcss", "node.js", "next.js"],
  // };

  const [user, setUser] = useState({});

  console.log(userID);

  useEffect(() => {
    if (userID) {
      // Kiểm tra `userID` trước khi gọi API
      axios
        .get(`http://localhost:5114/api/Users/${userID}`)
        .then((response) => {
          console.log("API response:", response.data);
          setUser(response.data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userID]); // Dependency chính xác
  console.log("UserID is:" + user.ID);

  const posts = [
    {
      id: 2673,
      type: "B",
      title: "How do I remove a submodule?",
      date: "Apr 23, 2013",
    },
    {
      id: 2527,
      type: "B",
      title: "How to get just one file from another branch",
      date: "Mar 2, 2010",
    },
    {
      id: 1971,
      type: "B",
      title: "How to remove old and unused Docker images",
      date: "Sep 22, 2015",
    },
    {
      id: 1848,
      type: "A",
      title: "Skip Git commit hooks",
      date: "Aug 29, 2011",
    },
    {
      id: 1777,
      type: "A",
      title: "GitHub relative link in Markdown file",
      date: "Oct 5, 2011",
    },
    {
      id: 1755,
      type: "A",
      title: "How to list branches that contain a given commit?",
      date: "Sep 14, 2009",
    },
    {
      id: 1719,
      type: "A",
      title: "Where is the global git config data stored?",
      date: "Jan 22, 2010",
    },
    {
      id: 1461,
      type: "A",
      title: "How to merge a specific commit in Git",
      date: "May 19, 2009",
    },
    {
      id: 1373,
      type: "A",
      title: "Eclipse/Java code completion not working",
      date: "May 26, 2009",
    },
    {
      id: 1365,
      type: "A",
      title: "Need to reset git branch to origin version",
      date: "Feb 15, 2012",
    },
    // New items added below
    {
      id: 3001,
      type: "A",
      title: "Understanding JavaScript Closures",
      date: "Oct 10, 2023",
    },
    {
      id: 3002,
      type: "B",
      title: "Introduction to React Hooks",
      date: "Oct 11, 2023",
    },
  ];

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div
        className="h-full w-full bg-blue-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100
 p-4 flex flex-col md:flex-row justify-between "
      >
        <UserInfoBox user={user}></UserInfoBox>
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
      </div>
      <TagBox tags={user.watchedTags} />
      <PostBox posts={posts} />
      <UpdateUserInfoModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      ></UpdateUserInfoModal>
    </div>
  );
};

export default UserProfileMainBar;

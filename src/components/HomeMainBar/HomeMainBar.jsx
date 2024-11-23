import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuestionList from "./QuestionList";
import axios from "axios";

const HomeMainBar = () => {
  const user = 1;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5114/api/Posts") // Gọi API
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
          user: post.user, // Đổi user thành customUser
          answers: post.answers, // Đổi answers thành customAnswers
        }));

        setPosts(mappedData); // Lưu vào state custom
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Interesting posts for you</h1>
        <Link
          to={user === null ? "/Login" : "/AskQuestion"}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Ask Question
        </Link>
      </div>
      <div className="bg-white rounded shadow-sm border-gray-300 border mb-4">
        {posts.length > 0 ? (
          <QuestionList posts={posts} />
        ) : (
          <p className="text-gray-600 text-center p-4">
            There's currently no question available. Please check back later.
          </p>
        )}
      </div>
    </>
  );
};

export default HomeMainBar;

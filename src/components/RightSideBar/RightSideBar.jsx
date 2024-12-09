import React from "react";
import { Link } from "react-router-dom";
import "./RightSideBar.css";
import axios from "axios";
import { useState, useEffect } from "react";
import HotQuestion from "./HotQuestion";
import { useSelector } from "react-redux";
import TagBox from "../UserProfileMainBar/TagBox";

const RightSideBar = () => {
  const [hotPosts, sethotPosts] = useState([]);
  const [watchedTags, setWatchedTags] = useState([]);
  const authState = useSelector((state) => state.auth);

  //gethosposts
  useEffect(() => {
    axios
      .get("http://localhost:5114/api/Posts/GetMostAnsweredQuestion") // Gọi API
      .then((response) => {
        // Chuyển đổi dữ liệu API theo định dạng custom
        const mappedData = response.data.map((post) => ({
          id: post.id,
          title: post.title,
          answers: post.answers,
        }));

        sethotPosts(mappedData); // Lưu vào state custom
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi lấy bài đăng!", error);
      });
  }, []);

  useEffect(() => {
    if (authState.user) {
      axios
        .get(
          `http://localhost:5114/api/Tags/getWatchedTagByUserId?userId=${authState.user}`
        )
        .then((response) => {
          const mappedData = response.data.map((tag) => ({
            id: tag.id,
            name: tag.tagname,
          }));
          setWatchedTags(mappedData);
        })
        .catch((error) => console.error("Error fetching watched tag", error));
    } else {
      setWatchedTags(null);
    }
  }, [authState.isAuthenticated, authState.user]);

  return (
    <>
      <div className="bg-orange-50 rounded shadow-sm">
        <h2 className="sidebar-item-tittle">Xin chào thế giới!</h2>
        <div className="p-4">
          <p className="text-gray-600 text-sm">
            Đây là một trang hỏi đáp được chỉnh sửa cộng đồng dành cho{" "}
            <strong>các lập trình viên chuyên nghiệp và đam mê</strong>. Miễn
            phí 100%.
          </p>
          <div className="flex mt-4 space-x-4">
            <Link to="/About" className="text-blue-500">
              Về chúng tôi
            </Link>
            <Link to="/Help" className="text-blue-500">
              Trợ giúp
            </Link>
          </div>
        </div>
        <h2 className="sidebar-item-tittle">Các bài viết nổi bật</h2>
        <div className="p-4">
          {hotPosts.map((post) => (
            <HotQuestion key={post.id} post={post} />
          ))}
        </div>
      </div>
      {authState.isAuthenticated ? (
        <TagBox tags={watchedTags}></TagBox>
      ) : (
        <> </>
      )}
    </>
  );
};

export default RightSideBar;

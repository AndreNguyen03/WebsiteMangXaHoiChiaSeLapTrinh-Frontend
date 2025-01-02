import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../features/Comment/commentSlice"; // Đường dẫn tới slice của bạn
import axios from "axios";

const ShowComment = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments, status, error } = useSelector((state) => state.comment);

  const [usernames, setUsernames] = useState({});

  // Lấy token từ Redux hoặc fallback vào localStorage
  const token =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("jwtToken");

  useEffect(() => {
    if (postId && token) {
      dispatch(fetchComments({ postId, token }));
    } else {
      if (!postId) {
        console.error("Thiếu Post ID");
      }
      if (!token) {
        console.error("Thiếu token");
      }
    }
  }, [dispatch, postId, token]);

  // Lấy username cho từng userId
  useEffect(() => {
    const fetchUsernames = async () => {
      const uniqueUserIds = [...new Set(comments.map((c) => c.userId))];

      // Lọc ra các userId chưa được tải
      const userIdsToFetch = uniqueUserIds.filter(
        (userId) => !usernames[userId]
      );

      if (userIdsToFetch.length === 0) return;

      const newUsernames = { ...usernames };

      for (const userId of userIdsToFetch) {
        try {
          const response = await axios.get(
            `http://localhost:5114/api/Users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          newUsernames[userId] = response.data.username || "Không rõ";
        } catch (error) {
          console.error(`Lỗi khi lấy username cho userId: ${userId}`, error);
          newUsernames[userId] = "Không rõ";
        }
      }

      // Cập nhật state chỉ khi có userId mới được fetch
      setUsernames(newUsernames);
    };

    if (comments.length > 0) {
      fetchUsernames();
    }
  }, [comments, token]);

  return (
    <div className="p-4">
      {status === "loading" && (
        <p className="text-center text-gray-500">Đang tải bình luận...</p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-500">Lỗi: {error}</p>
      )}
      {status === "succeeded" && comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <p className="text-gray-800">{comment.body}</p>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                <span>
                  Người dùng: {usernames[comment.userId] || "Đang tải..."}
                </span>
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Không có bình luận nào.</p>
      )}
    </div>
  );
};

export default ShowComment;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../features/Comment/commentSlice"; // Đường dẫn tới slice của bạn

const ShowComment = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments, status, error } = useSelector((state) => state.comment);

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

  if (!postId || !token) {
    return (
      <div className="text-red-500 text-center p-4">
        Không có token hoặc thiếu Post ID.
      </div>
    );
  }

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
                <span>Người dùng: {comment.username || "Không rõ"}</span>
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

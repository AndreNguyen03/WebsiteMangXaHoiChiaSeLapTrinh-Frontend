import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../features/Comment/commentSlice"; // Giả sử bạn đã có Redux slice

const AddComment = ({ postId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.comment);
  const { token } = useSelector((state) => state.auth); // Giả sử token có trong Redux auth state

  // Nếu bạn sử dụng localStorage, có thể fallback vào nó:
  // const token = localStorage.getItem("jwtToken");

  const handleAddComment = () => {
    if (!token) {
      console.error("Không tìm thấy token. Vui lòng đăng nhập.");
      return;
    }

    if (commentText.trim()) {
      // Gửi action để thêm bình luận nếu có token và bình luận không rỗng
      dispatch(addComment({ postId, commentText, token }));
      setCommentText(""); // Xóa nội dung trong ô nhập
      onCommentAdded({ text: commentText, postId }); // Cập nhật trạng thái ở component cha (nếu cần)
    } else {
      console.error("Nội dung bình luận trống.");
    }
  };

  return (
    <div>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Thêm bình luận..."
        rows="4"
        cols="50"
        className="border rounded p-2"
      />
      <div className="mt-2">
        <button
          onClick={handleAddComment}
          disabled={status === "loading"}
          className="bg-blue-500 text-white py-1 px-4 rounded"
        >
          {status === "loading" ? "Đang đăng..." : "Đăng bình luận"}
        </button>
      </div>
    </div>
  );
};

export default AddComment;

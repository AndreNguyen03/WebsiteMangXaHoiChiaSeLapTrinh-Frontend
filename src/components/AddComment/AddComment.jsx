import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../features/Comment/commentSlice"; // Assuming you have a Redux slice

const AddComment = ({ postId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.comments);
  const { token } = useSelector((state) => state.auth); // Assuming token is in Redux auth state

  // If you're using localStorage, fallback to it:
  // const token = localStorage.getItem("jwtToken");

  const handleAddComment = () => {
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    if (commentText.trim()) {
      // Dispatch action to add comment if the token exists and the comment is not empty
      dispatch(addComment({ postId, commentText, token }));
      setCommentText(""); // Clear the input
      onCommentAdded({ text: commentText, postId }); // Assuming you want to update the state of the parent component
    } else {
      console.error("Comment text is empty.");
    }
  };

  return (
    <div>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
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
          {status === "loading" ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </div>
  );
};

export default AddComment;

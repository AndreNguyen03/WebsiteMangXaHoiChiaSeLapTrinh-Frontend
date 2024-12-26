// src/components/AddComment.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../features/Comment/commentSlice"; // Assuming you have a Redux slice

const AddComment = ({ questionId }) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.comments);

  const handleAddComment = () => {
    if (commentText.trim()) {
      dispatch(addComment({ questionId, commentText }));
      setCommentText(""); // Clear the input
    }
  };

  return (
    <div>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment} disabled={status === "loading"}>
        {status === "loading" ? "Posting..." : "Post Comment"}
      </button>
    </div>
  );
};

export default AddComment;

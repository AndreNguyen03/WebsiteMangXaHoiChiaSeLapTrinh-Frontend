import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../features/Comment/commentSlice"; // Path to your slice

const ShowComment = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments, status, error } = useSelector((state) => state.comment);

  // Fetch token from Redux or localStorage as a fallback
  const token =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("jwtToken");

  useEffect(() => {
    if (postId && token) {
      dispatch(fetchComments({ postId, token }));
    } else {
      if (!postId) {
        console.error("Post ID is missing");
      }
      if (!token) {
        console.error("Token is missing");
      }
    }
  }, [dispatch, postId, token]);

  if (!postId || !token) {
    return (
      <div className="text-red-500 text-center p-4">
        No token available or postId is missing.
      </div>
    );
  }

  return (
    <div className="p-4">
      {status === "loading" && (
        <p className="text-center text-gray-500">Loading comments...</p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-500">Error: {error}</p>
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
                <span>By: {comment.username || "Unknown User"}</span>
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No comments available.</p>
      )}
    </div>
  );
};

export default ShowComment;

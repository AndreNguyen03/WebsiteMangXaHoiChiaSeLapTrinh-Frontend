// src/components/ShowComments.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../features/Comment/commentSlice"; // Assuming you have a Redux slice

const ShowComments = ({ questionId }) => {
  const dispatch = useDispatch();
  const { comments, status, error } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments(questionId)); // Fetch comments when the component mounts
  }, [dispatch, questionId]);

  return (
    <div>
      {status === "loading" && <p>Loading comments...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.text}</p>
              <small>By {comment.user}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowComments;

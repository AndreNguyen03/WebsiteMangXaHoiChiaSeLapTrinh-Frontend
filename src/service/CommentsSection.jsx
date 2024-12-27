import React, { useEffect, useState } from "react";
import {
  getCommentsByQuestionId,
  postComment,
} from "../services/commentService";

const CommentsSection = ({ questionId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  // Fetch comments when the component loads
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByQuestionId(questionId);
        setComments(data);
      } catch (err) {
        setError("Failed to load comments.");
      }
    };
    fetchComments();
  }, [questionId]);

  // Handle new comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await postComment(questionId, newComment);
      setComments((prev) => [...prev, { content: newComment }]);
      setNewComment("");
    } catch (err) {
      setError("Failed to post comment.");
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {comments.length > 0 ? (
          comments.map((comment, index) => <p key={index}>{comment.content}</p>)
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentsSection;

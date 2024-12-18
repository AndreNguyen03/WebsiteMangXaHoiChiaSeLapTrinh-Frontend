import { useState } from "react";
import axios from "axios";

const AddComment = ({ parentId, onCommentAdded, apiEndpoint }) => {
  const [commentBody, setCommentBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Get the token from localStorage or sessionStorage
  const token = localStorage.getItem("authToken"); // Adjust if you're using another method for auth

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentBody.trim()) return;

    if (!token) {
      // If no token exists, show an error or prompt to log in
      setError("You must be logged in to add a comment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Add the authorization header with the token
      const response = await axios.post(
        apiEndpoint,
        {
          parentId,
          body: commentBody,
          createdAt: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the headers
          },
        }
      );

      const newComment = response.data;

      // Trigger callback to update the parent component with the new comment
      onCommentAdded(newComment);

      // Reset the comment input and hide the form
      setCommentBody("");
      setIsFormVisible(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unauthorized: Please log in to add a comment.");
      } else {
        setError("Failed to add comment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      {/* Add Comment Link */}
      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer"
        >
          Add a comment
        </button>
      )}

      {/* Comment Form */}
      {isFormVisible && (
        <form onSubmit={handleAddComment} className="mt-2">
          <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Use comments to ask for clarification or add more information..."
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
            disabled={loading}
          ></textarea>
          <div className="flex items-center gap-4 mt-2">
            <button
              type="submit"
              className={`text-white bg-blue-500 py-1 px-3 rounded-md text-sm hover:bg-blue-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!commentBody.trim() || loading}
            >
              {loading ? "Adding..." : "Add Comment"}
            </button>
            <button
              type="button"
              onClick={() => {
                setCommentBody("");
                setIsFormVisible(false);
              }}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default AddComment;

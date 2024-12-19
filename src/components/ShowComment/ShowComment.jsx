import { useEffect, useState } from "react";
import axios from "axios";

const ShowComment = ({ postId, token, initialCount = 5, loadStep = 5 }) => {
  const [comments, setComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + loadStep);
  };

  const visibleComments = comments.slice(0, visibleCount);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5114/api/Comment/post/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token
            },
          }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };

    if (postId && token) {
      fetchComments();
    }
  }, [postId, token]);

  return (
    <div className="space-y-4">
      {visibleComments.map((comment) => (
        <div key={comment.id} className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-800">{comment.body}</p>
          <small className="text-gray-600">
            Commented at {new Date(comment.createdAt).toLocaleString()}
          </small>
        </div>
      ))}

      {visibleCount < comments.length && (
        <button
          onClick={handleLoadMore}
          className="mt-4 text-blue-500 hover:underline"
        >
          Show more comments
        </button>
      )}

      {comments.length === 0 && (
        <p className="text-gray-600">No comments yet.</p>
      )}
    </div>
  );
};

export default ShowComment;

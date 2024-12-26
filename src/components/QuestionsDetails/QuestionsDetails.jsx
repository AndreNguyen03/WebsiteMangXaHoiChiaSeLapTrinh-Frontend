import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import QuestionHeader from "../QuestionHeader/QuestionHeader";
import VoteButtons from "../VoteButtons/VoteButtons";
import UserCard from "../UserCard/UserCard";
import AnswerForm from "../AnswerForm/AnswerForm";
import AddComment from "../AddComment/AddComment";
import ShowComment from "../ShowComment/ShowComment";
import { useSelector } from "react-redux";

const QuestionDetails = ({ postId }) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the token from Redux auth state
  const { token } = useSelector((state) => state.auth);

  // Fetch question details
  useEffect(() => {
    const fetchQuestion = async () => {
      if (!postId) {
        setError("Post ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5114/api/Posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to the request
            },
          }
        );
        const data = response.data;
        const mappedData = {
          id: data.id,
          title: data.title,
          tryAndExpecting: data.tryAndExpecting,
          detailProblem: data.detailProblem,
          createdAt: data.createdAt,
          views: data.views,
          upvote: data.upvote,
          downvote: data.downvote,
          posttags: data.posttags,
          user: data.user,
          answers: data.answers || [], // Ensure answers exist
          comments: data.comments || [], // Ensure comments exist
        };
        setQuestion(mappedData);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred. Please try again later."
        );
        console.error("Error fetching question details:", err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [postId, token]);

  // Handles adding a new comment
  const handleCommentAdded = (newComment) => {
    setQuestion((prev) => ({
      ...prev,
      comments: [...(prev.comments || []), newComment], // Add new comment
    }));
  };

  // Handles submitting a new answer
  const handleAnswerSubmitted = (newAnswer) => {
    setQuestion((prev) => ({
      ...prev,
      answers: [...(prev.answers || []), newAnswer], // Add new answer
    }));
  };

  // Loading state
  if (loading) {
    return <div>Loading question...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Check if question is not found
  if (!question) {
    return <div>Question not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <QuestionHeader
          title={question.title}
          views={question.views}
          createdAt={question.createdAt}
        />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex gap-4">
                <VoteButtons
                  votes={(question.upvote || 0) - (question.downvote || 0)}
                />
                <div className="flex-1">
                  <p className="text-gray-800 mb-4">
                    {question.tryAndExpecting || "No content provided"}
                  </p>
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">
                      {question.detailProblem ||
                        "No additional details provided."}
                    </code>
                  </pre>
                </div>
              </div>
              <UserCard
                userid={question.user?.id}
                name={question.user?.username || "Unknown User"}
                time={`asked ${new Date(
                  question.createdAt || Date.now()
                ).toLocaleString()}`}
                type="question"
              />
            </motion.div>

            {/* Show Comments for Question */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold mb-4">Comments</h3>
              {/* Ensure the ShowComment component can handle postId and token */}
              <ShowComment postId={postId} token={token} />
              <AddComment
                parentId={postId}
                onCommentAdded={handleCommentAdded}
                apiEndpoint={`http://localhost:5114/api/Comment/post/${postId}`}
              />
            </motion.div>

            {/* Show Answers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <h2 className="text-lg font-semibold mb-4">Answers</h2>
              {question.answers.length > 0 ? (
                question.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="bg-white rounded-lg shadow-sm p-6 mb-4"
                  >
                    <div className="flex gap-4">
                      <VoteButtons
                        votes={(answer.upvote || 0) - (answer.downvote || 0)}
                      />
                      <div className="flex-1">
                        <p className="text-gray-800 mb-4">{answer.body}</p>
                      </div>
                    </div>
                    <UserCard
                      userid={answer.userId}
                      gravatar={answer.user?.gravatar || null}
                      name={answer.user?.username || `User ${answer.userId}`}
                      time={`answered ${new Date(
                        answer.createdAt
                      ).toLocaleString()}`}
                      type="answer"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No answers yet.</p>
              )}
            </motion.div>

            <AnswerForm
              postId={postId}
              userId={question.user?.id || "Anonymous"}
              onAnswerSubmitted={handleAnswerSubmitted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;

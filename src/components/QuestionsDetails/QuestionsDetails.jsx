import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import QuestionHeader from "../QuestionHeader/QuestionHeader";
import VoteButtons from "../VoteButtons/VoteButtons";
import UserCard from "../UserCard/UserCard";
import AnswerForm from "../AnswerForm/AnswerForm";

const QuestionDetails = ({ postId }) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!postId) {
        setError("Post ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5114/api/Posts/${postId}`
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
          answers: data.answers,
        };
        setQuestion(mappedData);
        setLoading(false);
      } catch (err) {
        setError("An error occurred. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [postId]);

  if (loading) {
    return <div>Loading question...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
                initials={
                  question.user?.username?.charAt(0).toUpperCase() || "U"
                }
                name={question.user?.username || "Unknown User"}
                time={`asked ${new Date(
                  question.createdAt || Date.now()
                ).toLocaleString()}`}
                type="question"
              />
            </motion.div>

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
                      initials={answer.userId?.charAt(0).toUpperCase() || "U"}
                      name={`User ${answer.userId}`}
                      time={`answered ${new Date(
                        answer.createdAt || Date.now()
                      ).toLocaleString()}`}
                      type="answer"
                      userid={answer.userId}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No answers yet.</p>
              )}
            </motion.div>

            <AnswerForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;

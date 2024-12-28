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

  // Lấy token từ Redux auth state
  const { token } = useSelector((state) => state.auth);

  // Lấy thông tin chi tiết câu hỏi
  useEffect(() => {
    const fetchQuestion = async () => {
      if (!postId) {
        setError("Thiếu ID bài viết");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5114/api/Posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Đính kèm token vào yêu cầu
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
          answers: data.answers || [], // Đảm bảo có danh sách câu trả lời
          comments: data.comments || [], // Đảm bảo có danh sách bình luận
        };

        setQuestion(mappedData);
        setError(null); // Xóa lỗi cũ nếu có
      } catch (err) {
        setError(
          err.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau."
        );
        console.error("Lỗi khi lấy chi tiết câu hỏi:", err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [postId, token]);

  // Xử lý thêm bình luận mới
  const handleCommentAdded = (newComment) => {
    setQuestion((prev) => ({
      ...prev,
      comments: [...(prev.comments || []), newComment], // Thêm bình luận mới
    }));
  };

  // Xử lý thêm câu trả lời mới
  const handleAnswerSubmitted = (newAnswer) => {
    setQuestion((prev) => ({
      ...prev,
      answers: [...(prev.answers || []), newAnswer], // Thêm câu trả lời mới
    }));
  };

  // Trạng thái loading
  if (loading) {
    return <div className="text-center text-gray-500">Đang tải câu hỏi...</div>;
  }

  // Trạng thái lỗi
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Kiểm tra nếu câu hỏi không tìm thấy
  if (!question) {
    return (
      <div className="text-center text-gray-500">Không tìm thấy câu hỏi.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <QuestionHeader
          title={question.title}
          views={question.views}
          createdAt={question.createdAt}
        />

        {/* Nội dung chính */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cột trái: Nội dung câu hỏi */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              {/* Nút bầu chọn */}
              <div className="flex gap-6 items-start">
                <VoteButtons
                  votes={(question.upvote || 0) - (question.downvote || 0)}
                />

                {/* Nội dung câu hỏi */}
                <div className="flex-1">
                  <p className="text-lg text-gray-800 mb-6">
                    {question.tryAndExpecting || "Không có nội dung."}
                  </p>

                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-gray-700">
                      {question.detailProblem || "Không có chi tiết bổ sung."}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Thông tin người dùng */}
              <div className="mt-6">
                <UserCard
                  userid={question.user?.id}
                  name={question.user?.username || "Người dùng ẩn danh"}
                  time={`đã hỏi vào ${new Date(
                    question.createdAt || Date.now()
                  ).toLocaleString()}`}
                  type="question"
                />
              </div>
            </motion.div>

            {/* Phần bình luận */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Bình luận
              </h3>
              <ShowComment postId={postId} token={token} />
              <AddComment postId={postId} onCommentAdded={handleCommentAdded} />
            </motion.div>

            {/* Phần câu trả lời */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Câu trả lời
              </h2>
              {question.answers.length > 0 ? (
                question.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-300"
                  >
                    <div className="flex gap-6">
                      {/* Nút bầu chọn */}
                      <div className="flex flex-col items-center justify-start w-16 bg-gray-100 p-3 rounded-lg shadow-md mr-6">
                        <button className="text-gray-600 text-xl hover:text-blue-500 mb-2">
                          <i className="fa fa-arrow-up"></i>
                        </button>
                        <div className="text-xl font-semibold text-gray-900 mb-2">
                          {(answer.upvote || 0) - (answer.downvote || 0)}
                        </div>
                        <button className="text-gray-600 text-xl hover:text-red-500 mb-2">
                          <i className="fa fa-arrow-down"></i>
                        </button>
                      </div>

                      {/* Nội dung câu trả lời */}
                      <div className="flex-1">
                        <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                          {answer.body}
                        </p>
                      </div>
                    </div>

                    {/* Thông tin người dùng */}
                    <div className="flex items-center gap-6 mt-6">
                      <img
                        src={
                          answer.user?.gravatar ||
                          "https://www.gravatar.com/avatar/placeholder"
                        }
                        alt={answer.user?.username || "Người ẩn danh"}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <span className="font-semibold text-gray-800">
                          {answer.user?.username ||
                            `Người dùng ${answer.userId}`}
                        </span>
                        <p className="text-sm text-gray-500">
                          Đã trả lời vào{" "}
                          {new Date(answer.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 italic">Chưa có câu trả lời nào.</p>
              )}
            </motion.div>

            {/* Form trả lời */}
            <AnswerForm
              postId={postId}
              userId={question.user?.id || "Người dùng ẩn danh"}
              onAnswerSubmitted={handleAnswerSubmitted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;

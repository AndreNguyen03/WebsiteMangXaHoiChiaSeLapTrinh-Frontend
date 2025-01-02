import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import ReportModal from "./ReportModal";
import QuestionHeader from "../QuestionHeader/QuestionHeader";
import VoteButtons from "../VoteButtons/VoteButtons";
import UserCard from "../UserCard/UserCard";
import AnswerForm from "../AnswerForm/AnswerForm";
import AddComment from "../AddComment/AddComment";
import ShowComment from "../ShowComment/ShowComment";
import ReportButton from "./ReportButton";
import UserAnswerCard from "./UserAnswerCard";

const QuestionDetails = ({ postId }) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Vote
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);

  const auth = useSelector((state) => state.auth);
  const userId = auth.user;

  const fetchVote = async () => {
    if (!userId) {
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5114/api/Vote/votedetail?postId=${postId}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Đính kèm token vào yêu cầu
          },
        }
      );

      const data = response.data;
      setUpVotes(data.upVotes);
      setDownVotes(data.downVotes);

      console.log("Vote data: ", data);
      if (data.voteType === 1) {
        setIsUpvoted(true);
        setIsDownvoted(false);
      } else if (data.voteType === -1) {
        setIsUpvoted(false);
        setIsDownvoted(true);
      } else {
        setIsUpvoted(false);
        setIsDownvoted(false);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau."
      );
      console.error("Lỗi khi lấy chi tiết câu hỏi:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVote();
  }, [userId]);

  useEffect(() => {}, [isDownvoted]);

  const handleVoteClick = async (voteType) => {
    if (!userId) {
      alert("Bạn cần đăng nhập để bình chọn.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5114/api/Vote/vote", {
        userId,
        postId,
        voteType,
      });

      if (response.status === 200) {
        fetchVote();
      } else {
      }
    } catch (error) {
      console.error("Error while voting:", error);
    }
  };

  //Report
  const [showReportModal, setShowReportModal] = useState(false);
  const handleReportSuccess = () => {};

  const [isReported, setIsReported] = useState(false);
  const fetchReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5114/api/Report/checkUserReport?userId=${userId}&postId=${postId}`
      );
      const data = response.data;
      setIsReported(data.isReported);
    } catch (error) {
      console.error("Error fetching report: ", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [handleReportSuccess]);

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

    // Gọi API cập nhật view sau 15 giây
    const timer = setTimeout(async () => {
      try {
        await axios.post(
          `http://localhost:5114/api/Posts/track-view/${postId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Cập nhật lượt xem thành công!");
      } catch (err) {
        console.error("Lỗi khi cập nhật lượt xem:", err.response || err);
      }
    }, 15000);

    // Dọn dẹp timeout khi component unmount
    return () => clearTimeout(timer);
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
    return (
      <div className="text-center min-h-screen text-gray-500">
        Đang tải câu hỏi...
      </div>
    );
  }

  // Trạng thái lỗi
  if (error) {
    return <div className="text-center min-h-screen text-red-500">{error}</div>;
  }

  // Kiểm tra nếu câu hỏi không tìm thấy
  if (!question) {
    return (
      <div className="text-center min-h-screen text-gray-500">
        Không tìm thấy câu hỏi.
      </div>
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
                <div className="flex flex-col items-center gap-2">
                  <VoteButtons
                    onVoteClick={handleVoteClick}
                    Upvoted={isUpvoted}
                    DownVoted={isDownvoted}
                    votes={(upVotes || 0) - (downVotes || 0)}
                  />
                  <ReportButton
                    auth={auth}
                    onClick={() => setShowReportModal(true)}
                    isReported={isReported}
                  />
                </div>

                {/* Nội dung câu hỏi */}
                <div className="flex-1  ">
                  <p className="text-lg text-gray-800 mb-6 text-wrap ">
                    {question.tryAndExpecting || "Không có nội dung."}
                  </p>

                  <pre className="bg-gray-50 p-4 rounded-lg text-wrap ">
                    <code className="text-sm text-gray-700">
                      {question.detailProblem || "Không có chi tiết bổ sung."}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Thông tin người dùng */}
              <div className="mt-6">
                <UserCard
                  gravatar={question.user?.gravatar}
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
                      {/* Nội dung câu trả lời */}
                      <div className="flex-1">
                        <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                          {answer.body}
                        </p>
                      </div>
                    </div>

                    {/* Thông tin người dùng */}
                    <UserAnswerCard
                      userId={answer.userId}
                      createdAt={answer.createdAt}
                    ></UserAnswerCard>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 italic">Chưa có câu trả lời nào.</p>
              )}
            </motion.div>

            {/* Form trả lời */}
            <AnswerForm
              postId={postId}
              // userId={question.user?.id || "Người dùng ẩn danh"}
              onAnswerSubmitted={handleAnswerSubmitted}
            />
          </div>
        </div>
      </div>
      <ReportModal
        show={showReportModal}
        onClose={() => setShowReportModal(false)}
        userId={userId}
        postId={postId}
        onReportSuccess={handleReportSuccess}
      ></ReportModal>
    </div>
  );
};

export default QuestionDetails;

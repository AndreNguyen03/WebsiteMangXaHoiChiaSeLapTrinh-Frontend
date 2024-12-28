import React, { useState } from "react";
import axios from "axios";

const AnswerForm = ({ postId, userId, onAnswerSubmitted }) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!answer.trim()) {
      setError("Câu trả lời không được để trống.");
      return;
    }

    if (!userId) {
      setError("Bạn phải đăng nhập để gửi câu trả lời.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:5114/api/Answers", {
        body: answer,
        userId: userId, // Gửi userId
        postId: postId, // Gửi postId
      });

      if (onAnswerSubmitted) onAnswerSubmitted(response.data);

      setAnswer("");
    } catch (err) {
      setError("Có lỗi xảy ra khi gửi câu trả lời.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Nhập câu trả lời của bạn..."
        className="w-full p-4 border rounded-lg"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Đang gửi..." : "Gửi câu trả lời"}
      </button>
    </form>
  );
};

export default AnswerForm;

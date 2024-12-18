import React, { useState } from "react";
import axios from "axios";

const AnswerForm = ({ postId, userId, onAnswerSubmitted }) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!answer.trim()) {
      setError("Answer cannot be empty.");
      return;
    }

    if (!userId) {
      setError("You must be logged in to submit an answer.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:5114/api/Answers", {
        body: answer,
        userId: userId, // Pass userId
        postId: postId, // Pass postId
      });

      if (onAnswerSubmitted) onAnswerSubmitted(response.data);

      setAnswer("");
    } catch (err) {
      setError("Error submitting your answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full p-4 border rounded-lg"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Submitting..." : "Submit Answer"}
      </button>
    </form>
  );
};

export default AnswerForm;

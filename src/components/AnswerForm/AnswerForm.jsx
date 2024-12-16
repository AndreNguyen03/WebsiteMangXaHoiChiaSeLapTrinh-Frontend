import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "flowbite-react";
import axios from "axios";

const AnswerForm = ({ postId, onAnswerSubmitted }) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      setError("Answer cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Post the answer to the backend
      const response = await axios.post({
        body: answer,
        userId: `${userId}`,
        postId: `${postId}`,
      });

      // Call parent callback to update the UI
      if (onAnswerSubmitted) {
        onAnswerSubmitted(response.data);
      }

      // Clear the input field
      setAnswer("");
    } catch (err) {
      setError("Failed to post your answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <h2 className="text-xl font-semibold mb-4">Your Answer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-4 bg-gray-100 rounded-lg"
          rows="6"
          placeholder="Enter your answer here"
        ></textarea>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Your Answer"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AnswerForm;

import React from "react";
import { motion } from "framer-motion";

const ExpectationsInput = ({
  expectations,
  setExpectations,
  error,
  renderError,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
    >
      <label
        className="block text-gray-800 text-lg font-semibold mb-2"
        htmlFor="expectations"
      >
        Bạn đã thử gì và mong đợi điều gì?
      </label>
      <p className="text-gray-600 text-sm mb-3">
        Mô tả những gì bạn đã thử, những gì bạn mong đợi sẽ xảy ra và kết quả
        thực tế. Tối thiểu 20 ký tự.
      </p>
      <textarea
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 min-h-[160px]`}
        id="expectations"
        placeholder="Mô tả những gì bạn đã thử..."
        value={expectations}
        onChange={(e) => setExpectations(e.target.value)}
      ></textarea>
      {error && renderError(error)}
    </motion.div>
  );
};

export default ExpectationsInput;

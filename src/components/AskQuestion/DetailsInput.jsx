import React from "react";
import { motion } from "framer-motion";

const DetailsInput = ({ details, setDetails, error, renderError }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
    >
      <label
        className="block text-gray-800 text-lg font-semibold mb-2"
        htmlFor="details"
      >
        Chi tiết vấn đề của bạn là gì?
      </label>
      <p className="text-gray-600 text-sm mb-3">
        Giới thiệu vấn đề và mở rộng những gì bạn đã đề cập trong tiêu đề. Tối
        thiểu 20 ký tự.
      </p>
      <textarea
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 min-h-[160px]`}
        id="details"
        placeholder="Mô tả chi tiết vấn đề của bạn..."
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>
      {error && renderError(error)}
    </motion.div>
  );
};

export default DetailsInput;

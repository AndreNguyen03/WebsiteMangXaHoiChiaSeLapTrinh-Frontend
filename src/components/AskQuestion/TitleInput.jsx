import React from "react";
import { motion } from "framer-motion";

const TitleInput = ({ title, setTitle, error, renderError }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
    >
      <label
        className="block text-gray-800 text-lg font-semibold mb-2"
        htmlFor="title"
      >
        Tiêu đề
      </label>
      <p className="text-gray-600 text-sm mb-3">
        Hãy cụ thể và tưởng tượng bạn đang hỏi một người khác.
      </p>
      <input
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200`}
        id="title"
        type="text"
        placeholder="Ví dụ: Có hàm R nào để tìm chỉ số của một phần tử trong vector không?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && renderError(error)}
    </motion.div>
  );
};

export default TitleInput;

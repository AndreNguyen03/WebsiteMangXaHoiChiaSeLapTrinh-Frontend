import React from "react";
import { motion } from "framer-motion";

const ImagesInput = ({
  imageFiles,
  setImageFiles,
  error,
  setErrors,
  renderError,
}) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: "Vui lòng chọn ít nhất một hình ảnh",
      }));
      return;
    }

    const invalidFiles = files.filter(
      (file) => !file.type.startsWith("image/")
    );
    if (invalidFiles.length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: "Chỉ chấp nhận file hình ảnh",
      }));
      return;
    }

    setErrors((prevErrors) => ({ ...prevErrors, images: "" }));
    setImageFiles(files);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
    >
      <label
        className="block text-gray-800 text-lg font-semibold mb-2"
        htmlFor="images"
      >
        Hình ảnh
      </label>
      <p className="text-gray-600 text-sm mb-3">
        Thêm ít nhất một hình ảnh để minh họa vấn đề của bạn.
      </p>
      <input
        type="file"
        id="images"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200`}
      />
      {error && renderError(error)}
    </motion.div>
  );
};

export default ImagesInput;

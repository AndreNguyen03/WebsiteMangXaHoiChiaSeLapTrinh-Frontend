import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { clearTempTags } from "../../features/TempTags/TempTags";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import TitleInput from "../../components/AskQuestion/TitleInput";
import DetailsInput from "../../components/AskQuestion/DetailsInput";
import ExpectationsInput from "../../components/AskQuestion/ExpectationsInput";
import TagInput from "../../components/AskQuestion/TagInput";
import ImagesInput from "../../components/AskQuestion/ImagesInput";
import Alert from "./Alert";

const AskQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tempTags = useSelector((state) => state.tempTags.tempTags);
  const authState = useSelector((state) => state.auth);
  const [selectedTags, setSelectedTags] = useState([]); // List các tag đã chọn
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    details: "",
    expectations: "",
    userId: authState.user, // ID người dùng (nếu có sẵn)
    imageFiles: [], // Các file ảnh tải lên
  });

  // Add error states
  const [errors, setErrors] = useState({
    title: "",
    details: "",
    expectations: "",
    tags: "",
    images: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      details: "",
      expectations: "",
      tags: "",
      images: "",
    };

    // Validate title
    if (!newQuestion.title.trim()) {
      newErrors.title = "Tiêu đề không được để trống";
      isValid = false;
    } else if (newQuestion.title.length < 10) {
      newErrors.title = "Tiêu đề phải có ít nhất 10 ký tự";
      isValid = false;
    }

    // Validate details
    if (!newQuestion.details.trim()) {
      newErrors.details = "Chi tiết vấn đề không được để trống";
      isValid = false;
    } else if (newQuestion.details.length < 20) {
      newErrors.details = "Chi tiết vấn đề phải có ít nhất 20 ký tự";
      isValid = false;
    }

    // Validate expectations
    if (!newQuestion.expectations.trim()) {
      newErrors.expectations = "Mong đợi không được để trống";
      isValid = false;
    } else if (newQuestion.expectations.length < 20) {
      newErrors.expectations = "Mong đợi phải có ít nhất 20 ký tự";
      isValid = false;
    }

    // Validate tags
    if (selectedTags.length === 0) {
      newErrors.tags = "Vui lòng chọn ít nhất một thẻ";
      isValid = false;
    }

    // Validate images
    if (!newQuestion.imageFiles || newQuestion.imageFiles.length === 0) {
      newErrors.images = "Vui lòng chọn ít nhất một hình ảnh";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePostQuestion = async () => {
    if (!validateForm()) {
      return;
    }

    if (tempTags.length > 0) {
      // Log danh sách temp tags trước khi lưu
      // console.log("Temp Tags trước khi lưu:", tempTags);
      // Add các temp tag vào database trước
      const newTagIds = await addTempTagsToDatabase(tempTags);
      // Kết hợp các tagId đã chọn và mới thêm
      const allTagIds = [
        ...selectedTags.filter((tag) => !tag.isTemp).map((tag) => tag.id),
        ...newTagIds,
      ];
      // Log dữ liệu câu hỏi trước khi lưu
      console.log("Dữ liệu câu hỏi cần lưu:", {
        ...newQuestion,
        tagIds: allTagIds,
      });
      // Lưu câu hỏi và truyền vào list các tagId
      await postQuestionToDatabase(newQuestion, allTagIds);
      // Xoá các thẻ temp sau khi lưu trữ
      dispatch(clearTempTags());
    } else {
      // Nếu không có temp tag, chỉ cần lưu câu hỏi với các tag đã chọn
      const allTagIds = selectedTags.map((tag) => tag.id);

      // Log dữ liệu câu hỏi trước khi lưu
      console.log("Dữ liệu câu hỏi cần lưu:", {
        ...newQuestion,
        tagIds: allTagIds,
      });

      await postQuestionToDatabase(newQuestion, allTagIds);
    }
  };

  const addTempTagsToDatabase = async (tempTags) => {
    try {
      const responses = await Promise.all(
        tempTags.map((tag) => {
          return axios.post("http://localhost:5114/api/tags", {
            tagname: tag.tagname,
            description: tag.description,
          });
        })
      );
      const tagsID = responses.map((response) => response.data.id);
      return tagsID;
    } catch (error) {
      console.error("Error adding temp tags to database:", error);
      return [];
    }
  };

  const postQuestionToDatabase = async (question, tagIds) => {
    try {
      // Chuẩn bị dữ liệu gửi đi
      const formData = new FormData();
      formData.append("Title", question.title);
      formData.append("DetailProblem", question.details);
      formData.append("TryAndExpecting", question.expectations);
      formData.append("UserId", question.userId);

      // Thêm các thẻ TagId vào form data
      tagIds.forEach((tagId) => {
        formData.append("TagId", tagId);
      });

      // Thêm các tập tin (nếu có) vào form data
      if (question.imageFiles && question.imageFiles.length > 0) {
        question.imageFiles.forEach((file) => {
          formData.append("ImageFiles", file);
        });
      }

      // Gửi yêu cầu POST tới API
      const response = await axios.post(
        "http://localhost:5114/api/Posts/createPost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Kiểm tra phản hồi thành công từ API
      if (response.status === 200) {
        console.log("Câu hỏi đã được đăng thành công!");
        navigate("/"); // Điều hướng về trang chủ
      }
    } catch (error) {
      console.error("Error posting question to database:", error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearTempTags());
    };
  }, []);

  const renderError = (error) => {
    if (!error) return null;
    return (
      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
        <Alert />
        <span>{error}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 space-y-6"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
      >
        Đặt câu hỏi công khai
      </motion.h1>
      <TitleInput
        title={newQuestion.title}
        setTitle={(title) => setNewQuestion((prev) => ({ ...prev, title }))}
        error={errors.title}
        renderError={renderError}
      />

      <DetailsInput
        details={newQuestion.details}
        setDetails={(details) =>
          setNewQuestion((prev) => ({ ...prev, details }))
        }
        error={errors.details}
        renderError={renderError}
      />

      <ExpectationsInput
        expectations={newQuestion.expectations}
        setExpectations={(expectations) =>
          setNewQuestion((prev) => ({ ...prev, expectations }))
        }
        error={errors.expectations}
        renderError={renderError}
      />
      {/* Tags */}
      {/* <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
      >
        <label
          className="block text-gray-800 text-lg font-semibold mb-2"
          htmlFor="tags"
        >
          Thẻ
        </label>
        <p className="text-gray-600 text-sm mb-3">
          Thêm tối đa 5 thẻ để mô tả câu hỏi của bạn. Phân tách các thẻ bằng dấu
          cách.
        </p> */}
      <TagInput
        selectedTags={selectedTags}
        error={errors.tags}
        setSelectedTags={setSelectedTags}
        renderError={renderError}
      />
      {/* </motion.div> */}
      {/* Images */}
      <ImagesInput
        imageFiles={newQuestion.imageFiles}
        setImageFiles={(imageFiles) =>
          setNewQuestion((prev) => ({ ...prev, imageFiles }))
        }
        error={errors.images}
        setErrors={setErrors}
        renderError={renderError}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex justify-end"
      >
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          type="button"
          onClick={handlePostQuestion}
        >
          Đăng câu hỏi của bạn
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AskQuestion;

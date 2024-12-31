import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput, Toast } from "flowbite-react";
import axios from "axios";

const UpdateAnswerModal = ({
  show,
  onClose,
  answerData,
  onUpdate,
  onShowToast,
}) => {
  const [answerBody, setAnswerBody] = useState("");

  useEffect(() => {
    if (show && answerData) {
      setAnswerBody(answerData.body);
    }
  }, [show, answerData]);

  const handleUpdate = () => {
    if (!answerData) return; // Bảo vệ thêm ở đây
    axios
      .put(`http://localhost:5114/api/Answers/${answerData.id}`, {
        body: answerBody,
        updatedAt: new Date().toISOString(),
      })
      .then(() => {
        onClose(); // Đóng modal trước khi hiện toast
        onShowToast("success", "Câu trả lời đã được cập nhật thành công!");
        onUpdate(); // Làm mới dữ liệu
      })
      .catch(() => {
        onShowToast(
          "error",
          "Câu trả lời cập nhật thất bại. Vui lòng thử lại."
        );
        console.error("Error updating answer:", error);
      });
  };

  if (!answerData) {
    return null; // Tránh render modal nếu không có dữ liệu
  }

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Update Answer</Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mã câu trả lời
          </label>
          <TextInput value={answerData.id} readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mã người dùng
          </label>
          <TextInput value={answerData.userId} readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mã câu hỏi
          </label>
          <TextInput value={answerData.postId} readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nội dung
          </label>
          <TextInput
            type="text"
            value={answerBody}
            onChange={(e) => setAnswerBody(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="grid grid-cols-2">
        <Button
          gradientMonochrome="lime"
          className="text-white"
          onClick={handleUpdate}
        >
          Lưu
        </Button>
        <Button
          gradientMonochrome="failure"
          outline
          color="gray"
          onClick={onClose}
        >
          Huỷ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default UpdateAnswerModal;

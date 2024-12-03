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
        onShowToast("success", "Answer updated successfully!");
        onUpdate(); // Làm mới dữ liệu
      })
      .catch(() => {
        onShowToast("error", "Failed to update answer. Please try again.");
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
            Answer ID
          </label>
          <TextInput value={answerData.id} readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <TextInput value={answerData.userId} readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Post ID
          </label>
          <TextInput value={answerData.postId} readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Answer Body
          </label>
          <TextInput
            type="text"
            value={answerBody}
            onChange={(e) => setAnswerBody(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdate}>Save</Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default UpdateAnswerModal;
